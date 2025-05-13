import { Component, onCleanup, onMount } from "solid-js";

interface ParticleData {
  element: HTMLDivElement;
  startX: number;
  startY: number;
  animDuration: number;
  lastFrameId?: number;
}

const Particles: Component = () => {
  let particlesContainer!: HTMLDivElement;
  let particlesRef: ParticleData[] = [];

  const animateParticle = (particleData: ParticleData): void => {
    const animate = (): void => {
      const now = Date.now();
      const xOffset =
        Math.sin((now / particleData.animDuration) * Math.PI * 2) * 10;
      const yOffset =
        Math.cos((now / particleData.animDuration) * Math.PI * 2) * 10;

      particleData.element.style.left = `${particleData.startX + xOffset}%`;
      particleData.element.style.top = `${particleData.startY + yOffset}%`;

      particleData.lastFrameId = requestAnimationFrame(animate);
    };

    particleData.lastFrameId = requestAnimationFrame(animate);
  };

  onMount(() => {
    if (!particlesContainer) return;
    // Clear any existing particles
    if (particlesRef && particlesRef.length > 0) {
      particlesRef.forEach((particle) => {
        if (particle.lastFrameId) {
          cancelAnimationFrame(particle.lastFrameId);
        }
      });

      if (particlesContainer) {
        particlesContainer.innerHTML = "";
      }

      particlesRef = [];
    }

    // Create new particles
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      // Random size
      const size = Math.random() * 3 + 1;

      // Set styles
      particle.style.position = "absolute";
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      particle.style.borderRadius = "50%";
      particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;

      particlesContainer.appendChild(particle);

      // Store particle data for animation and cleanup
      const particleData: ParticleData = {
        element: particle,
        startX: posX,
        startY: posY,
        animDuration: Math.random() * 20000 + 10000, // Random duration between 10-30 seconds
      };

      particlesRef.push(particleData);

      // Start animation
      animateParticle(particleData);
    }
  });

  onCleanup(() => {
    if (particlesRef) {
      particlesRef.forEach((particle) => {
        if (particle.lastFrameId) {
          cancelAnimationFrame(particle.lastFrameId);
        }
      });
    }
    if (particlesContainer) {
      particlesContainer.innerHTML = "";
    }
  });

  return (
    <div
      ref={particlesContainer}
      class="particles absolute z-10 top-0 left-0 w-full h-full overflow-hidden"
      id="particles"
    >
      <ParticleStyles />
    </div>
  );
};

export default Particles;

const ParticleStyles = () => {
  return (
    <style>{`
     .particle {
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      }
          `}</style>
  );
};
