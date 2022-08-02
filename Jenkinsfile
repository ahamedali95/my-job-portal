pipeline {
    agent none

    tools {nodejs "Node 16.10.0"}

    stages {
        stage('Build') {
            agent {
                label "jenkins-slave-node-1"
            }
            steps {
                echo "Branch Name: ${env.GIT_LOCAL_BRANCH}"
                echo "Committer Name: ${env.GIT_COMMITTER_NAME}"
                echo "Committer Email: ${env.GIT_COMMITTER_EMAIL}"

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
                label "default"
            }
            steps {
                echo "Tests are running...."
            }
        }
        stage('Deploy to Dev') {
            agent {
                label "default"
            }
            steps {
                 echo "Deploying...."
             }
        }
    }
}