// Living Tree Animation System
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tree-canvas-container");
  if (!container) return;

  // 6. Floating Ambient Particles (Embers)
  const particleCanvas = document.createElement("canvas");
  particleCanvas.className = "absolute inset-0 w-full h-full pointer-events-none";
  particleCanvas.style.zIndex = "2";
  container.appendChild(particleCanvas);
  const ctx = particleCanvas.getContext("2d");

  let particles = [];
  function resizeCanvas() {
    particleCanvas.width = container.clientWidth;
    particleCanvas.height = container.clientHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      // Spawn at the top for falling petals
      this.x = Math.random() * particleCanvas.width;
      this.y = Math.random() * particleCanvas.height * -0.5; // Start above screen
      this.size = 2 + Math.random() * 4;
      this.speedY = 1 + Math.random() * 1.5;
      this.speedX = Math.random() * 1.5 - 0.75;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      this.alpha = Math.random() * 0.5 + 0.3;
      this.color = Math.random() > 0.5 ? "255, 183, 197" : "255, 141, 161"; // Petal colors
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.05 + 0.02;
    }

    update() {
      this.y += this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 1.5; // Swaying
      this.rotation += this.rotationSpeed;
      
      if (this.y > particleCanvas.height + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.beginPath();
      // Draw a simple petal shape
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(this.size * 1.5, -this.size, this.size * 2, 0);
      ctx.quadraticCurveTo(this.size * 1.5, this.size, 0, 0);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate particles
  for (let i = 0; i < 40; i++) {
    const p = new Particle();
    p.y = Math.random() * particleCanvas.height; // Distribute initially
    particles.push(p);
  }

  function drawParticles() {
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    ctx.shadowBlur = 0; // Reset canvas shadows
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  // 7. Scroll Reveal & Glass Panel Centering Effects
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal-on-scroll").forEach(el => {
    scrollObserver.observe(el);
  });

  // Track scroll to update glass panel intensities when centered
  function updateGlassGlows() {
    const viewportCenter = window.innerHeight / 2;
    const panels = document.querySelectorAll(".glass-panel");
    
    panels.forEach(panel => {
      const rect = panel.getBoundingClientRect();
      const panelCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(viewportCenter - panelCenter);
      
      // If the panel is within 250px of the vertical center of the screen
      if (distanceFromCenter < 250) {
        const intensity = 1 - (distanceFromCenter / 250); // 0 to 1
        // Slightly boost background opacity and border color alpha
        panel.style.backgroundColor = `rgba(15, 15, 20, ${0.45 + intensity * 0.15})`;
        panel.style.borderColor = `rgba(255, 255, 255, ${0.08 + intensity * 0.12})`;
      } else {
        // Reset to default
        panel.style.backgroundColor = "";
        panel.style.borderColor = "";
      }
    });
  }
  
  window.addEventListener("scroll", updateGlassGlows);
  updateGlassGlows(); // Run once initially

  // 8. Magnetic Buttons Interaction
  document.querySelectorAll('.btn-glass, .nav-links a').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
});

