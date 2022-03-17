import * as Hapi from '@hapi/hapi';
import TaskController from '../../api/tasks/controller';
import validate from '../../api/tasks/validate';
import IRoute from '../../helper/route';

export default class TaskRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise<void>((resolve) => {
      console.info('TaskRoutes - Start adding task routes');

      const controller = new TaskController();

      server.route([
        {
          method: 'POST',
          path: '/api/tasks',
          options: {
            handler: controller.create,
            validate: validate.create,
            description: 'Method that creates a new task.',
            tags: ['api', 'tasks'],
          },
        },
        {
          method: 'PUT',
          path: `/api/tasks/{${controller.id}}`,
          options: {
            handler: controller.updateById,
            description: 'Method that updates a task by its id.',
            tags: ['api', 'tasks'],
          },
        },
        {
          method: 'GET',
          path: `/api/tasks/{${controller.id}}`,
          options: {
            handler: controller.getById,
            description: 'Method that get a task by its id.',
            tags: ['api', 'tasks'],
          },
        },
        {
          method: 'GET',
          path: '/api/tasks',
          options: {
            handler: controller.getAll,
            description: 'Method that gets all tasks.',
            tags: ['api', 'tasks'],
          },
        },
        {
          method: 'DELETE',
          path: `/api/tasks/{${controller.id}}`,
          options: {
            handler: controller.deleteById,
            description: 'Method that deletes a task by its id.',
            tags: ['api', 'tasks'],
          },
        },
      ]);
      console.info('TaskRoutes - Finish adding task routes');

      resolve();
    });
  }
}
