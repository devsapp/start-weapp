import * as Hapi from '@hapi/hapi';
import Auth from './auth';
import Plugin from './plugin';
import Router from './router';

const PORT = 9000;
export default class Server {
  private static instance: Hapi.Server;

  public static async start(): Promise<Hapi.Server> {
    try {
      Server.instance = new Hapi.Server({
        port: PORT,
      });
      Auth.strategy(Server.instance);

      Server.instance.validator(require('joi'));

      await Plugin.registerAll(Server.instance);
      await Router.loadRoutes(Server.instance);

      if (process.env.NODE_ENV === 'development') {
        await Server.instance.start();
        console.info(`Server - Up and running at port ${PORT}`);
      }

      return Server.instance;
    } catch (error) {
      console.error(`Server - There was something wrong: ${error}`);

      throw error;
    }
  }

  public static stop(): Promise<Error | void> {
    console.info(`Server - Stopping execution`);

    return Server.instance.stop();
  }

  public static async recycle(): Promise<Hapi.Server> {
    console.info(`Server - Recycling instance`);

    await Server.stop();

    return await Server.start();
  }
}
