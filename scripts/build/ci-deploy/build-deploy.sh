#!/bin/bash

_version="1.2.4"
_tag="xunchangguo/grafana-ci-deploy:${_version}"

docker build -t $_tag .
docker push $_tag
