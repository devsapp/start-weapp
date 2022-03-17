import Server from './server';
import * as serverless from '@serverless-devs/fc-http';

// Cache
let handler: Function;

exports.handler = async (req: any, resp: any, context: any) => {
  if (!handler) {
    const app = await Server.start();
    handler = serverless(app);
  }
  handler(req, resp, context);
};
