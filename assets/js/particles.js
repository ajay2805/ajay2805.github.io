/**
 * AJAY A J - Kinetic Energy & Dynamic Particle Stream Canvas
 * Generates constellation connections, click shockwaves, and dynamic mouse motion sparks
 * Fully responsive & dynamically adapts to both Dark Mode and White/Light Mode
 */

(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let sparks = [];
  let shockwaves = [];
  let mouse = { x: null, y: null, prevX: null, prevY: null, radius: 150 };

  function isLightMode() {
    return document.body.classList.contains('light-theme');
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  // Motion Spark that trails behind mouse movements
  class Spark {
    constructor(x, y, vx, vy) {
      this.x = x;
      this.y = y;
      this.vx = vx * 0.3 + (Math.random() - 0.5) * 1.5;
      this.vy = vy * 0.3 + (Math.random() - 0.5) * 1.5;
      this.radius = Math.random() * 2.5 + 1.2;
      this.alpha = 0.85;
      this.decay = Math.random() * 0.025 + 0.02;
      this.color = Math.random() > 0.5 ? '6, 182, 212' : '99, 102, 241';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.95;
      this.vy *= 0.95;
      this.alpha -= this.decay;
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLightMode()
        ? `rgba(37, 99, 235, ${this.alpha * 0.95})`
        : `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  class Shockwave {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 6;
      this.maxRadius = Math.min(width, height) * 0.35;
      this.speed = 8;
      this.alpha = 0.65;
    }

    update() {
      this.radius += this.speed;
      this.alpha = Math.max(0, 0.65 * (1 - this.radius / this.maxRadius));
    }

    draw() {
      if (this.alpha <= 0) return;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = isLightMode()
        ? `rgba(79, 70, 229, ${this.alpha * 0.85})`
        : `rgba(6, 182, 212, ${this.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.55;
      this.vy = (Math.random() - 0.5) * 0.55;
      this.radius = Math.random() * 1.8 + 0.8;
      this.baseAlpha = Math.random() * 0.45 + 0.2;
      this.color = Math.random() > 0.4 ? '6, 182, 212' : (Math.random() > 0.5 ? '99, 102, 241' : '168, 85, 247');
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse soft repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = (dx / dist) * force * 1.6;
          const directionY = (dy / dist) * force * 1.6;
          this.x -= directionX;
          this.y -= directionY;
        }
      }

      // Shockwave push
      for (let sw of shockwaves) {
        const dx = this.x - sw.x;
        const dy = this.y - sw.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(dist - sw.radius) < 30) {
          const pushForce = 3.8 * sw.alpha;
          this.x += (dx / dist) * pushForce;
          this.y += (dy / dist) * pushForce;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLightMode()
        ? `rgba(79, 70, 229, ${Math.min(0.85, this.baseAlpha * 1.6)})`
        : `rgba(${this.color}, ${this.baseAlpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 13000), 90);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const maxDist = 125;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.16;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isLightMode()
            ? `rgba(79, 70, 229, ${Math.min(0.5, alpha * 2.2)})`
            : `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Connect mouse to nearby particles
    if (mouse.x !== null && mouse.y !== null) {
      for (let p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.28;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = isLightMode()
            ? `rgba(37, 99, 235, ${Math.min(0.65, alpha * 2)})`
            : `rgba(6, 182, 212, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  let animationId;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Shockwaves
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      shockwaves[i].update();
      shockwaves[i].draw();
      if (shockwaves[i].alpha <= 0) {
        shockwaves.splice(i, 1);
      }
    }

    // Sparks (Motion trail)
    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      sparks[i].draw();
      if (sparks[i].alpha <= 0) {
        sparks.splice(i, 1);
      }
    }

    // Constellation Particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    drawConnections();

    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    const vx = mouse.x !== null ? e.clientX - mouse.x : 0;
    const vy = mouse.y !== null ? e.clientY - mouse.y : 0;

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Emit kinetic sparks on mouse movement
    const speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > 2 && sparks.length < 50) {
      const count = Math.min(Math.floor(speed / 4), 3);
      for (let i = 0; i < count; i++) {
        sparks.push(new Spark(e.clientX, e.clientY, vx, vy));
      }
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Shockwave trigger on click
  window.addEventListener('click', (e) => {
    if (['BUTTON', 'A', 'INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    shockwaves.push(new Shockwave(e.clientX, e.clientY));
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  resize();
  animate();
})();
