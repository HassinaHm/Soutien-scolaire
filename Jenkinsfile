pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_URL = 'https://hub.docker.com'
        DOCKER_IMAGE_NAME = 'angular'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/HassinaHm/Soutien-scolaire'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build -- --prod'
            }
        }
        stage('Docker Build') {
            steps {
                script {
                    docker.withRegistry('https://hub.docker.com', 'docker-credentials-id') {
                        docker.build("$DOCKER_IMAGE_NAME")
                    }
                }
            }
        }
    }
}
