import schema from './schema';

export const functions = {
    'find': {
        handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.findLogsFunction`,
        events: [
            {
                http: {
                    method: 'get',
                    path: 'log',
                    documentation: '${file(serverless.doc.yaml):endpoints.createLog}'
                }
            }
        ]
    },
    'create': {
        handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.createLogFunction`,
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
};
