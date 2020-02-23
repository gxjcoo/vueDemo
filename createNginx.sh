sudo docker stop vuenginxapp || true \
 && sudo docker rm vuenginxapp || true \
 && pwd \
 && sudo cd /root/docker/jenkins_home/workspace/vuedemo  \
 && pwd \
 && sudo docker image build ./  -t vuenginxapp  . \
 && sudo docker run -d -p 8083:80 --name vuenginxapp -v /root/docker/jenkins_home/workspace/vuedemo/dist:/usr/share/nginx/html -v /root/docker/jenkins_home/workspace/vuedemo/nginx.conf:/etc/nginx/nginx.conf vuenginxapp