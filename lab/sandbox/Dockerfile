FROM alpine:3.20

RUN apk add --no-cache \
      bash \
      coreutils \
      findutils \
      git \
      grep \
      python3 \
      tree \
    && adduser -D -u 10001 -h /home/visitor visitor \
    && mkdir -p /opt/lab \
    && chown -R root:root /opt/lab

COPY sample-repo /opt/lab/sample-repo
COPY sandbox/lab-shell.sh /usr/local/bin/lab-shell
RUN chmod 755 /usr/local/bin/lab-shell \
    && chmod -R a+rX /opt/lab/sample-repo \
    && init_git() { \
         cd /opt/lab/sample-repo \
         && git init -q \
         && git config user.email "lab@local" \
         && git config user.name "Lab" \
         && git add -A \
         && git commit -q -m "sample" \
         && chmod -R a+rX /opt/lab/sample-repo; \
       } \
    && init_git

USER visitor
WORKDIR /home/visitor
ENV HOME=/home/visitor

ENTRYPOINT ["/usr/local/bin/lab-shell"]
