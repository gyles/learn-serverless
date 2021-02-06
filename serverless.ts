import type { AWS } from '@serverless/typescript';
import { functions } from './src/app';

const serverlessConfiguration: AWS = {
  service: 'log-service',
  frameworkVersion: '2',
  custom: {
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
  functions: functions
}

module.exports = serverlessConfiguration;
