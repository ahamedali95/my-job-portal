pipeline {
    agent none

    tools {
        nodejs 'Node 16.10.0'
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
                label 'default'
            }
            steps {
                echo 'Uploading...'
                rtServer(
                    id: 'artifactory-server-id',
                    url: 'https://ahamedrepo.jfrog.io/artifactory',
                    credentialsId: 'artifactory-server-id'
                )
                rtUpload(
                    serverId: 'artifactory-server-id',
                    spec: '''

                        {
                             "files": [{
                                  "pattern": "job-portal-ui-1.0.0.*.zip",
                                  "target: "my-job-portal-fe-generic-local"
                             }]
                        }
                    '''

                )
            }
        }
    }
}