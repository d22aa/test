export function initMatrixRain() {
  const canvas = document.getElementById('matrix-rain');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  const chars = 'ZANEFLIXTREAMINGQUANTUMACCESS0123456789';
  const charArray = chars.split('');
  
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  
  const drops = Array(columns).fill(0).map(() => 
    Math.floor(Math.random() * -canvas.height/fontSize)
  );
  
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'rgba(0, 255, 170, 0.35)';
    ctx.font = `${fontSize}px monospace`;
    
    drops.forEach((drop, i) => {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drop * fontSize;
      
      // Add gradient effect
      const gradient = ctx.createLinearGradient(x, y - fontSize, x, y + fontSize);
      gradient.addColorStop(0, 'rgba(0, 255, 170, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 170, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 119, 255, 0.15)');
      
      ctx.fillStyle = gradient;
      ctx.fillText(char, x, y);
      
      if (drop * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      } else {
        drops[i]++;
      }
    });
  }
  
  setInterval(draw, 33);
}