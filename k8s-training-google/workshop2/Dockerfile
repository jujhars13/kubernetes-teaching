FROM ubuntu:14.04

LABEL vegetable=potato

ADD message.txt /message.txt
ADD run.sh /run.sh

ENTRYPOINT ["/bin/bash", "/run.sh"]

CMD ["/message.txt"]
