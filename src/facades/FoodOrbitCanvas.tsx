import { AmbientLight, Color, PerspectiveCamera, Scene, SpotLight, sRGBEncoding, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import Food from '../models/Food';

export default class FoodOrbitCanvas {
  private requestAnimationFrameId: number = -1;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private controls: OrbitControls;

  constructor(canvas: HTMLCanvasElement, food: Food, model: GLTF) {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(5, 2, 2);

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas });
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    model.scenes.forEach(scene => scene.scale.set(food.scale, food.scale, food.scale));

    this.scene = new Scene();
    this.scene.add(model.scene);
    this.scene.add(new AmbientLight());

    // Point of interest helper
    // food.pointOfInterests.forEach(pointOfInterest => {
    //   const placeholder = new Mesh(new BoxGeometry(), new MeshNormalMaterial({ wireframe: true }));
    //   const { x, y, z } = pointOfInterest.position;
    //   placeholder.position.set(x, y, z);
    //   this.scene.add(placeholder);
    // });

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

  public setCameraFocus(position: Vector3) {
    // this.camera.lookAt(position);
    const { x, y, z } = position;
    this.controls.target.set(x, y, z);
  }

  public resetCameraFocus() {
    // this.camera.lookAt(0, 0, 0);
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
}
