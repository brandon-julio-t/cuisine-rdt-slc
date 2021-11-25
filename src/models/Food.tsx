export default class Food {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public modelUrl: string = '',
    public videoUrl: string = '',
    public imageUrl: string = '',
    public scale: number = 1,
  ) {}
}
