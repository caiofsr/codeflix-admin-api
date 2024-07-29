import { Entity } from "../entity";

export class NotFoundError extends Error {
  constructor(id: any[] | any, entityClass: new (...args: any[]) => Entity) {
    const idsMessage = Array.isArray(id) ? id.join(", ") : id
    super(`Entity ${entityClass.name} not found using ID ${idsMessage}`)
    this.name = "NotFoundError"
  }
}
