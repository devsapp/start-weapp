import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';
import CrudResolver from '../common/base-resolver';
import newResponse from '../helper/response';
const FC_STATUS_HEADER = 'x-fc-status';

export default class CrudController<T> {
  constructor(
    public id: string = 'id',
    private crudResolver: CrudResolver<T>
  ) {}

  public create = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      console.info(`POST - ${request.url.href}`);

      const userId = request.auth.credentials.user as string;

      const data: any = await this.crudResolver.save({
        ...(request.payload as any),
        userId,
        createdTime: Date.now(),
      } as any);

      return toolkit.response(
        newResponse(request, {
          value: { id: data['_id'] },
        })
      );
    } catch (error) {
      return toolkit
        .response(
          newResponse(request, {
            boom: Boom.badImplementation('', error),
          })
        )
        .header(FC_STATUS_HEADER, '500');
    }
  };

  public updateById = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      console.info(`PUT - ${request.url.href}`);

      const userId = request.auth.credentials.user as string;
      const id = encodeURIComponent(request.params[this.id]);

      const updatedEntity: T = await this.crudResolver.updateOneById(
        id,
        userId,
        request.payload
      );

      if (!updatedEntity) {
        return toolkit
          .response(
            newResponse(request, {
              boom: Boom.notFound(),
            })
          )
          .header(FC_STATUS_HEADER, '404');
      }

      return toolkit.response(
        newResponse(request, {
          value: updatedEntity,
        })
      );
    } catch (error) {
      return toolkit
        .response(
          newResponse(request, {
            boom: Boom.badImplementation('', error),
          })
        )
        .header(FC_STATUS_HEADER, '500');
    }
  };

  public getById = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      console.info(`GET - ${request.url.href}`);

      const userId = request.auth.credentials.user as string;
      const id = encodeURIComponent(request.params[this.id]);

      const entity: T = await this.crudResolver.getOneById(id, userId);

      if (!entity) {
        return toolkit
          .response(
            newResponse(request, {
              boom: Boom.notFound(),
            })
          )
          .header(FC_STATUS_HEADER, '404');
      }

      return toolkit.response(
        newResponse(request, {
          value: entity,
        })
      );
    } catch (error) {
      return toolkit
        .response(
          newResponse(request, {
            boom: Boom.badImplementation('', error),
          })
        )
        .header(FC_STATUS_HEADER, '500');
    }
  };

  public getAll = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      console.info(`GET - ${request.url.href}`);
      const userId = request.auth.credentials.user as string;

      const entities: T[] = await this.crudResolver.getAll(userId);

      return toolkit.response(
        newResponse(request, {
          value: entities,
        })
      );
    } catch (error) {
      return toolkit
        .response(
          newResponse(request, {
            boom: Boom.badImplementation('', error),
          })
        )
        .header(FC_STATUS_HEADER, '500');
    }
  };

  public deleteById = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit
  ): Promise<any> => {
    try {
      console.info(`DELETE - ${request.url.href}`);
      const userId = request.auth.credentials.user as string;
      const id = encodeURIComponent(request.params[this.id]);

      await this.crudResolver.deleteOneById(id, userId);

      return toolkit.response(
        newResponse(request, {
          value: { id: id },
        })
      );
    } catch (error) {
      return toolkit
        .response(
          newResponse(request, {
            boom: Boom.badImplementation('', error),
          })
        )
        .header(FC_STATUS_HEADER, '500');
    }
  };
}
