FROM nginx

COPY docker-entrypoint.sh docker-entrypoint.sh
COPY default.conf /etc/nginx/nginx.conf
COPY ./www /etc/nginx/html
ENTRYPOINT ["./docker-entrypoint.sh"]
