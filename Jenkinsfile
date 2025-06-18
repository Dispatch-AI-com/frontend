// getEnvironmentConfig function to set environment variables
def getEnvironmentConfig(branchName, tagName) {
    def config = [:]
    if (branchName == 'main') {
        echo "Matched UAT environment."
        config.environment = "uat"
        config.awsAccountId = "893774231297"
        config.imageTag = "uat-${env.BUILD_ID}"
    } else if (branchName.startsWith('DEVOPS-')){
        echo "Matched UAT environment."
        config.environment = "uat"
        config.awsAccountId = "893774231297"
        config.imageTag = "${branchName.toLowerCase()}-${env.BUILD_ID}"
    }
    else if (branchName == 'prod') {
        echo "Matched PROD environment."
        if (tagName != null && tagName.trim() != '') {
            config.environment = "prod"
            config.awsAccountId = "981349713333"
            config.imageTag = "${tagName}"
        } else {
            error("Production builds require a tag!")
        }
    } else {
        echo "Error!!! No environment matched."
        error("Branch '${branchName ?: 'unknown'}' is not allowed to run this pipeline.")
    }
    
    config.backendUrl = "https://backend.${config.environment}.getdispatch.ai/api"
    config.eksClusterName = "DispatchAI-${config.environment.toUpperCase()}-EKS-Cluster"
    config.imageName = "${config.awsAccountId}.dkr.ecr.ap-southeast-2.amazonaws.com/${env.ECR_REPO}"
    
    echo "Global environment variables stored in globalEnv successfully! \n${config}"
        
    return config
}

// globalEnv to store environment variables
def globalEnv = [:]

pipeline {
    agent {
        kubernetes {
            cloud 'EKS-Agent-UAT-lawrence'
            yamlFile 'jenkins-agent-uat.yaml'
        }
    }

    environment {
        AWS_REGION = "ap-southeast-2"
        ECR_REPO = "dispatchai-frontend"
        K8S_VERSION = "v1.32.3"
    }

    stages {
        stage('Setup global environment variables') {
            when {
                anyOf {
                    branch 'DEVOPS-*'
                    branch 'main'
                    branch 'prod'
                }
            }
            steps {
                container('dispatchai-jenkins-agent') {
                    script {
                        echo "Starting echo environment."
                        echo "BRANCH_NAME = '${env.BRANCH_NAME}'"
                        echo "TAG_NAME = '${env.TAG_NAME}'"
                        
                        // Setup global environment
                        globalEnv = getEnvironmentConfig(env.BRANCH_NAME, env.TAG_NAME)
                        echo "globalEnv config: ${globalEnv}"
                        echo "ENVIRONMENT: ${globalEnv.environment}"
                        echo "AWS_ACCOUNT_ID: ${globalEnv.awsAccountId}"
                        echo "BACKEND_URL: ${globalEnv.backendUrl}"
                        echo "EKS_CLUSTER_NAME: ${globalEnv.eksClusterName}"
                        echo "imageName: ${globalEnv.imageName}"
                        echo "imageTag: ${globalEnv.imageTag}"
                    }
                }
            }
        }

        stage('install, test and build') {
            when {
                anyOf {
                    branch 'DEVOPS-*'
                    branch 'main'
                    branch 'prod'
                }
            }
            steps {
                container('node') {
                    sh "npm install -g pnpm"
                    sh "pnpm install"
                    sh "pnpm run type-check"
                    sh "pnpm run lint"
                    sh "pnpm test"
                    sh "NEXT_PUBLIC_API_BASE_URL=${globalEnv.backendUrl} pnpm build"
                }
            }
        }

        stage('build docker image') {
            when {
                anyOf {
                    branch 'DEVOPS-*'
                    branch 'main'
                    branch 'prod'
                }
            }
            steps {
                container('dispatchai-jenkins-agent') {
                    script {
                        // Use BuildKit to build docker image and push to ECR
                        sh """
                            docker-credential-ecr-login list
                            buildctl --addr=tcp://localhost:1234 build \\
                              --frontend=dockerfile.v0 \\
                              --local context=. \\
                              --local dockerfile=. \\
                              --output type=image,name=${globalEnv.imageName}:${globalEnv.imageTag},push=true
                        """
                    }
                }
            }
        }

        stage('helm to deploy frontend') {
            when {
                anyOf {
                    branch 'DEVOPS-*'
                    branch 'main'
                    branch 'prod'
                }
            }
            steps {
                container('dispatchai-jenkins-agent') {
                    cleanWs()
                    dir('helm') {
                        script {
                            // checkout helm repo
                            git branch: "main", credentialsId: '2c8f4c5f-0bc2-48ee-b820-f107d08db968', url: 'https://github.com/Dispatch-AI-com/helm.git'
                            // deploy to eks
                            sh "bash deploy-frontend-${globalEnv.environment}.sh ${globalEnv.imageTag}"
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ Frontend has been deployed successfully with image: ${globalEnv.imageName}:${globalEnv.imageTag}"
            emailext(
                to: "lawrence.wenboli@gmail.com",
                subject: "✅ DispatchAI Frontend pipeline succeeded.",
                body: "Jenkins CICD Pipeline succeeded!<br/>" +
                    "Job Result: ${currentBuild.result}<br/>" +
                    "Job Name: ${env.JOB_NAME}<br/>" +
                    "Branch: ${env.BRANCH_NAME}<br/>" +
                    "Build Number: ${env.BUILD_NUMBER}<br/>" +
                    "URL: ${env.BUILD_URL}<br/>",
                attachLog: false
            )
        }

        failure {
            emailext(
                to: "lawrence.wenboli@gmail.com",
                subject: "❌ DispatchAI Frontend pipeline failed.",
                body: "Jenkins CICD Pipeline failed!<br/>" +
                    "Job Result: ${currentBuild.result}<br/>" +
                    "Job Name: ${env.JOB_NAME}<br/>" +
                    "Branch: ${env.BRANCH_NAME}<br/>" +
                    "Build Number: ${env.BUILD_NUMBER}<br/>" +
                    "URL: ${env.BUILD_URL}<br/>" +
                    "Please check logfile for more details.<br/>",
                attachLog: false
            )
        }
    }
}
