FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

# VOLUME ["/app/message"] 

CMD ["node", "server.js"]

# build this:
# docker build .

# in terminal last line:
# writing image sha256:cd81257d0edf1bc74fdd147c8deb4bc4615245b7d0cae6d28d8843a48

# run:
# docker run -p 3000:3000 cd81257d0edf1bc74fdd147c8deb4bc4615245b7d0cae6d28d8843a48
# -p means public

# see a list of your containers
# docker ps

# stop an image
# docker stop hopeful_murdock

# To save message in volume
#docker build -t message-node:volume1 .
#docker run -d -p 3000:3000 --rm --name message-app -v/app/message message-node:volume1

#docker run -d -p 3000:3000 --rm --name message-app -v volume1:/app/message message-node:volume1