FROM node:16.18

ENV PORT=3000

COPY . /js
COPY script-npm.sh /
WORKDIR /js
RUN npm install
RUN python3 -m http.server
RUN chmod +x /script-npm.sh
EXPOSE ${PORT}
CMD ["/script-npm.sh"]