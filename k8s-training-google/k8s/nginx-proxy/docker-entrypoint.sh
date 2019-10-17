#!/bin/bash
sed -i "s/NODE_CMS_SERVICE/${NODE_CMS_SERVICE}/" /etc/nginx/nginx.conf
sed -i "s/NODE_UPVOTE_SERVICE/${NODE_UPVOTE_SERVICE}/" /etc/nginx/nginx.conf
nginx
