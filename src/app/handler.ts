import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { LogController } from "./controller/log-controller";
import schema from './schema';

const logController = new LogController();

const createLog: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const audit = await logController.createLog(event);

  return formatJSONResponse({audit});
}

export const main = middyfy(createLog);
