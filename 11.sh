#!/usr/bin/expect
msg=$1
if [ -n "$msg" ]; then
   git add -A
   git commit -m"${msg}"
   git pull
  git push
 expect "Username for 'https://github.com':"
send "gjxcoo"
expect "Password for 'https://gxjcoo@github.com':"
send "zjk123\r"
   
else
    echo "请添加注释再来一遍"
fi
