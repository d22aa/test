document.addEventListener('DOMContentLoaded', () => {
  // Generate session ID
  const sessionId = Array.from({ length: 12 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('').toUpperCase();
  document.getElementById('session-id').textContent = sessionId;

  // Simulate verification process
  setTimeout(() => {
    window.location.href = 'https://zaneflix.com';
  }, 3000);
});