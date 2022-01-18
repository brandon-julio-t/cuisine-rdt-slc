import {
  AmbientLight,
  Box3,
  BoxGeometry,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Food from '../models/Food';

export default class FoodOrbitCanvas {
  private requestAnimationFrameId: number = -1;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private controls: OrbitControls;
  private dummy: Mesh;

  constructor(canvas: HTMLCanvasElement) {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(5, 2, 2);

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas });
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new Scene();
    this.scene.add((this.dummy = new Mesh(new BoxGeometry(), new MeshStandardMaterial({ color: new Color('gray') }))));
    this.scene.add(new AmbientLight());

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    window.onresize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    function animate(obj: FoodOrbitCanvas) {
      obj.requestAnimationFrameId = requestAnimationFrame(() => animate(obj));
      obj.controls.update();
      obj.renderer.render(obj.scene, obj.camera);
    }

    animate(this);
  }

  public loadModel(model: Group) {
    this.scene.remove(this.dummy);
    this.scene.add(model);
    this.fitCameraToSelection(this.camera, this.controls, [model]);
  }

  public setCameraFocus(position: Vector3): void {
    const { x, y, z } = position;
    this.controls.target.set(x, y, z);
  }

  public resetCameraFocus(): void {
    this.controls.target.set(0, 0, 0);
  }

  public cleanUp(): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = -1;
    window.onresize = null;
    this.scene.children.forEach(child => this.scene.remove(child));
    this.renderer.dispose();
    this.controls.dispose();
  }

  private fitCameraToSelection(
    camera: PerspectiveCamera,
    controls: OrbitControls,
    selection: Object3D[],
    fitOffset = 0.75
  ): void {
    const box = new Box3();

    for (const object of selection) box.expandByObject(object);

    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    const maxSize = Math.max(size.x, size.y, size.z);
    const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
    const fitWidthDistance = fitHeightDistance / camera.aspect;
    const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);

    const direction = controls.target.clone().sub(camera.position).normalize().multiplyScalar(distance);

    controls.maxDistance = distance * 10;
    // controls.target.copy(center);

    camera.near = distance / 100;
    camera.far = distance * 100;
    camera.updateProjectionMatrix();

    camera.position.copy(controls.target).sub(direction);

    controls.update();
  }
}
