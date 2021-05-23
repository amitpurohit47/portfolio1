import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene(); // Like the drawing board

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight); // Its like eyes and perpectiveCam performs the function of eyes here

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
}); // this renders the scene to the screen

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera); // DRAW!!

const geometry = new THREE.TorusGeometry(10,3,16,100); // the basic structure or shape
const material = new THREE.MeshStandardMaterial({color:0xffcbf2}); // kind of css for the geometry
const torus = new THREE.Mesh(geometry,material); // combining geometry and material

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15,15,15);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper);

const controls = new OrbitControls(camera,renderer.domElement);

function addStars(){
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);

}

Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const amitTexture = new THREE.TextureLoader().load('11300.jpg');

const amit = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:amitTexture})
);

scene.add(amit);

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map:moonTexture,normalMap:normalTexture})
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function movecamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x+=0.05;
  moon.rotation.y+=0.075;
  moon.rotation.z+=0.05;

  amit.rotation.y+=0.01;
  amit.rotation.z+=0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.002;
  camera.position.y = t * -0.002;
}

document.body.onscroll = movecamera;

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x+=0.01;
  torus.rotation.y+=0.005;
  torus.rotation.z+=0.01;
  controls.update();
  renderer.render(scene,camera);
}

animate();