import Config from '../config';
import * as Hapi from '@hapi/hapi';

export default class Plugins {
  public static async swagger(server: Hapi.Server): Promise<Error | any> {
    try {
      console.info('Plugins - Registering swagger-ui');

      await Plugins.register(server, [
        require('@hapi/vision'),
        require('@hapi/inert'),
        {
          options: Config.swagger.options,
          plugin: require('hapi-swagger'),
        },
      ]);
    } catch (error) {
      console.info(
        `Plugins - Ups, something went wrong when registering swagger-ui plugin: ${error}`
      );
    }
  }

  public static async registerAll(server: Hapi.Server): Promise<Error | any> {
    if (process.env.NODE_ENV === 'development') {
      await Plugins.swagger(server);
    }
  }

  private static async register(
    server: Hapi.Server,
    plugin: any
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      server.register(plugin);
      resolve();
    });
  }
}
