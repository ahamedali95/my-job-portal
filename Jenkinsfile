pipeline {
    agent any

    tools {nodejs "nodeJS@18.7.0"}

    stages {
        stage('Build') {
            steps {
                echo "Build stage is running..."
                sh 'npm install'
                sh 'npm run lint'
                sh 'npm run build:prod'
            }
        }
        stage('Test') {
            steps {
                echo "Tests are running..."
                sh 'npm run test'
            }
        }

    }
}