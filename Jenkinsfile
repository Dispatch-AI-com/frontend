pipeline {
    agent {
        kubernetes {
            cloud 'EKS-Agent-UAT-lawrence'
            yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins-agent
  containers:
    - name: node
      image: node:20-alpine
      command: ['sleep']
      args: ['99d']
      tty: true
    - name: dispatchai-jenkins-agent
      image: 893774231297.dkr.ecr.ap-southeast-2.amazonaws.com/dispatchai-jenkins-agent:lawrence
      imagePullPolicy: Always
      command: ['sleep']
      args: ['99d']
      tty: true
    - name: buildkitd
      image: moby/buildkit:v0.12.4
      command: ["buildkitd"]
      args: ["--addr=tcp://0.0.0.0:1234"]
      ports:
        - containerPort: 1234
          name: buildkit
      securityContext:
        privileged: true
""".stripIndent()
        }
    }

    environment {
        
        AWS_ACCOUNT_ID = "893774231297"
        AWS_REGION = 'ap-southeast-2'
        ECR_REPO = 'dispatchai-frontend'
        K8S_VERSION = 'v1.32.3'
        EKS_CLUSTER_NAME = 'DispatchAI-UAT-EKS-Cluster'
        BACKEND_URL = "https://backend.uat.getdispatch.ai/api"
        BRANCH_NAME = 'main'
        IMAGE_TAG = "${env.BUILD_ID}"
        ECR_REGISTRY = "${env.AWS_ACCOUNT_ID}.dkr.ecr.${env.AWS_REGION}.amazonaws.com"
    }

    stages {
        stage('checkout repos') {
            steps {
                cleanWs()
                dir('frontend') {
                    container('node') {
                        git branch: "DEVOPS-27", credentialsId: '2c8f4c5f-0bc2-48ee-b820-f107d08db968', url: 'https://github.com/Dispatch-AI-com/frontend.git'
                    }
                }
                dir('helm') {
                    container('dispatchai-jenkins-agent') {
                        git branch: "${env.BRANCH_NAME}", credentialsId: '2c8f4c5f-0bc2-48ee-b820-f107d08db968', url: 'https://github.com/Dispatch-AI-com/helm.git'
                    }
                }
            }
        }

        stage('build and test') {
            steps {
                dir('frontend') {
                    container('node') {
                        sh "npm install -g pnpm"
                        sh "pnpm install"
                        sh "pnpm run type-check"
                        sh "pnpm run lint"
                        sh "pnpm test"
                        sh "NEXT_PUBLIC_API_BASE_URL=${env.BACKEND_URL} pnpm build"
                    }
                }
            }
        }

        stage('build image for frontend') {
            steps {
                dir('frontend') {
                    container('dispatchai-jenkins-agent') {
                        // Use BuildKit to build docker image and push to ECR
                        sh """
                            docker-credential-ecr-login list
                            buildctl --addr=tcp://localhost:1234 build \\
                              --frontend=dockerfile.v0 \\
                              --local context=. \\
                              --local dockerfile=. \\
                              --output type=image,name=${env.ECR_REGISTRY}/${env.ECR_REPO}:${env.IMAGE_TAG},push=true
                        """
                    }
                }
            }
        }

        stage('cd') {
            steps {
                dir('helm') {
                    container('dispatchai-jenkins-agent') {
                        sh "bash deploy-frontend.sh ${env.IMAGE_TAG}"
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Docker image pushed: ${env.ECR_REGISTRY}/${env.ECR_REPO}:${env.IMAGE_TAG}"
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}