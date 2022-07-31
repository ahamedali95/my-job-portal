pipeline {
    agent any

    tools {nodejs "Node 18.7.0"}

    stages {
        stage('Build') {
            steps {
                echo "Build stage is running..."
                sh "node -v"
                sh "npm -v"
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