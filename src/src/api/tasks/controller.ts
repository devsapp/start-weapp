import TaskResolver from '../../api/tasks/resolver';
import CrudController from '../../common/crud-controller';
import Task from '../../model/task';

export default class TaskController extends CrudController<Task> {
  constructor(id?: string) {
    super(id, new TaskResolver());
  }
}
