#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e



git pull 

git add .
git commit -m "'$0'"

git push -u origin master

cd -