import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Card from '../components/common/Card';
import FoodService from '../components/services/FoodService';
import Food from '../models/Food';

interface Props {}

const Detail = (props: Props) => {
  const { id } = useParams<'id'>();

  if (!id) return <h1 className="text-4xl font-bold text-center">Invalid ID.</h1>;

  const [food, setFood] = useState<Food | null>(null);
  const [model, setModel] = useState<GLTF | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    (async () => {
      const food = await FoodService.getFoodById(id);
      if (!food) return;
      setFood(food);
      new GLTFLoader().load(food?.modelUrl, gltf => {
        setModel(gltf);
      });
    })();
  }, [id]);

  useEffect(() => {
    if (canvas.current && food && model) setupCanvas(canvas.current, food, model);
  }, [canvas.current, food, model]);

  if (!food || !model)
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <h1 className="text-4xl font-bold text-center">Loading...</h1>
      </div>
    );

  return (
    <>
      <div className="w-full absolute top-8">
        <Card className="max-w-xl w-min mx-auto">
          <h1 className="text-3xl font-bold text-center z-10">{food.name}</h1>
        </Card>
      </div>
      <div className="w-full absolute bottom-8 z-10">
        <Card className="max-w-xl max-h-56 mx-auto overflow-auto">{food.description}</Card>
      </div>

      <canvas ref={canvas} className="absolute top-0 left-0"></canvas>
    </>
  );
};

function setupCanvas(canvas: HTMLCanvasElement, food: Food, model: GLTF) {
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

export default Detail;
