pipeline {
    agent none

    tools {nodejs "Node 16.10.0"}

    stages {
        stage('Build') {
            agent {
                label "jenkins-slave-node-1"
            }
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
            agent {
                label "Built-In Node"
            }
            steps {
                echo "Tests are running...."
            }
        }

    }
}