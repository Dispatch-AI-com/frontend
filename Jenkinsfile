def getEnvironmentConfig(branchName, tagName) {
    echo "🐛 DEBUG: Function called with branchName='${branchName}', tagName='${tagName}'"
    def config = [:]
    
    if (branchName == 'main' || (branchName != null && branchName.startsWith('DEVOPS-'))) {
        echo "🐛 DEBUG: Matched UAT condition"
        config.environment = "uat"
        config.awsAccountId = "893774231297"
    } else if (branchName == 'prod') {
        echo "🐛 DEBUG: Matched PROD condition"
        if (tagName != null && tagName.trim() != '') {
            config.environment = "prod"
            config.awsAccountId = "123456789012"
        } else {
            error("Production builds require a tag.")
        }
    } else {
        echo "🐛 DEBUG: No condition matched, will error"
        error("Branch '${branchName ?: 'unknown'}' is not allowed to run this pipeline.")
    }
    
    config.backendUrl = "https://backend.${config.environment}.getdispatch.ai/api"
    config.eksClusterName = "DispatchAI-${config.environment.toUpperCase()}-EKS-Cluster"
    config.ecrRegistry = "${config.awsAccountId}.dkr.ecr.ap-southeast-2.amazonaws.com"
    
    echo "🐛 DEBUG: Config created: ${config}"
    return config
}

// 全局变量来存储配置
def globalConfig = [:]

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
        stage('Set Environment') {
            steps {
                script {
                    echo "🐛 DEBUG: Starting environment setup"
                    echo "🐛 DEBUG: BRANCH_NAME = '${env.BRANCH_NAME}'"
                    echo "🐛 DEBUG: TAG_NAME = '${env.TAG_NAME}'"
                    
                    // 调用外部函数获取配置并存储到全局变量
                    globalConfig = getEnvironmentConfig(env.BRANCH_NAME, env.TAG_NAME)
                    
                    echo "🐛 DEBUG: Function returned, config stored in global variable"
                    echo "🐛 DEBUG: Global config: ${globalConfig}"
                }
            }
        }

        stage('test') {
            steps {
                container('dispatchai-jenkins-agent') {
                    script {
                        echo "ENVIRONMENT: ${globalConfig.environment}"
                        echo "AWS_ACCOUNT_ID: ${globalConfig.awsAccountId}"
                        echo "BACKEND_URL: ${globalConfig.backendUrl}"
                        echo "EKS_CLUSTER_NAME: ${globalConfig.eksClusterName}"
                        echo "ECR_REGISTRY: ${globalConfig.ecrRegistry}"
                    }
                }
            }
        }

        stage('testtest') {
            steps {
                container('node') {
                    script {
                        echo "ENVIRONMENT: ${globalConfig.environment}"
                        echo "AWS_ACCOUNT_ID: ${globalConfig.awsAccountId}"
                        echo "BACKEND_URL: ${globalConfig.backendUrl}"
                        echo "EKS_CLUSTER_NAME: ${globalConfig.eksClusterName}"
                        echo "ECR_REGISTRY: ${globalConfig.ecrRegistry}"
                        
                        // 如果你需要在 shell 命令中使用这些值，可以这样做：
                        sh """
                            echo "Building with environment: ${globalConfig.environment}"
                            echo "Using AWS Account: ${globalConfig.awsAccountId}"
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
                            echo "Building Docker image..."
                            echo "ECR Registry: ${globalConfig.ecrRegistry}"
                            echo "Environment: ${globalConfig.environment}"
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
                echo "✅ Docker image pushed: ${globalConfig.ecrRegistry}/${env.ECR_REPO}:${env.IMAGE_TAG}"
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