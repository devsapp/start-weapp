import * as Hapi from '@hapi/hapi';
import IRoute from '../../helper/route';
import newResponse from '../../helper/response';

export default class OpenIdRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise<void>((resolve) => {
      console.info('OpenIdRoutes - Start adding open id routes');
      server.route([
        {
          method: 'GET',
          path: '/api/openid',
          options: {
            handler: (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
              const openid = request.auth.credentials.user as string;

              return toolkit.response(
                newResponse(request, {
                  value: { openid },
                })
              );
            },
            description: 'Get the login user id',
            tags: ['api', 'openid'],
          },
        },
      ]);
      console.info('OpenIdRoutes - Finish adding openid routes');

      resolve();
    });
  }
}
