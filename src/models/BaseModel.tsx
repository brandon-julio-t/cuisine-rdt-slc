import { ICacheable } from "../interfaces/ICacheable";

export class BaseModel implements ICacheable {
  constructor(public id: string) {}

  getCacheKey(): string {
    return `${this.constructor.name}:${this.id}`;
  }

}
