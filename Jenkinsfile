pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('vishnupriya310') // set this in Jenkins
        DOCKER_IMAGE = "vishnupriya0310/weather-app"
        KUBE_CONFIG = credentials('kubeconfig-credentials') // set this in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE:$BUILD_NUMBER .'
                }
            }
        }

        stage('Login & Push Image') {
            steps {
                script {
                    sh """
                        echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                        docker push $DOCKER_IMAGE:$BUILD_NUMBER
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Save kubeconfig file
                    writeFile file: 'kubeconfig.yaml', text: "$KUBE_CONFIG"

                    // Use kubectl to apply deployment
                    sh """
                        export KUBECONFIG=kubeconfig.yaml
                        kubectl set image deployment/weather-app weather-app=$DOCKER_IMAGE:$BUILD_NUMBER --namespace=default || \
                        kubectl apply -f k8s/deployment.yaml
                    """
                }
            }
        }
    }
}
