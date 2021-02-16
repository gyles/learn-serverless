import type { AWS } from '@serverless/typescript';
import schema from "./src/app/schema";

const serverlessConfiguration: AWS = {
  service: 'log-service',
  frameworkVersion: '2',
  custom: {
    poolName: 'demo-user-pool',
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    documentation: '${file(serverless.doc.yaml):documentation}'
  },
  plugins: ['serverless-webpack', 'serverless-openapi-documentation'],
  provider: {
    name: 'aws',
    region: 'us-east-1',
    runtime: 'nodejs12.x',
    vpc: {
      securityGroupIds: [ 'sg-a95ddfa2', 'sg-0e1cdee3981921207' ],
      subnetIds: [ 'subnet-e3f163c2', 'subnet-15e8a61b' ]
    },
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: ['ec2:*'],
      Resource: '*'
    }],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      MYSQL_DB_NAME: "MYSQL_DB_NAME",
      MYSQL_DB_HOST: "MYSQL_DB_HOST",
      MYSQL_DB_PORT: "MYSQL_DB_PORT",
      MYSQL_DB_USER: "MYSQL_DB_USER",
      MYSQL_DB_PASS: "MYSQL_DB_PASS"
    },
    lambdaHashingVersion: '20201221',
    profile: 'learn'
  },
  functions: {
    find: {
      handler: 'src/app/handler.findLogsFunction',
      events: [{
          http: {
            method: 'get',
            path: 'log',
            authorizer: {
              arn: 'arn:aws:cognito-idp:us-east-1:748917978460:userpool/us-east-1_wUKqleNTb',
              scopes: [ 'https://fnrgjwmodo.auth.us-east-1.amazoncognito.com/log.read' ]
            }
          }
        }],
    },
    create: {
      handler: 'src/app/handler.createLogFunction',
      events: [{
          http: {
            method: 'post',
            path: 'log',
            request: {
              schema: {
                'application/json': schema
              }
            },
            authorizer: {
              arn: 'arn:aws:cognito-idp:us-east-1:748917978460:userpool/us-east-1_wUKqleNTb',
              scopes: [ 'https://fnrgjwmodo.auth.us-east-1.amazoncognito.com/log.write' ]
            }
          }
        }]
    }
  }
}

module.exports = serverlessConfiguration;
