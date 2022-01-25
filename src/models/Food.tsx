import PointOfInterest from './PointOfInterest';

export default class Food {
  constructor(
    public id: string = '',
    public name: string = '',
    public category: string = '',
    public description: string = '',
    public modelUrl: string = '',
    public videoUrl: string = '',
    public imageUrl: string = '',
    public pointOfInterests: PointOfInterest[] = [],
  ) {}
}
