pipeline {
    agent none

    tools {
        nodejs 'Node 16.10.0'
    }
    environment {
        CI = true
        ARTIFACTORY_ACCESS_TOKEN = credentials('artifactory-server-id')
    }

    stages {
        stage('Build') {
            agent {
                label 'jenkins-slave-node-1'
            }
            steps {
                echo 'Build stage is running...'
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install --verbose'
                sh 'npm run lint'
                sh 'npm run build:prod'
            }
            post {
                always {
                    script {
                        zip archive: true, dir: 'build', glob: '', zipFile: "job-portal-ui-1.0.0.${env.BUILD_NUMBER}.zip"
                    }
                }
            }
        }
        stage('Test') {
            agent {
                label 'default'
            }
            steps {
                echo 'Tests are running....'
            }
        }
        stage('Deploy to Dev') {
            agent {
                docker {
                          image 'releases-docker.jfrog.io/jfrog/jfrog-cli-v2:2.2.0'
                          reuseNode true
                        }
            }
            steps {
                echo 'Pinging artifactory...'
                ARTIFACTORY_RESPONSE = sh(script: 'jfrog rt ping --url https://ahamedrepo.jfrog.io/artifactory/', returnStdout: true)
                echo 'Response: ${ARTIFACTORY_RESPONSE}'

                script {
                   if (ARTIFACTORY_RESPONSE == 'OK') {
                                       sh 'jfrog rt upload --url https://ahamedrepo.jfrog.io/artifactory/ --access-token ${ARTIFACTORY_ACCESS_TOKEN} job-portal-ui-1.0.0.*.zip my-job-portal-fe-generic-local/'

                   }
                }
            }
        }
    }
}