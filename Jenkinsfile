pipeline {
    agent any

    tools {nodejs "Node 16.10.0"}

    stages {
        stage('Build') {
            steps {
                echo "Build stage is running..."
                sh "node -v"
                sh "npm -v"
                sh 'npm install --verbose'
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