import { Vector3 } from "three";

export default class PointOfInterest {
  constructor(
    public position: Vector3 = new Vector3(0, 0, 0),
    public title: string = '',
    public description: string = ''
  ) {}
}
