#!/bin/bash

export BRANCH_NAME=${GITHUB_REF#refs/heads/}

_switchBranch(){
	cd $1
	echo "switching branch..."
	git checkout $2 > /dev/null 2>&1 || true
	echo "(new) active branch for $1:"
	git branch | grep \* | cut -d ' ' -f2
	if [ -z "$3" ]
	then
		echo "No docker tag set for ${1}"
		echo $3
	else
		set -a
		export $3=`git rev-parse HEAD`
		printenv | grep $3
	fi
	cd ..
}

switchBranch(){
	if [[ $BRANCH_NAME = release* || $BRANCH_NAME = hotfix* ]]
	then
		_switchBranch "$1" "master" "$2"
	fi
	_switchBranch "$1" "$BRANCH_NAME" "$2"
}

fetch(){
	# clone all required repositories and try to switch to branch with same name as current one
	git clone https://github.com/hpi-schul-cloud/nuxt-client.git nuxt-client
	switchBranch "nuxt-client" "NUXT_DOCKER_TAG"

	git clone https://github.com/hpi-schul-cloud/schulcloud-client.git schulcloud-client
	switchBranch "schulcloud-client" "CLIENT_DOCKER_TAG"

	git clone https://github.com/hpi-schul-cloud/schulcloud-server.git schulcloud-server
	switchBranch "schulcloud-server" "SERVER_DOCKER_TAG"

	git clone https://github.com/hpi-schul-cloud/docker-compose.git docker-compose
	switchBranch "docker-compose"

	git clone https://github.com/hpi-schul-cloud/node-notification-service.git node-notification-service
	switchBranch "node-notification-service" "NOTIFICATION_SERVICE_DOCKER_TAG"
}

install(){
	cd docker-compose

	# authenticate against docker
	chmod 700 ./scripts/dockerhub.login.sh
	./scripts/dockerhub.login.sh

	chmod 700 ./startup_end-to-end-tests.sh
	echo "PULL CONTAINERS..."
	./startup_end-to-end-tests.sh pull --ignore-pull-failures --include-deps --quiet
	echo "PULL CONTAINERS DONE"
	echo "BOOT CONTAINERS..."
	./startup_end-to-end-tests.sh up -d
	echo "BOOT CONTAINERS DONE"

	set -a
	source ./envs/end-to-end-tests.env


	cd ..

}

before(){

	# fetch later to use time while container bootstrap
	git clone https://github.com/hpi-schul-cloud/end-to-end-tests.git end-to-end-tests
	switchBranch "end-to-end-tests"

	echo "IT_CLIENT ENVS..."
	echo "IT_CLIENT_HOST="$IT_CLIENT_HOST
	echo "IT_CLIENT_PORT="$IT_CLIENT_PORT
	echo "IT_CLIENT ENVS DONE"

	echo "INSTALL DEPENDNECIES..."
	cd schulcloud-server && npm ci && cd ..
	cd end-to-end-tests && npm ci && cd ..
	echo "INSTALL DEPENDNECIES DONE"

	cd schulcloud-server && npm run setup && npm run seed && cd ..

	# wait for the nuxt client to be available
	echo "waiting max 4 minutes for nuxt to be available"
	npx -p wait-on wait-on http://localhost:4000 -t 240000
	echo "nuxt is now online"

}

executeE2ETests(){
	if [[ $BRANCH_NAME = feature* ]]
	then 
		echo "Exectuting core tests due to feature branch"
		npm run test:core
	else 
		echo "Executing all tests due to branch naming"
		npm run test
	fi
}

main(){
	cd end-to-end-tests
	executeE2ETests
	cd ..
}

set -e
echo "FETCH..."
fetch
echo "FETCH DONE"

echo "INSTALL..."
install
echo "INSTALL DONE"

echo "BEFORE..."
before
echo "BEFORE DONE"

echo "MAIN..."
main
echo "MAIN DONE"
set +e