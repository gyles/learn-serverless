import schema from './schema';

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'log',
        request: {
          schema: {
            'application/json': schema
          }
        },
        documentation: '${file(serverless.doc.yaml):endpoints.createLog}'
      }
    }
  ]
}

export { default as app } from '.';
