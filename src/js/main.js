import { initParticles } from './particles.js';
import { initMatrixRain } from './matrixRain.js';
import { init3DScene } from './scene3D.js';
import gsap from 'gsap';

document.addEventListener('DOMContentLoaded', async () => {
  // Generate quantum-inspired session ID
  const sessionId = Array.from({ length: 12 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('').toUpperCase();
  document.getElementById('session-id').textContent = sessionId;
  
  // Initialize all visual effects
  Promise.all([
    initParticles(),
    Promise.resolve(initMatrixRain()),
    Promise.resolve(init3DScene(document.getElementById('3d-scene')))
  ]).catch(console.error);
  
  // Start verification sequence
  startVerification();
});

function startVerification() {
  const steps = [
    { title: 'Quantum Handshake', message: 'Establishing secure quantum channel', duration: 2000 },
    { title: 'Neural Verification', message: 'Processing biometric signature', duration: 2500 },
    { title: 'Encryption Matrix', message: 'Generating secure access keys', duration: 2000 },
    { title: 'Access Granted', message: 'Redirecting to secure stream', duration: 1500 }
  ];

  let currentStep = 0;
  let progress = 0;
  
  const statusText = document.querySelector('.status-text');
  const progressFill = document.querySelector('.progress-fill');
  const progressGlow = document.querySelector('.progress-glow');
  const progressPercentage = document.querySelector('.progress-percentage');
  
  function updateProgress() {
    const progressValue = `${progress}%`;
    progressFill.style.width = progressValue;
    progressGlow.style.width = progressValue;
    progressPercentage.textContent = `${Math.round(progress)}%`;
    
    // Animate glow effect
    gsap.to(progressGlow, {
      opacity: 0.8,
      duration: 0.5,
      yoyo: true,
      repeat: 1
    });
  }
  
  function updateStep(index) {
    document.querySelectorAll('.step').forEach((step, i) => {
      if (i < index) {
        step.classList.add('completed');
        step.classList.remove('active');
      } else if (i === index) {
        step.classList.add('active');
        step.classList.remove('completed');
        
        // Animate step activation
        gsap.from(step, {
          opacity: 0,
          x: -20,
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        step.classList.remove('active', 'completed');
      }
    });
  }
  
  function simulateProgress() {
    if (currentStep >= steps.length) {
      // Add final animation before redirect
      gsap.to('.verification-box', {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power2.in",
        onComplete: () => {
          window.location.href = 'https://zaneflix.com';
        }
      });
      return;
    }
    
    const step = steps[currentStep];
    const stepProgress = 100 / steps.length;
    const startProgress = currentStep * stepProgress;
    const endProgress = startProgress + stepProgress;
    
    statusText.textContent = step.message;
    updateStep(currentStep);
    
    // Animate progress with GSAP
    gsap.to({ value: progress }, {
      value: endProgress,
      duration: step.duration / 1000,
      ease: "power1.inOut",
      onUpdate: function() {
        progress = this.targets()[0].value;
        updateProgress();
      },
      onComplete: () => {
        currentStep++;
        simulateProgress();
      }
    });
  }
  
  // Start the sequence with initial animation
  gsap.from('.verification-box', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power2.out",
    onComplete: simulateProgress
  });
}