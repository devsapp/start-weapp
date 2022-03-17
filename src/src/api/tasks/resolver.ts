import Repository from '../../common/base-repository';
import Resolver from '../../common/base-resolver';
import Task from '../../model/task';

export default class TaskResolver extends Resolver<Task> {
  constructor() {
    super(new Repository());
  }
}
