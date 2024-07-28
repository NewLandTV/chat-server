# How to run

## Clone this repository

```sh
git clone https://github.com/NewLandTV/chat-server.git
cd chat-server
```

## Install node packages

```sh
npm install
```

## Download the ngrok

[Download the ngrok](https://ngrok.com/download)

Move the ngrok.exe file to the root of this repository. Then run the command below.

```sh
ngrok config add-authtoken $YOUR_AUTHTOKEN
```

## Run the server

**To run the command below you will need two other commands.**

### Server

```sh
node .
```

### ngrok

```sh
ngrok http localhost:3000
```

But the client cannot connect to the server because it does not provide the server's URL.

## Provide URL

Open the chat.html file and, in url on line 60, enter the forwarding URL displayed at the ngrok prompt.