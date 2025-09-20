pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/vishnupriya0310/weather-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t weather-app .'
            }
        }

        stage('Push Docker Image (Optional)') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'Priya_717', usernameVariable: 'vishnupriya310')]) {
                        sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin"
                        sh 'docker push weather-app:latest'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: 'YourRemoteServer',
                        transfers: [
                            sshTransfer(
                                execCommand: '''
                                    docker stop weather-app || true &&
                                    docker rm weather-app || true &&
                                    docker run -d --name weather-app -p 5000:5000 weather-app:latest
                                '''
                            )
                        ],
                        sourceFiles: ''
                    )
                ])
            }
        }
    }
}
