import { AmbientLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import Food from '../models/Food';

export default class FoodOrbitCanvas {
  constructor(canvas: HTMLCanvasElement, food: Food, model: GLTF) {
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 2, 2);

    const renderer = new WebGLRenderer({ antialias: true, alpha: true, canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    model.scenes.forEach(scene => {
      scene.scale.set(food.scale, food.scale, food.scale);
    });

    const scene = new Scene();
    scene.add(model.scene);
    scene.add(new AmbientLight());

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    window.onresize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }
}
