import { Box, Html, OrbitControls, useGLTF, useProgress } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import FoodService from '../components/services/FoodService';
import Food from '../models/Food';

interface Props {}

const Detail = (props: Props) => {
  const { id } = useParams<'id'>();

  if (!id) return <h1 className="text-4xl font-bold text-center">Invalid ID.</h1>;

  const { progress } = useProgress();

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

  if (!food || !model) return <h1 className="text-4xl font-bold text-center">Loading {progress}%...</h1>;

  return (
    <div className="absolute w-screen h-screen">
      <Canvas>
        <Suspense fallback={<Html center>Loading {progress}%...</Html>}>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
          <ambientLight intensity={1} />
          {model && <primitive object={model.scene} scale={food.scale} />}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Detail;
