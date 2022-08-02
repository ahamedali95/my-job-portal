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
            post {
                always {
                   archiveArtifacts artifacts: 'build/libs'
                }
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
                  echo "Uploading..."
                  rtServer (
                                     id: "artifactory-server-id",
                                     url: "https://ahamedrepo.jfrog.io/artifactory",
                                     credentialsId: "artifactory-server-id"
                                 )
                 rtUpload(
                                     serverId: "artifactory-server-id",
                                     spec: """{
                                               "files": [
                                                       {
                                                           "pattern": "",
                                                           "target: "my-job-portal-fe-generic-local"
                                                       }
                                               ]
                                           }"""

                                 )
             }
        }
    }
}