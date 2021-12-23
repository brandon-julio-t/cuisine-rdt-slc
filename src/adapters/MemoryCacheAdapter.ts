export class MemoryCacheAdapter {
  private static map: { [key: string]: any } = {};

  public static get<T>(key: string): T {
    return this.map[key];
  }

  public static save(key: string, value: any) {
    this.map[key] = value;
  }
}
