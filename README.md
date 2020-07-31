<h1 align='center'>
🚀 MERN Markdown Blog
</h1>
<p align='center'>
MongoDB, ExpressJs, ReactJs, NodeJs
</p>

A blogging application made with the MERN stack with **Dockerization** and **TypeScript** as the backend language.

![App Screenshot](./screenshot.png)

# Getting Started

Cloning the repository

```bash
$ git clone https://github.com/HotPotatoC/mern-markdown-blog.git

$ cd mern-markdown-blog
```

## Running with docker-compose

To start the application with docker, make sure you have [**docker-compose**](https://docs.docker.com/compose/install/) installed.

```bash
$ docker-compose -v
```

If you already have docker-compose installed, Build the containers

```bash
docker-compose build
```

Run the application

```bash
docker-compose up -d
```

The ReactJs application will run on _http://localhost:3000_ and the Express application will run on _http://localhost:5000_

To stop the application run

```bash
docker-compose stop
```

## Running without docker-compose

To run the application without using docker. Run your MongoDB service

```bash
$ sudo service mongodb start
```

Starting the server application

```bash
$ cd server
$ yarn install
$ yarn dev
```

Starting the client application

```bash
$ cd client
$ yarn install
$ yarn start
```

The ReactJs application will run on _http://localhost:3000_ and the Express application will run on _http://localhost:5000_
