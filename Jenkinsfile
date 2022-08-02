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
                        echo 'Archiving artifact...'
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
                script {
                    echo 'Pinging artifactory...'
                    ARTIFACTORY_RESPONSE = sh(script: 'jfrog rt ping --url https://ahamedrepo.jfrog.io/artifactory/', returnStdout: true).trim()
                    echo "Response: ${ARTIFACTORY_RESPONSE}"
                    sh "cd /var/lib/jenkins/jobs/job-portal-frontend/branches/JB-3/builds/${env.BUILD_NUMBER}/archives"
                    sh 'pwd'
                    echo "${env.BUILD_NUMBER}"
                    echo "${env.GIT_LOCAL_BRANCH}"

                     if (ARTIFACTORY_RESPONSE == "OK") {
                         echo 'uploading'
                         sh 'pwd'

                         sh 'ls'
                         sh 'jfrog rt upload --url https://ahamedrepo.jfrog.io/artifactory/ --access-token ${ARTIFACTORY_ACCESS_TOKEN} --fail-no-op=true LICENSE.txt my-job-portal-fe-generic-local/'

                     } else {
                         echo 'Artifactory is not online!'
                     }
                }
            }
        }
    }
}