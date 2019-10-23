var fs = require('fs');
var readline = require('readline');
const http = require('http');
const path = require('path');
const express = require('express');
 
//创建一个应用，注意app其实就是一个函数，类似function(req, res) {}
let app = express();
//创建一个http服务器，既然app是一个函数，那这里就可以传入。
let server = http.createServer(app);
//注意，websocket的握手是需要依赖http服务的，所以这里要把server传入进去。
let io = require('socket.io')(server);
 
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
 
//有新的客户端连接时触发
io.on('connection', function (socket){
        //接收到消息时触发
        //注意send()方法其实是发送一个 'message' 事件
        //客户端要通过on('message')来响应
    init(socket);
    //发生错误时触发
    socket.on('error', function (err) {
        console.log(err);
    });
});

server.listen(3030);


//设置被监听文件
var filename = './input.txt';
var logsArr = new Array();
function init(sk){
 sendHisLogs(filename, listenLogs,sk);
}
//进行文件监听
function sendHisLogs(filename,listenLogs,sk){
//创建文件监听流
  var rl = readline.createInterface({
    input: fs.createReadStream(filename,{
        enconding:'utf8'
    }),
    output: null,
    terminal: false  //这个参数很重要
  });
//读取文件
  rl.on('line', function(line) {
    if (line){
      let temp = line.toString()
      sk.send(temp);
      sk.send(logsArr.toString());
if(temp!=line.toString()){
  logsArr.push(line.toString());
}
    }//文件读取后
  }).on('close', function() {
    listenLogs(filename,sk);
  });
}
function generateLog(str){
  var regExp = /(\[.+?\])/g;//(\\[.+?\\])
  var res = str.match(regExp);
  console.log(res);
  for(let i=0;i<res.length;i++){
    res[i] = res[i].replace('[','').replace(']',''); //发送历史日志
  }
}
//处理监听的数据，并打印出来（WebSocket）
var listenLogs = function(filePath,sk){

  console.log('日志监听中...');
  var fileOPFlag="a+";
  fs.open(filePath,fileOPFlag,function(error,fd){
      var buffer;
      var remainder = null;
      fs.watchFile(filePath,{
         persistent: true,
         interval: 1000
      },function(curr, prev){
        //打印当前状态
        //console.log(curr);
          if(curr.mtime>prev.mtime){
             //文件内容有变化，那么通知相应的进程可以执行相关操作。例如读物文件写入数据库等
            buffer = new Buffer(curr.size - prev.size);
            fs.read(fd,buffer,0,(curr.size - prev.size),prev.size,function(err, bytesRead, buffer){
             generateTxt(buffer.toString(),sk)
              
            });
          }else{
             console.log('不好意思，并不监听删除操作');
          }
         });
          // 处理新增内容的地方
          function generateTxt(str,sk){
          var temp = str.split('\r\n');
          for(var s in temp){
            //打印变化内容
         console.log(temp[s])
            //建立webscoket
            sk.send(temp[s])
          }
         }

  });
}

