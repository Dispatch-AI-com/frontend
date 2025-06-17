// getEnvironmentConfig function to set environment variables
def getEnvironmentConfig(branchName, tagName) {
    def config = [:]
    if (branchName == 'main' || (branchName != null && branchName.startsWith('DEVOPS-'))) {
        echo "Matched UAT condition"
        config.environment = "uat"
        config.awsAccountId = "893774231297"
        config.imageTag = "${env.BUILD_ID}"
    } else if (branchName == 'prod') {
        echo "Matched PROD condition"
        if (tagName != null && tagName.trim() != '') {
            config.environment = "prod"
            config.awsAccountId = "123456789012"
            config.imageTag = "${tagName}"
        } else {
            error("Production builds require a tag!")
        }
    } else {
        echo "No condition matched, will erro!!!"
        error("Branch '${branchName ?: 'unknown'}' is not allowed to run this pipeline.")
    }
    
    config.backendUrl = "https://backend.${config.environment}.getdispatch.ai/api"
    config.eksClusterName = "DispatchAI-${config.environment.toUpperCase()}-EKS-Cluster"
    config.ecrRegistry = "${config.awsAccountId}.dkr.ecr.ap-southeast-2.amazonaws.com"
    
    echo "Config created: ${config}"
    return config
}

// globalEnv to store environment variables
def globalEnv = [:]

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
        AWS_REGION = "ap-southeast-2"
        ECR_REPO = "dispatchai-frontend"
        K8S_VERSION = "v1.32.3"
        IMAGE_TAG = "${env.BUILD_ID}"
    }
    stages {
        stage('Setup Environment variables') {
            steps {
                container('dispatchai-jenkins-agent') {
                    script {
                        echo "Starting echo environment."
                        echo "BRANCH_NAME = '${env.BRANCH_NAME}'"
                        echo "TAG_NAME = '${env.TAG_NAME}'"
                        
                        // Setup global environment
                        globalEnv = getEnvironmentConfig(env.BRANCH_NAME, env.TAG_NAME)
                        echo "Global environment variables stored in globalEnv successfully！"
                        echo "globalEnv config: ${globalEnv}"
                        echo "ENVIRONMENT: ${globalEnv.environment}"
                        echo "AWS_ACCOUNT_ID: ${globalEnv.awsAccountId}"
                        echo "BACKEND_URL: ${globalEnv.backendUrl}"
                        echo "EKS_CLUSTER_NAME: ${globalEnv.eksClusterName}"
                        echo "ECR_REGISTRY: ${globalEnv.ecrRegistry}"
                    }
                }
            }
        }

        stage('helm') {
            steps {
                container('dispatchai-jenkins-agent') {
                    cleanWs()
                    dir('helm') {
                        container('dispatchai-jenkins-agent') {
                            git branch: "DEVOPS-26", credentialsId: '2c8f4c5f-0bc2-48ee-b820-f107d08db968', url: 'https://github.com/Dispatch-AI-com/helm.git'
                            // sh "bash deploy-frontend-${globalEnv.environment}.sh ${env.IMAGE_TAG}"
                            // sh "bash deploy-frontend-${globalEnv.environment}.sh ${globalEnv.imageTag}"
                            echo "bash deploy-frontend-${globalEnv.environment}.sh ${globalEnv.imageTag}"
                        }
                    }
                }
            }
        }

        stage('testtest') {
            steps {
                container('node') {
                    script {
                        echo "ENVIRONMENT: ${globalEnv.environment}"
                        echo "AWS_ACCOUNT_ID: ${globalEnv.awsAccountId}"
                        echo "BACKEND_URL: ${globalEnv.backendUrl}"
                        echo "EKS_CLUSTER_NAME: ${globalEnv.eksClusterName}"
                        echo "ECR_REGISTRY: ${globalEnv.ecrRegistry}"
                        
                        // 如果你需要在 shell 命令中使用这些值，可以这样做：
                        sh """
                            echo "Building with environment: ${globalEnv.environment}"
                            echo "Using AWS Account: ${globalEnv.awsAccountId}"
                        """
                    }
                }
            }
        }

        stage('Build and Push') {
            steps {
                container('dispatchai-jenkins-agent') {
                    script {
                        // 在需要的地方使用配置
                        sh """
                            echo "test webhook."
                            echo "Building Docker image..."
                            echo "ECR Registry: ${globalEnv.ecrRegistry}"
                            echo "Environment: ${globalEnv.environment}"
                            # 这里可以添加你的构建和推送逻辑
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                echo "✅ Docker image pushed: ${globalEnv.ecrRegistry}/${env.ECR_REPO}:${env.IMAGE_TAG}"
            }
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}


    //     stage('checkout helm repo') {
    //         steps {
    //             cleanWs()
    //             // dir('frontend') {
    //             //     container('node') {
    //             //         git branch: "${env.BRANCH_NAME}", credentialsId: '2c8f4c5f-0bc2-48ee-b820-f107d08db968', url: 'https://github.com/Dispatch-AI-com/frontend.git'
    //             //     }
    //             // }
    //             dir('helm') {
    //                 container('dispatchai-jenkins-agent') {
    //                     git branch: "main", credentialsId: '2c8f4c5f-0bc2-48ee-b820-f107d08db968', url: 'https://github.com/Dispatch-AI-com/helm.git'
    //                 }
    //             }
    //         }
    //     }

    //     stage('build and test') {
    //         steps {
    //             // dir('frontend') {
    //                 container('node') {
    //                     sh "npm install -g pnpm"
    //                     sh "pnpm install"
    //                     sh "pnpm run type-check"
    //                     sh "pnpm run lint"
    //                     sh "pnpm test"
    //                     sh "NEXT_PUBLIC_API_BASE_URL=${env.BACKEND_URL} pnpm build"
    //                 }
    //             // }
    //         }
    //     }

    //     stage('build image for frontend') {
    //         steps {
    //             // dir('frontend') {
    //                 container('dispatchai-jenkins-agent') {
    //                     // Use BuildKit to build docker image and push to ECR
    //                     sh """
    //                         docker-credential-ecr-login list
    //                         buildctl --addr=tcp://localhost:1234 build \\
    //                           --frontend=dockerfile.v0 \\
    //                           --local context=. \\
    //                           --local dockerfile=. \\
    //                           --output type=image,name=${env.ECR_REGISTRY}/${env.ECR_REPO}:${env.IMAGE_TAG},push=true
    //                     """
    //                 }
    //             // }
    //         }
    //     }

    //     stage('cd') {
    //         steps {
    //             dir('helm') {
    //                 container('dispatchai-jenkins-agent') {
    //                     sh "bash deploy-frontend.sh ${env.IMAGE_TAG}"
    //                 }
    //             }
    //         }
    //     }