sudo docker stop vuedemonginx || true \
 && sudo docker rm vuedemonginx || true \
 && pwd \
 && sudo cd /root/docker/jenkins_home/workspace/vueDemo  \
 && pwd \
 && sudo docker  build ./  -t vuedemonginx   \
 && sudo docker run -d -p 9000:80 --name vuedemonginx -v /root/docker/jenkins_home/workspace/vueDemo/dist:/usr/share/nginx/html -v /root/docker/jenkins_home/workspace/vueDemo/nginx.conf:/etc/nginx/nginx.conf vuedemonginx