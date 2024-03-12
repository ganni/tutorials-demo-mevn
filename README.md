# Node.js Express & MongoDB: CRUD Rest APIs

This is a demo tutorial for setting up `MEVN` stack based on the following example:

> [Node.js, Express & MongoDb: Build a CRUD Rest Api example](https://www.bezkoder.com/node-express-mongodb-crud-rest-api/)

## Project structure

Project is mainly divided into 2 directories,`webapp` for front-facing Webapp and `api` for back-end API. Each has and corresponding `Dockerfile` for ease of development and later deployments.

1. The Webapp is built using Vue 3. It follows [Bezdocker vue example](https://github.com/bezkoder/vue-js-crud-example) closely. Only it was upgraded to the latest `Vue`.

   For local dev, I've set up and docker container based `Mongodb` server defined in [`docker-compose.yaml`](./docker-compose.yml) file

```Dockerfile
services:
mongodb:
image: mongo:5.0.2
restart: unless-stopped
env_file: ./.env
environment:
  - MONGO_INITDB_ROOT_USERNAME=$MONGODB_USER
  - MONGO_INITDB_ROOT_PASSWORD=$MONGODB_PASSWORD
ports:
  - $MONGODB_LOCAL_PORT:$MONGODB_DOCKER_PORT
volumes:
  - db:/data/db
networks:
  - backend
```

\_

---

2. The API/Back-end is built using `ExpressJS` likewise closely following the example mentioned above.

## Extended dev

- [x] Added a button for approving a tutorial from the tutorials list view.
- [x] Added the 'Generate tutorials' button for generating 10 random tutorials and added it to the db.
- [x] Added improved search capability by adding `text` index for full-text search
- [x] Partially added fuzzy search by using the external library `mongoose-fuzzy-searching`. It was not working as expected. It needs more time.

### Further development Ideas

- [ ] Add test cases
- [ ] Add loading indicator on the webapp
- [ ] Improve searching (Performance analysis on text indexing on MongoDB)
- [ ] Finish fuzzy searching

## Local Demo:

This project is set up using Docker Compose.
To try this demo on your local dev env it only requires running `docker` instance and `docker compose up`. `.env` files are included in the source for easier demonstrations. It should not be included publicly like this.

```sh
docker compose up
```

## Live Demo:

For the live demo, I have set up a `Vercel` deployment with MongoDB atlas db.

[applng-test.vercel.app](https://applng-test.vercel.app/)
