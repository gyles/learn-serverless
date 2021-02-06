import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { ok } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { SynchronousService } from "./service/synchronous.service";

const synchronousService: LogService = new SynchronousService();

const createLog: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const items: object[] = event.body.audit.items;
  await synchronousService.create(items);

  // return 202 if asynchronous with id in header
  return ok({
    message: `Saved ${items.length} audit items.`
  });
}
export const createLogFunction = middyfy(createLog);

const findLogs: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let rsql: string = event.queryStringParameters ? event.queryStringParameters.q : null;
  const audit = await synchronousService.find(rsql);

  return ok({audit});
}
export const findLogsFunction = middyfy(findLogs);
