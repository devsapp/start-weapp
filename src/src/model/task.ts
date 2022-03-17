export default class Task {
  public _id: string;
  public content: string;
  public userId: string;

  constructor(_id: string, content: string, userId: string) {
    this._id = _id;
    this.content = content;
    this.userId = userId;
  }
}
