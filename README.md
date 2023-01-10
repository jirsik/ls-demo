# Livesport demo project


Simple react application consuming livesport search API

## Local Development
### Requirements:
- Docker
- Docker Compose


### Run the app locally
The easiest way is to use provided Makefile

For the first time just run "make" to build the container, install dependencies and start the dev server.
Instaling node_modules for the first time might take a while, so dev server won't be ready directly after container start up.
Application will be available at http://localhost:3000/


Other make commands:


|    command    |                description                |
|:-------------:|:-----------------------------------------:|
|    make up    |            start the container            |
|   make down   |            stop the container             |
|    make i     | install dependencies in running container |
|    make sh    |            enter the container            |
|   make lint   |             run es-lint check             |
| make lint-fix |              run es-lint fix              |
|  make tests   |                 run tests                 |
