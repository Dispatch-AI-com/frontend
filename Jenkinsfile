def getEnvironmentConfig(branchName, tagName) {
    def config = [:]
    
    if (branchName == 'main' || branchName.startsWith('DEVOPS-')) {
        config.environment = "uat"
        config.awsAccountId = "893774231297"
    } else if (branchName == 'prod') {
        if (tagName != null && tagName.trim() != '') {
            config.environment = "prod"
            config.awsAccountId = "123456789012"
        } else {
            error("Production builds require a tag.")
        }
    } else {
        error("Branch ${branchName} is not allowed to run this pipeline.")
    }
    
    config.backendUrl = "https://backend.${config.environment}.getdispatch.ai/api"
    config.eksClusterName = "DispatchAI-${config.environment.toUpperCase()}-EKS-Cluster"
    config.ecrRegistry = "${config.awsAccountId}.dkr.ecr.ap-southeast-2.amazonaws.com"
    
    return config
}

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
        ENVIRONMENT = ""
        AWS_ACCOUNT_ID = ""
        AWS_REGION = "ap-southeast-2"
        ECR_REPO = "dispatchai-frontend"
        K8S_VERSION = "v1.32.3"
        EKS_CLUSTER_NAME = ""
        ECR_REGISTRY = ""
        BACKEND_URL = ""
        IMAGE_TAG = "${env.BUILD_ID}"
    }
    stages {
        stage('Set Environment') {
            steps {
                script {
                    // 调用外部函数获取配置
                    def config = getEnvironmentConfig(env.BRANCH_NAME, env.TAG_NAME)
                    
                    // 设置环境变量
                    env.ENVIRONMENT = config.environment
                    env.AWS_ACCOUNT_ID = config.awsAccountId
                    env.BACKEND_URL = config.backendUrl
                    env.EKS_CLUSTER_NAME = config.eksClusterName
                    env.ECR_REGISTRY = config.ecrRegistry
                    
                    echo "ENVIRONMENT: ${env.ENVIRONMENT}"
                    echo "AWS_ACCOUNT_ID: ${env.AWS_ACCOUNT_ID}"
                    echo "BACKEND_URL: ${env.BACKEND_URL}"
                    echo "EKS_CLUSTER_NAME: ${env.EKS_CLUSTER_NAME}"
                    echo "ECR_REGISTRY: ${env.ECR_REGISTRY}"
                }
            }
        }

        stage('test') {
            steps {
                container('dispatchai-jenkins-agent') {
                    echo "ENVIRONMENT: ${env.ENVIRONMENT}"
                    echo "AWS_ACCOUNT_ID: ${env.AWS_ACCOUNT_ID}"
                    echo "BACKEND_URL: ${env.BACKEND_URL}"
                    echo "EKS_CLUSTER_NAME: ${env.EKS_CLUSTER_NAME}"
                    echo "ECR_REGISTRY: ${env.ECR_REGISTRY}"
                }
            }
        }

        stage('testtest') {
            steps {
                container('node') {
                    echo "ENVIRONMENT: ${env.ENVIRONMENT}"
                    echo "AWS_ACCOUNT_ID: ${env.AWS_ACCOUNT_ID}"
                    echo "BACKEND_URL: ${env.BACKEND_URL}"
                    echo "EKS_CLUSTER_NAME: ${env.EKS_CLUSTER_NAME}"
                    echo "ECR_REGISTRY: ${env.ECR_REGISTRY}"
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