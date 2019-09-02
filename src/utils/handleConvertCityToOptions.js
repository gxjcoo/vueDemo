var fs = require('fs');
var path = require('path');
var dir = path.resolve();
fs.readdir(dir, (err, files) => {
    let total=[];
    if (err) {
        console.warn(err)
    } else {
        files.forEach((file) => {
            if (file === 'cityData.json') {
                let filePath = path.join(dir, file);
                fs.open(filePath, 'r', function (err, fd) {
                    fs.readFile(fd, function (err, data) {
                        if (!err) {
                            let cityData = JSON.parse(data);
                            let newCityData=[];
                            for(let i=0;i<cityData.length;i++){
                                let item={};
                                item.label=cityData[i].name;
                                item.value=cityData[i].name;
                                item.children=[];
                                for(let j=0;j<cityData[i].children.length;j++){
                                    let child={};
                                    child.value=cityData[i].children[j].name;
                                    child.label=cityData[i].children[j].name;
                                    item.children.push(child);
                                }
                                newCityData.push(item);
                            }
                            fs.writeFile('./cityOptions.js',JSON.stringify(newCityData),function(err){
                                console.log(err)
                            })

                        }
                    })
                })
            }
        })
    }
});