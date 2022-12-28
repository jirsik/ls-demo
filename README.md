# Livesport demo project


Simple react application consuming livesport search API

## Local Development
### Requirements:
- Docker
- Docker Compose


### Run the app
The easiest way is to use provided Makefile

For the first time just run "make" to build the container, install dependencies and start the dev server

Other make commands:


|  command  |                description                |
|:---------:|:-----------------------------------------:|
|  make up  |            start the container            |
| make down |            stop the container             |
|  make i   | install dependencies in running container |
|  make sh  |            enter the container            |
| make lint |             run es-lint check             |
