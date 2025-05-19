import * as THREE from 'three';
import gsap from 'gsap';

export function init3DScene(container) {
  // Scene setup
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
  
  // Create DNA helix structure
  const dnaGroup = new THREE.Group();
  
  // Parameters for DNA
  const turns = 3;
  const pointsPerTurn = 30;
  const radius = 1;
  const height = 4;
  const strandOffset = Math.PI;
  
  // Create strands
  for (let i = 0; i < 2; i++) {
    const points = [];
    const offset = i * strandOffset;
    
    for (let j = 0; j <= turns * pointsPerTurn; j++) {
      const t = j / pointsPerTurn;
      const angle = t * Math.PI * 2 * turns + offset;
      const y = height * (j / (turns * pointsPerTurn)) - height/2;
      
      points.push(new THREE.Vector3(
        radius * Math.cos(angle),
        y,
        radius * Math.sin(angle)
      ));
    }
    
    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, turns * pointsPerTurn, 0.1, 8, false);
    const material = new THREE.MeshBasicMaterial({
      color: i === 0 ? 0x00ffaa : 0x0077ff,
      transparent: true,
      opacity: 0.8,
      wireframe: true
    });
    
    const strand = new THREE.Mesh(geometry, material);
    dnaGroup.add(strand);
    
    // Add connecting segments
    for (let j = 0; j < turns * pointsPerTurn; j += 2) {
      const t1 = j / (turns * pointsPerTurn);
      const t2 = (j + 1) / (turns * pointsPerTurn);
      const pos1 = curve.getPoint(t1);
      const pos2 = curve.getPoint(t2);
      
      const connectorGeometry = new THREE.CylinderGeometry(0.05, 0.05, pos1.distanceTo(pos2));
      const connectorMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
      });
      
      const connector = new THREE.Mesh(connectorGeometry, connectorMaterial);
      connector.position.copy(pos1.clone().add(pos2).multiplyScalar(0.5));
      connector.lookAt(pos2);
      
      dnaGroup.add(connector);
    }
  }
  
  scene.add(dnaGroup);
  
  // Animation
  function animate() {
    requestAnimationFrame(animate);
    
    dnaGroup.rotation.y += 0.01;
    
    // Pulse effect
    const time = Date.now() * 0.001;
    const scale = 1 + 0.1 * Math.sin(time * 2);
    dnaGroup.scale.setScalar(scale);
    
    renderer.render(scene, camera);
  }
  
  // Start animation with GSAP intro
  gsap.from(dnaGroup.scale, {
    x: 0,
    y: 0,
    z: 0,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)"
  });
  
  animate();
  
  // Handle window resizing
  window.addEventListener('resize', () => {
    renderer.setSize(300, 300);
  });
  
  return {
    scene,
    camera,
    renderer,
    dnaGroup
  };
}