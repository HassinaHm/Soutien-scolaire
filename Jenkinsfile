pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_URL = 'https://hub.docker.com'
        DOCKER_REGISTRY_USERNAME = credentials('hassina.elhamed5@gmail.com')
        DOCKER_REGISTRY_PASSWORD = credentials('hassine22')
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
                sh 'docker build -t $DOCKER_IMAGE_NAME .'
            }
        }
    }
}
