all: dcBuild up

dcBuild:
	$ docker-compose build --no-cache

up:
	$ docker-compose up -d

down:
	$ docker-compose down

i:
	$ docker-compose exec livesport-demo npm i

lint:
	$ docker-compose exec livesport-demo npm run lint

lint-fix:
	$ docker-compose exec livesport-demo npm run lint-fix

tests:
	$ docker-compose exec livesport-demo npm run test

sh:
	$ docker-compose exec livesport-demo sh
