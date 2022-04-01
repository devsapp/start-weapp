FROM aliyunfc/runtime-nodejs14:build-latest

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /tmp-prod
COPY package.json /tmp-prod/package.json
RUN cd /tmp-prod && npm install --only=prod
COPY . /code
RUN cp -a /tmp/node_modules /code
RUN cd /code && npm run build
RUN mkdir /code/layer
RUN cp -a /tmp-prod/node_modules /code/layer