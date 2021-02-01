import type { AWS } from '@serverless/typescript';

import { audit } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'audit-storage-service',
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
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    profile: 'learn'
  },
  functions: { audit }
}

module.exports = serverlessConfiguration;
