import React from 'react';

import * as THREE from 'three';
import './App.css';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const path = require('./FBX.fbx');
const App = () => {
  const scene = new THREE.Scene();

  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const light = new THREE.PointLight()
  light.position.set(2.5, 7.5, 15)
  scene.add(light)
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  camera.position.set(0, 0, 5);
  controls.update();
  document.body.appendChild(renderer.domElement);
  scene.add(camera);

 

  const loader = new FBXLoader();
  loader.load(path, (obj) => {

    scene.add(obj);
    console.log(obj);
    const bbox = new THREE.Box3();
    console.log(bbox.setFromObject(obj));
    
  },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
      console.log(error)
    })

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
  return (
    <div ></div>
  )
}

export default App