import * as THREE from 'three';
import gsap from 'gsap';

export function init3DScene(container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 5;
  
  const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
  });
  renderer.setSize(300, 300);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);
  
  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff3366,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);
  
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff3366,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  });
  
  const glowGeometry = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
  const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glowMesh);
  
  function animate() {
    requestAnimationFrame(animate);
    
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    
    glowMesh.rotation.x = torusKnot.rotation.x;
    glowMesh.rotation.y = torusKnot.rotation.y;
    
    const time = Date.now() * 0.001;
    const scale = 1 + 0.1 * Math.sin(time * 2);
    torusKnot.scale.setScalar(scale);
    glowMesh.scale.setScalar(scale + 0.1);
    
    renderer.render(scene, camera);
  }
  
  gsap.from([torusKnot.scale, glowMesh.scale], {
    x: 0,
    y: 0,
    z: 0,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)"
  });
  
  animate();
  
  window.addEventListener('resize', () => {
    renderer.setSize(300, 300);
  });
  
  return {
    scene,
    camera,
    renderer,
    torusKnot,
    glowMesh
  };
}