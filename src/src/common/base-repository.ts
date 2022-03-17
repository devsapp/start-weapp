import * as DataStore from 'nedb';

export default class Repository<T> {
  public dataSource = new DataStore({
    filename: process.env.NODE_ENV === 'development' ? '' : '/mnt/auto/db',
    autoload: true,
  });

  public save(data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.dataSource.insert(data, (error, document) => {
        if (error) {
          reject(error);
        }

        resolve(document);
      });
    });
  }

  public getById(id: string, userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dataSource.findOne({ _id: id, userId }, (error, document) => {
        if (error) {
          reject(error);
        }

        resolve(document);
      });
    });
  }

  public getAll(userId: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.dataSource.find({ userId }, {}, (error, documents) => {
        if (error) {
          reject(error);
        }

        resolve(documents);
      });
    });
  }

  public updateById(id: string, userId: string, data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this.dataSource.update({ _id: id, userId }, data, {}, (error) => {
        if (error) {
          reject(error);
        }

        this.getById(id, userId).then((value) => resolve(value));
      });
    });
  }

  public deleteById(id: string, userId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.dataSource.remove({ _id: id, userId }, (error) => {
        if (error) {
          reject(error);
        }

        resolve(id);
      });
    });
  }
}
