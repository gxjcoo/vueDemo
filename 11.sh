msg=$1
if [ -n "$msg" ]; then
   git add -A
   git commit -m"${msg}"
   git pull
   git push
   gxjcoo
   guan0924.
else
    echo "请添加注释再来一遍"
fi