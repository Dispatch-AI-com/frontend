pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-southeast-2'
        ECR_REPO = 'dispatchai-frontend'
        IMAGE_TAG = "${env.BUILD_ID}"
        IMAGE_NAME = "${ECR_REPO}:${IMAGE_TAG}"
        ECR_REGISTRY = "893774231297.dkr.ecr.${AWS_REGION}.amazonaws.com"
    }

    stages {
        stage('Checkout') {
            steps {
                script {    
                    cleanWs()
                    sh 'git clone https://github.com/Dispatch-AI-com/frontend.git .'
                }     
            }
        }

        stage('Get ECR Login') {
            steps {
                script {
                    //ECR_REGISTRY = "893774231297.dkr.ecr.${AWS_REGION}.amazonaws.com"
                    env.ECR_REGISTRY = ECR_REGISTRY

                    sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                    sh "docker tag ${IMAGE_NAME} ${ECR_REGISTRY}/${IMAGE_NAME}"
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {
                    sh "docker push ${ECR_REGISTRY}/${IMAGE_NAME}"
                }
            }
        }
    }

    post {
        success {
            echo "✅ Docker image pushed: ${ECR_REGISTRY}/${IMAGE_NAME}"
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
