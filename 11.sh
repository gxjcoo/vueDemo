msg=$1
if [ -n "$msg" ]; then
   git add .
   git commit -m"${msg}"
   git pull
   git push
else
    echo "请添加注释再来一遍"
fi
