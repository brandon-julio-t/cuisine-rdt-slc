import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import Food from '../models/Food';

export default class FoodOrbitCanvas {
  private requestAnimationFrameId: number = -1;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private controls: OrbitControls;

  constructor(canvas: HTMLCanvasElement, food: Food, private model: GLTF) {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(5, 2, 2);

    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    model.scenes.forEach(scene => {
      scene.scale.set(food.scale, food.scale, food.scale);
    });

    this.scene = new Scene();
    this.scene.add(model.scene);
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

  public cleanUp(): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = -1;
    window.onresize = null;
    this.scene.children.forEach(child => this.scene.remove(child));
    this.renderer.dispose();
    this.controls.dispose();
  }
}
