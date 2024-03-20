FROM node:18

WORKDIR /

RUN npm install -g @webhooksite/cli

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run doc

EXPOSE 3000

CMD ["npm", "run", "dev", \
    "&&", \
    "whcli", "forward", \
    "--token=f70e7d6a-9a12-4b7e-bb8d-62edb4f957", \
    "--api-key=f70e7d6a-9a12-4b7e-bb8d-62edb4f957", \
    "--target=http://localhost/webhook"]

