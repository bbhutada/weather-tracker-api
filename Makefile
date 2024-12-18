DOCKER_COMPOSE = docker-compose

start-dev:
	$(DOCKER_COMPOSE) up

start-prod:
	$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml up -d

stop:
	$(DOCKER_COMPOSE) down --rmi all
