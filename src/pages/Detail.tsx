import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { AmbientLight, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import FoodService from '../components/services/FoodService';
import Food from '../models/Food';

interface Props {}

const Detail = (props: Props) => {
  const { id } = useParams<'id'>();

  if (!id) return <h1 className="text-4xl font-bold text-center">Invalid ID.</h1>;

  const [food, setFood] = useState<Food | null>(null);
  const [model, setModel] = useState<GLTF | null>(null);

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
    if (food && model) setupCanvas(model);
  }, [model]);

  if (!food || !model) return <h1 className="text-4xl font-bold text-center">Loading...</h1>;

  return (
    <div className="absolute w-screen h-screen">
      <h1 className="text-3xl font-bold text-center">{food.name}</h1>
    </div>
  );
};

function setupCanvas(model: GLTF) {
  const camera = new PerspectiveCamera();
  camera.position.set(7, 7, 7);

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const dom = renderer.domElement;
  dom.style.position = 'absolute';
  dom.style.left = '0';
  dom.style.top = '0';
  document.body.appendChild(dom);

  const scene = new Scene();
  scene.add(model.scene);
  scene.add(new AmbientLight());

  const controls = new OrbitControls(camera, dom);
  controls.enableDamping = true;

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

export default Detail;
