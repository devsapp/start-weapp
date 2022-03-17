import Repository from '../common/base-repository';

export default class CrudResolver<T> {
  constructor(protected repository: Repository<T>) {}

  public async save(data: T): Promise<T> {
    return await this.repository.save(data);
  }

  public async getOneById(id: string, userId: string): Promise<T> {
    return await this.repository.getById(id, userId);
  }

  public async updateOneById(
    id: string,
    userId: string,
    update: any
  ): Promise<T> {
    return await this.repository.updateById(id, userId, update);
  }

  public async deleteOneById(id: string, userId: string): Promise<any> {
    return await this.repository.deleteById(id, userId);
  }

  public async getAll(userId: string): Promise<T[]> {
    return await this.repository.getAll(userId);
  }

  public async bulkUpdate(
    ids: string[],
    userId: string,
    field: string,
    value: string
  ): Promise<T[]> {
    return await Promise.all(
      ids.map(
        async (id) => await this.updateOneById(id, userId, { [field]: value })
      )
    );
  }

  public async bulkDelete(ids: string[], userId: string): Promise<T[]> {
    return await Promise.all(
      ids.map(async (id) => await this.deleteOneById(id, userId))
    );
  }
}
