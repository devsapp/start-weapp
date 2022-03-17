import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import fetch from 'node-fetch';

export default class Auth {
  private static async weappAuth(request: any, h: any): Promise<Error | any> {
    return new Promise((resolve, reject) => {
      const code = request.headers.token;
      if (!code) {
        reject(Boom.unauthorized());
      }

      fetch(
        `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.APP_ID}&secret=${process.env.SECRET}&js_code=${code}&grant_type=authorization_code`
      )
        .then((res) => res.json())
        .then((json) => {
          if (json.openid) {
            resolve(h.authenticated({ credentials: { user: json.openid } }));
          } else {
            reject(Boom.forbidden());
          }
        });
    });
  }

  public static async strategy(server: Hapi.Server): Promise<void> {
    console.info('Auth - Registering auth strategy');

    const scheme = () => {
      return {
        authenticate: (request: any, h: any) => {
          if (process.env.APP_ID && process.env.SECRET) {
            const env = request.headers.env;
            if (env === 'WEAPP') {
              return Auth.weappAuth(request, h);
            } else {
              return new Promise((resolve, reject) => {
                reject(Boom.unauthorized());
              });
            }
          } else {
            return new Promise((resolve, reject) => {
              resolve(h.authenticated({ credentials: { user: 'testUser' } }));
            });
          }
        },
      };
    };
    server.auth.scheme('custom', scheme);
    server.auth.strategy('default', 'custom');
    server.auth.default('default');
  }
}
