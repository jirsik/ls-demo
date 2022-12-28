all: dcBuild up

dcBbuild:
	$ docker-compose build --no-cache

up:
	$ docker-compose up -d

down:
	$ docker-compose down

i:
	$ docker-compose exec livesport-demo npm i

lint:
	$ docker-compose exec livesport-demo npm run lint

sh:
	$ docker-compose exec livesport-demo sh
