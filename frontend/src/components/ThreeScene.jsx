// ... (importaciones)
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const ThreeScene = () => {
  const sceneRef = useRef();

  useEffect(() => {
    // Scene variables
    let container, clock, mixer, actions, activeAction, previousAction;
    let camera, scene, renderer, model;

    const api = { state: 'Walking' };

    init();
    animate();

    function init() {
      container = sceneRef.current;

      // Camera setup
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 100);
      camera.position.set(-5, 3, 10);
      camera.lookAt(0, 2, 0);

      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xe0e0e0);
      scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);

      clock = new THREE.Clock();

      // Lights setup
      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 3);
      dirLight.position.set(0, 20, 10);
      scene.add(dirLight);




      // Model loading
      const loader = new GLTFLoader();
      loader.load('/RobotExpressive.glb', function (gltf) {
        model = gltf.scene;
        scene.add(model);
        createAnimations(gltf.animations);
      }, undefined, function (e) {
        console.error(e);
      });

      // Renderer setup
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      window.addEventListener('resize', onWindowResize);
    }

    function createAnimations(animations) {
      const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
    
      mixer = new THREE.AnimationMixer(model);
      actions = {};
    
      for (let i = 0; i < animations.length; i++) {
        const clip = animations[i];
        const action = mixer.clipAction(clip);
        actions[clip.name] = action;
    
        if (states.indexOf(clip.name) >= 0) {
          action.clampWhenFinished = true;
          action.loop = THREE.LoopRepeat; // Cambiado de THREE.LoopOnce a THREE.LoopRepeat
        }
      }
    
      activeAction = actions['Dance'];
      activeAction.play();
    }

    function fadeToAction(name, duration) {
      previousAction = activeAction;
      activeAction = actions[name];

      if (previousAction !== activeAction) {
        previousAction.fadeOut(duration);
      }

      activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      const dt = clock.getDelta();

      if (mixer) mixer.update(dt);

      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return <div ref={sceneRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default ThreeScene;
