import React, { useRef, useEffect, useState } from 'react';

interface ThreeDCanvasProps {
  isNeuralActive: boolean;
  isOpticActive: boolean;
}

interface SakuraPetal {
  x: number;
  y: number;
  z: number; // Depth factor (0.5 to 2.0)
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  angleSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  isEmber?: boolean; // rising upwards like thermal sparks
}

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  alpha: number;
}

export const ThreeDCanvas: React.FC<ThreeDCanvasProps> = ({
  isNeuralActive,
  isOpticActive,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const petalsRef = useRef<SakuraPetal[]>([]);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isOver: false });
  const [dimensions, setDimensions] = useState({ width: 800, height: 450 });
  const timeRef = useRef<number>(0);

  // Handle Resize correctly
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        initPetals(width, height);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    handleResize();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const initPetals = (width: number, height: number) => {
    const count = 140;
    const tempPetals: SakuraPetal[] = [];
    const activeColors = ['#ff8da1', '#f472b6', '#ec4899', '#f25c74', '#ffd5ec'];

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 1.5 + 0.5; // z-depth
      const isEmber = Math.random() > 0.68; // 32% of items are upward thermal sparks
      
      tempPetals.push({
        x: Math.random() * width,
        y: isEmber 
          ? height + Math.random() * height 
          : Math.random() * height - height,
        z: z,
        size: isEmber 
          ? (Math.random() * 3 + 1.5) * (z * 0.7) 
          : (Math.random() * 5 + 3) * (z * 0.7),
        speedY: isEmber 
          ? -(Math.random() * 0.5 + 0.3) * z * (isNeuralActive ? 2.5 : 1.0)
          : (Math.random() * 1.2 + 0.6) * z * (isNeuralActive ? 2.5 : 1.0),
        speedX: (Math.random() * 0.8 - 0.4) * (isNeuralActive ? 2.0 : 1.0),
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() * 0.02 - 0.01) * (isNeuralActive ? 3.0 : 1.0),
        flip: Math.random(),
        flipSpeed: Math.random() * 0.03 + 0.01,
        color: isEmber 
          ? '#ffd5ec'
          : activeColors[Math.floor(Math.random() * activeColors.length)],
        isEmber: isEmber,
      });
    }
    petalsRef.current = tempPetals;

    // Generate realistic starfield
    const tempStars: Star[] = [];
    for (let i = 0; i < 250; i++) {
      tempStars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.68),
        size: Math.random() * 1.5 + 0.2,
        twinkleSpeed: Math.random() * 0.05 + 0.01,
        alpha: Math.random()
      });
    }
    starsRef.current = tempStars;
  };

  // Keep colors and speed properties updated if themeMode or isNeuralActive changes without resetting positions!
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      if (petalsRef.current.length === 0) {
        initPetals(dimensions.width, dimensions.height);
      } else {
        const activeColors = ['#ff8da1', '#f472b6', '#ec4899', '#f25c74', '#ffd5ec'];
        
        petalsRef.current.forEach((p) => {
          // Live calculate velocities keeping positions intact
          p.speedY = p.isEmber 
            ? -(Math.random() * 0.5 + 0.3) * p.z * (isNeuralActive ? 2.5 : 1.0)
            : (Math.random() * 1.2 + 0.6) * p.z * (isNeuralActive ? 2.5 : 1.0);
          p.speedX = (Math.random() * 0.8 - 0.4) * (isNeuralActive ? 2.0 : 1.0);
          p.angleSpeed = (Math.random() * 0.02 - 0.01) * (isNeuralActive ? 3.0 : 1.0);
          
          p.color = p.isEmber 
            ? '#ffd5ec'
            : activeColors[Math.floor(Math.random() * activeColors.length)];
        });
      }
    }
  }, [isNeuralActive]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = clientX;
      mouseRef.current.targetY = clientY;
      mouseRef.current.isOver = true;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOver = false;
  };

  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { width, height } = dimensions;
      timeRef.current += 0.02;
      const time = timeRef.current;

      // Mouse Lerp
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Clear Screen with deep cosmic midnight
      ctx.fillStyle = '#05070a';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle electronic scan lines overlay
      if (isOpticActive) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.lineWidth = 1;
        for (let y = 0; y < height; y += 4) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Parallax mouse offsets
      const mouseOffsetX = mouse.isOver ? (mouse.x - width / 2) / (width / 2) : 0;
      const mouseOffsetY = mouse.isOver ? (mouse.y - height / 2) / (height / 2) : 0;

      // 0. Draw Starfield Background
      drawStars(ctx, width, height, mouseOffsetX, mouseOffsetY, time);

      // 1. Draw glowing cyberpunk grid (strictly behind the objects)
      if (isOpticActive) {
        drawCyberGrid(ctx, width, height, mouseOffsetX, mouseOffsetY);
      }

      // 2. Draw Giant Moon
      drawMoon(ctx, width, height, mouseOffsetX, mouseOffsetY, time);

      // 2.5 Draw Atmospheric Fog
      drawAtmosphere(ctx, width, height);

      // 3. Draw Water Reflection (Dynamic rippling water)
      drawWaterReflection(ctx, width, height, mouseOffsetX, mouseOffsetY, time);

      // 4. Draw Floating Rocky Island
      drawIsland(ctx, width, height, mouseOffsetX, mouseOffsetY, time);

      // 5. Draw Generative Cherry Blossom Tree
      drawTrunkAndBranches(ctx, width, height, mouseOffsetX, mouseOffsetY, time);

      // 6. Draw Falling Sakura Petals & Update Particles
      drawAndUpdatesSakuraPetals(ctx, width, height, mouse);

      // 7. Render dynamic targeting cursor overlay
      drawIntersectionsAndTelemetry(ctx, width, height, mouse);

      animationFrameId = requestAnimationFrame(render);
    };

    // Draw Starfield
    const drawStars = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mx: number,
      my: number,
      time: number
    ) => {
      ctx.save();
      const stars = starsRef.current;
      ctx.fillStyle = '#ffffff';
      stars.forEach((star) => {
        // Subtly parallax stars
        const px = star.x + (w / 2 - star.x) * mx * 0.02;
        const py = star.y + (h / 2 - star.y) * my * 0.02;

        const currentAlpha = Math.abs(Math.sin(time * star.twinkleSpeed + star.alpha * 10)) * 0.6 + 0.1;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow to slightly larger stars
        if (star.size > 1.2) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = '#ffffff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      ctx.restore();
    };

    // Draw Atmospheric effect near horizon
    const drawAtmosphere = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.save();
      const horizonY = h * 0.68;
      const fogHeight = Math.min(h * 0.2, 90);
      
      // Blend fog over the water and base of the sky
      const gradFog = ctx.createLinearGradient(0, horizonY - fogHeight, 0, horizonY + fogHeight * 0.5);
      gradFog.addColorStop(0, 'rgba(5, 7, 10, 0)');
      gradFog.addColorStop(0.8, 'rgba(12, 16, 26, 0.4)');
      gradFog.addColorStop(1, 'rgba(4, 6, 8, 0.8)');
      
      ctx.fillStyle = gradFog;
      ctx.fillRect(0, horizonY - fogHeight, w, fogHeight * 1.5);
      ctx.restore();
    };

    // Draw Cyber Grid
    const drawCyberGrid = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mx: number,
      my: number
    ) => {
      ctx.save();
      const gridColor = 'rgba(219, 39, 119, 0.05)';
      const lineColor = 'rgba(219, 39, 119, 0.12)';

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      const gridYStart = h * 0.45;
      const gridHeight = h * 0.35;
      const perspectiveScaleY = 3.0;

      // Draw horizontal vanishing lines
      for (let i = 0; i <= 10; i++) {
        // Perspective distribution
        const ratio = Math.pow(i / 10, perspectiveScaleY);
        const y = gridYStart + ratio * gridHeight;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw perspective vanishing rays
      const horizonX = w / 2 - mx * 25;
      const horizonY = gridYStart;
      const lineCount = 20;

      for (let i = 0; i <= lineCount; i++) {
        const targetX = (w / lineCount) * i;
        ctx.beginPath();
        ctx.moveTo(horizonX, horizonY);
        ctx.lineTo(targetX, h * 0.85);
        ctx.stroke();
      }

      ctx.restore();
    };

    // Draw the giant glowing neon moon
    const drawMoon = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mx: number,
      my: number,
      time: number
    ) => {
      ctx.save();
      const moonX = w / 2 - mx * 18;
      const moonY = h * 0.38 - my * 10;
      const moonRadius = Math.min(w, h) * 0.32;

      // Define themed gradients
      let glowOuter = 'rgba(236, 72, 153, 0)';
      let glowInner = '#db2777';
      let moonCenter = '#ffd5ec';

      // Moon glow effect
      const gradGlow = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius * 0.8,
        moonX,
        moonY,
        moonRadius * 1.6
      );
      gradGlow.addColorStop(0, glowInner);
      gradGlow.addColorStop(0.2, glowInner);
      gradGlow.addColorStop(1, glowOuter);

      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = gradGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';

      // Main Moon surface gradient
      const gradMoon = ctx.createRadialGradient(
        moonX - moonRadius * 0.2,
        moonY - moonRadius * 0.2,
        moonRadius * 0.1,
        moonX,
        moonY,
        moonRadius
      );
      gradMoon.addColorStop(0, '#ffffff');
      gradMoon.addColorStop(0.3, moonCenter);
      gradMoon.addColorStop(0.7, glowInner);
      gradMoon.addColorStop(1, '#020617');

      ctx.fillStyle = gradMoon;
      ctx.shadowColor = glowInner;
      ctx.shadowBlur = 40;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw subtle lunar craters representing topographic data
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      
      const drawCrater = (cxOffset: number, cyOffset: number, r: number) => {
        ctx.beginPath();
        ctx.arc(moonX + cxOffset, moonY + cyOffset, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.stroke();
      };

      drawCrater(-moonRadius * 0.4, -moonRadius * 0.3, moonRadius * 0.15);
      drawCrater(moonRadius * 0.3, -moonRadius * 0.4, moonRadius * 0.1);
      drawCrater(-moonRadius * 0.1, moonRadius * 0.5, moonRadius * 0.12);
      drawCrater(moonRadius * 0.5, moonRadius * 0.2, moonRadius * 0.08);
      drawCrater(moonRadius * 0.1, moonRadius * 0.6, moonRadius * 0.05);

      // Overlay neon circular boundary scope
      if (isOpticActive) {
        ctx.strokeStyle = glowInner;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([8, 12]);
        ctx.beginPath();
        ctx.arc(moonX, moonY, moonRadius + 15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();
    };

    // Draw Levitating Island
    const drawIsland = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mx: number,
      my: number,
      time: number
    ) => {
      ctx.save();
      const islandX = w / 2 - mx * 10 + Math.sin(time * 0.65) * 8;
      const islandY = h * 0.68 - my * 4 + Math.cos(time * 0.5) * 4;
      const islandWidth = w * 0.45;
      const islandHeight = h * 0.08;

      // Solid body with shadow base
      const gradIsland = ctx.createLinearGradient(islandX, islandY - islandHeight, islandX, islandY + islandHeight);
      gradIsland.addColorStop(0, '#101722');
      gradIsland.addColorStop(1, '#020305');
      ctx.fillStyle = gradIsland;
      
      ctx.beginPath();
      // Draw smooth dome-island base
      ctx.ellipse(islandX, islandY, islandWidth / 2, islandHeight / 2, 0, 0, Math.PI, false);
      ctx.lineTo(islandX + islandWidth / 2, islandY);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#db2777';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(islandX, islandY, islandWidth / 2, islandHeight / 2, 0, 0, Math.PI, false);
      ctx.stroke();

      // Top rugged outline representing stones
      ctx.fillStyle = '#030406';
      ctx.beginPath();
      ctx.moveTo(islandX - islandWidth / 2, islandY);
      
      const rockPoints = 16;
      for (let i = 0; i <= rockPoints; i++) {
        const ratio = i / rockPoints;
        const currentX = islandX - islandWidth / 2 + ratio * islandWidth;
        const noiseY = (Math.sin(ratio * Math.PI * 5) * 4) + (Math.cos(ratio * 12) * 2);
        ctx.lineTo(currentX, islandY - 3 + noiseY);
      }
      ctx.lineTo(islandX + islandWidth / 2, islandY + 5);
      ctx.lineTo(islandX - islandWidth / 2, islandY + 5);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Form cherry blossom tree silhouette
    const drawTrunkAndBranches = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mx: number,
      my: number,
      time: number
    ) => {
      ctx.save();
      const startX = w / 2 - mx * 10 + Math.sin(time * 0.65) * 8;
      const startY = h * 0.68 - my * 4 + Math.cos(time * 0.5) * 4;
      
      const trunkColor = '#060a0f';
      const bloomColor = 'rgba(219, 39, 119, 0.4)';
      const bloomCoreColor = '#f472b6';

      // 1. Draw trunk math-curves
      ctx.fillStyle = trunkColor;
      ctx.beginPath();
      
      // Base flare
      ctx.moveTo(startX - 18, startY);
      ctx.quadraticCurveTo(startX - 12, startY - 25, startX - 8, startY - 50);
      ctx.lineTo(startX + 8, startY - 50);
      ctx.quadraticCurveTo(startX + 12, startY - 25, startX + 18, startY);
      ctx.closePath();
      ctx.fill();

      // Main branches
      const drawBranch = (
        bx: number,
        by: number,
        length: number,
        angle: number,
        thick: number,
        depth: number
      ) => {
        if (depth > 4) return;

        // Add subtle sway on branches using sin waves
        const windSway = Math.sin(time + depth) * 0.015 * (isNeuralActive ? 3.0 : 1.0);
        const actualAngle = angle + windSway;

        const endX = bx + Math.cos(actualAngle) * length;
        const endY = by + Math.sin(actualAngle) * length;

        // Main thick stroke
        ctx.strokeStyle = trunkColor;
        ctx.lineWidth = thick;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Rim lighting reflection on the branch
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = Math.max(1, thick * 0.3);
        ctx.beginPath();
        ctx.moveTo(bx + thick * 0.15, by);
        ctx.lineTo(endX + thick * 0.15, endY);
        ctx.stroke();

        // Draw foliage clumps at end of branch branches
        if (depth >= 2) {
          ctx.save();
          ctx.shadowColor = bloomCoreColor;
          ctx.shadowBlur = 15;
          ctx.fillStyle = bloomColor;
          
          ctx.beginPath();
          ctx.arc(endX, endY, (6 - depth) * 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(endX + (5 - depth), endY - 2, (5 - depth) * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Branch out
        const nextDepth = depth + 1;
        const sizeReduction = 0.72;
        drawBranch(endX, endY, length * sizeReduction, actualAngle - 0.45, thick * 0.65, nextDepth);
        drawBranch(endX, endY, length * sizeReduction, actualAngle + 0.45, thick * 0.65, nextDepth);
        if (depth === 2) {
          drawBranch(endX, endY, length * 0.5, actualAngle * 0.1, thick * 0.5, nextDepth);
        }
      };

      // Start recursive generator (pointing upwards -PI/2)
      drawBranch(startX, startY - 50, h * 0.15, -Math.PI / 2, 11, 0);

      // Draw tiny stylized traveler silhouette standing next to the tree trunk (exact mockup replication)
      const personX = startX + 38;
      const personY = startY - 3;
      
      // Draw body
      ctx.fillStyle = '#020306';
      
      // Legs
      ctx.fillRect(personX - 1.2, personY - 7, 0.9, 7);
      ctx.fillRect(personX + 0.3, personY - 7, 0.9, 7);
      
      // Torso
      ctx.fillRect(personX - 2.2, personY - 15, 4.4, 8);
      
      // Head
      ctx.beginPath();
      ctx.arc(personX, personY - 17.5, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Glowing pink/red explorer HUD visor & neon jacket back logo (matches mockup perfectly)
      ctx.shadowColor = bloomCoreColor;
      ctx.shadowBlur = 5;
      ctx.fillStyle = bloomCoreColor;
      
      // Visor
      ctx.fillRect(personX - 0.4, personY - 18.2, 1.6, 0.6);
      // Small glowing center backpack/harness indicator
      ctx.fillRect(personX - 1, personY - 13.5, 2, 4.5);
      ctx.shadowBlur = 0;

      ctx.restore();
    };

    // Ripple Water Reflection overlay (adds immense value to the 3D look)
    const drawWaterReflection = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mx: number,
      my: number,
      time: number
    ) => {
      ctx.save();
      const reflectionY = h * 0.68;
      const reflectionHeight = h * 0.22;

      // Draw dark water foundation
      const gradWater = ctx.createLinearGradient(0, reflectionY, 0, h);
      gradWater.addColorStop(0, '#04070a');
      gradWater.addColorStop(1, '#010204');
      ctx.fillStyle = gradWater;
      ctx.fillRect(0, reflectionY, w, h);

      // Moon Reflection
      const moonX = w / 2 - mx * 18;
      const moonWidth = w * 0.35;
      const refGlowColor = 'rgba(219, 39, 119, 0.08)';

      for (let y = reflectionY; y < h - 10; y += 3) {
        const ratio = (y - reflectionY) / reflectionHeight;
        const waveScale = ratio * 15 + 4;
        const waveOffset = Math.sin(time * 2 + y * 0.12) * waveScale;
        
        ctx.strokeStyle = refGlowColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(moonX - moonWidth / 2 + waveOffset, y);
        ctx.lineTo(moonX + moonWidth / 2 - waveOffset, y);
        ctx.stroke();

        // High intensity neon highlights on water
        if (Math.sin(y * 0.5 + time) > 0.4) {
          ctx.strokeStyle = 'rgba(244, 114, 182, 0.2)';
          ctx.beginPath();
          ctx.moveTo(moonX - waveScale * 1.5 + waveOffset, y);
          ctx.lineTo(moonX + waveScale * 1.5 - waveOffset, y);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    // Perform Particle update & rendering loop
    const drawAndUpdatesSakuraPetals = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mouse: { x: number; y: number; isOver: boolean }
    ) => {
      ctx.save();
      const petals = petalsRef.current;

      petals.forEach((p) => {
        // Fall or Rise calculations
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.angle) * 0.3;
        p.angle += p.angleSpeed;
        p.flip += p.flipSpeed;

        // Interactive mouse push (Repulsion vector physics)
        if (mouse.isOver) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            const force = (90 - dist) / 90;
            const angleVal = Math.atan2(dy, dx);
            // Push petals outwards depending on depth `z` (closer petals push faster)
            p.x += Math.cos(angleVal) * force * 4.5 * p.z;
            p.y += Math.sin(angleVal) * force * 4.5 * p.z;
          }
        }

        // Screen boundary wraps depending on rising vs falling direction
        if (p.isEmber) {
          if (p.y < -15) {
            p.y = h + Math.random() * 50;
            p.x = Math.random() * w;
          }
        } else {
          if (p.y > h + 15) {
            p.y = -20;
            p.x = Math.random() * w;
          }
        }
        
        if (p.x < -20) {
          p.x = w + 15;
        } else if (p.x > w + 20) {
          p.x = -15;
        }

        // Draw individual 3D Petal or Spark with rotations
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        
        if (p.isEmber) {
          // Drawing glowing micro particle sparks
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.z > 1.2 ? 14 : 4;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();

          // Outer colored glow circle
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.5, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          // Drawing elegant classic leaf/petal shapes using Bezier curves
          const stretchX = Math.sin(p.flip) * p.size;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = p.z > 1.2 ? 8 : 2;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, stretchX, p.size, 0, 0, Math.PI * 2);
          ctx.fill();

          // Give center veins to close petals
          if (p.z > 1.4) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(0, p.size);
            ctx.stroke();
          }
        }

        ctx.restore();
      });

      ctx.restore();
    };

    // Fine Crosshair targeting vectors (adds amazing sci-fi telemetry flavor)
    const drawIntersectionsAndTelemetry = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      mouse: { x: number; y: number; isOver: boolean }
    ) => {
      if (!mouse.isOver) return;
      ctx.save();
      const crosshairColor = 'rgba(219, 39, 119, 0.4)';

      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 0.5;

      const mx = mouse.x;
      const my = mouse.y;

      // Draw faint dotted horizontal/vertical guide corridors
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(mx, 0);
      ctx.lineTo(mx, h);
      ctx.moveTo(0, my);
      ctx.lineTo(w, my);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw tight targeting rings at cursor
      ctx.beginPath();
      ctx.arc(mx, my, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mx, my, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#db2777';
      ctx.fill();

      // Precision micro coordinate label following the cursor
      ctx.fillStyle = '#94a3b8';
      ctx.font = '7px "JetBrains Mono", monospace';
      ctx.fillText(
        `LOC: [${Math.floor(mx)}px , ${Math.floor(my)}px]`,
        mx + 16,
        my - 8
      );

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, isNeuralActive, isOpticActive]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full overflow-hidden cursor-crosshair group rounded bg-[#05070a]"
      style={{ minHeight: '380px' }}
      id="hud-3d-viewport-wrapper"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ pointerEvents: 'none' }}
        id="hud-3d-canvas-surface"
      />

      {/* High Quality Noise Overlay for cinematic realism */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-[0.14]" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
        }}
      />

      {/* Cyberpunk Ambient CRT Sweep effect overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.015] to-transparent bg-[length:100%_400px] animate-[pulse_3s_infinite]" />
      
      {/* HUD telemetries on edges - overlay absolute elements perfectly replicating the mockup */}
      <div className="absolute inset-0 p-4 pointer-events-none flex flex-col justify-between select-none">
        {/* Top telemetry items */}
        <div className="flex justify-between items-start font-mono text-[9px] tracking-widest text-[#64748b]">
          <div className="space-y-1 text-left">
            <div>LAT: {isNeuralActive ? '35.6895° N' : '35.7012° N'}</div>
            <div>LON: {isNeuralActive ? '139.6917° E' : '139.7344° E'}</div>
            <div>ATM: {isNeuralActive ? '1013.2 HPA' : '1009.6 HPA'}</div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-[#f43f5e] font-semibold animate-pulse flex items-center justify-end">
              REC <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f43f5e] ml-1.5" />
            </div>
            <div>LUM: OPTIMAL</div>
            <div className={'text-primary'}>
              TARGET ACQUIRED
            </div>
          </div>
        </div>

        {/* Center Target Symbol */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-slate-700/40 text-sm font-light select-none font-mono">
          +
        </div>

        {/* Bottom telemetry indicators */}
        <div className="flex justify-between items-end font-mono text-[9px] tracking-widest text-[#64748b]">
          <div className="text-left space-y-0.5">
            <div>V 2.0.4  SYS_CORE: STABLE</div>
            <div className="text-[7px] text-[#334155]">RENDER: GLOW_MATRIX_REACTIVE</div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="text-slate-400 font-medium tracking-normal text-[10px]">
              {new Date().toISOString().slice(11, 19)}:
              <span className="text-xs text-[#ec4899] font-bold">
                {String(Math.floor(Math.random() * 90 + 10)).padStart(2, '0')}
              </span>
            </div>
            <div className="text-[7px] text-[#334155]">TZ_SYS: UTC+0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
