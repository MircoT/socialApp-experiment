# socialApp-experiment
An experimental project for an University seminary inside HKBU/UniPG Internship 2015.

## Info

The topic of the seminaries during the intership was *The social network*, so this app shows you how a simple multiplatform web chat can be created using simply Javascript and WebSockets. In particular in this project was used:

* [Ionic Framework](http://ionicframework.com/) -> used for the client side
* [Express](http://expressjs.com/) -> to serve the static files
* [socket.io](http://socket.io/) -> to implement the chat

## Server

The server side is written in javascript using [Express](http://expressjs.com/) and the [socket.io](http://socket.io/) library. It simply serves the static files for the client application and manages the comunication between the clients.

To start the server install the dependencies and run the *index.js* file but firstly you have to modify the client side (see the notes below):

```bash
npm install
node index.js
```

**Notes:** the server was tested with **NodeJS v0.10.25**.

## Client

You need to set the *serverName* variabile inside `socialApp/www/js/services.js` with your server URL. After that you can run the server and access the *socialApp* going to the following URL:

```
http://your_server_url:3000/app
```

Naturally you can modify the server port and make the changes on the client side.

The client part is a **Ionic Project**, so you can manage the dependencies with **bower** and install the app on the devices supported. If you need some information you can find it in the [official documentation](http://ionicframework.com/docs/cli/).
