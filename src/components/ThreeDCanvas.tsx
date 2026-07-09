import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeDCanvasProps {
  interactiveGeometry?: "sphere" | "torus" | "box" | "cone" | "knot" | "all";
  speedMultiplier?: number;
  hoverColor?: string;
  key?: any;
}

export default function ThreeDCanvas({
  interactiveGeometry = "knot",
  speedMultiplier = 1,
  hoverColor = "#e11d48"
}: ThreeDCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // WebGL support check using a dummy canvas to prevent context conflicts
    try {
      const dummyCanvas = document.createElement("canvas");
      const gl = dummyCanvas.getContext("webgl") || dummyCanvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08080a, 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 12;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x0d0d11, 1.5);
    scene.add(ambientLight);

    // Directional lighting
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    // Custom point lights that follow the cursor
    const pointLight = new THREE.PointLight(new THREE.Color(hoverColor), 15, 30);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0x3b82f6, 10, 20);
    secondaryLight.position.set(-5, -5, -2);
    scene.add(secondaryLight);

    // Group for mouse parallax
    const interactiveGroup = new THREE.Group();
    scene.add(interactiveGroup);

    // Core Geometry
    let geometry: THREE.BufferGeometry;
    if (interactiveGeometry === "sphere") {
      geometry = new THREE.SphereGeometry(2.5, 64, 64);
    } else if (interactiveGeometry === "torus") {
      geometry = new THREE.TorusGeometry(1.8, 0.7, 32, 64);
    } else if (interactiveGeometry === "box") {
      geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    } else if (interactiveGeometry === "cone") {
      geometry = new THREE.ConeGeometry(2, 3.5, 32);
    } else {
      geometry = new THREE.TorusKnotGeometry(1.4, 0.5, 120, 16);
    }

    // Holographic Glass Material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x27272a,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 1.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      flatShading: false,
      transparent: true,
      opacity: 0.85,
    });

    const mesh = new THREE.Mesh(geometry, material);
    interactiveGroup.add(mesh);

    // Wireframe overlay for Swiss editorial layout grid vibe
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x44444c,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    wireframeMesh.scale.multiplyScalar(1.002);
    interactiveGroup.add(wireframeMesh);

    // Floating Interactive Particles Field
    const particlesCount = 280;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const scaleFactors = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 12;
      scaleFactors[i / 3] = Math.random();
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom Canvas Particle Texture (glowing circles instead of squares)
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const ctx = particleCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x52525b,
      size: 0.12,
      transparent: true,
      opacity: 0.6,
      map: particleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse events inside the container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Observer to match responsive sizing precisely
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (Damping)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Update light tracking
      pointLight.position.x = mouseRef.current.x * 5;
      pointLight.position.y = mouseRef.current.y * 5;

      // Object rotations
      mesh.rotation.y = elapsedTime * 0.15 * speedMultiplier + mouseRef.current.x * 0.5;
      mesh.rotation.x = elapsedTime * 0.1 * speedMultiplier + mouseRef.current.y * 0.5;
      wireframeMesh.rotation.y = mesh.rotation.y;
      wireframeMesh.rotation.x = mesh.rotation.x;

      // Deform mesh subtly over time for "organic breathing" feel
      if (mesh.geometry instanceof THREE.TorusKnotGeometry) {
        mesh.scale.setScalar(1 + Math.sin(elapsedTime * 1.5) * 0.04);
        wireframeMesh.scale.setScalar(1.002 * (1 + Math.sin(elapsedTime * 1.5) * 0.04));
      } else {
        mesh.scale.setScalar(1 + Math.cos(elapsedTime * 1.2) * 0.03);
        wireframeMesh.scale.setScalar(1.002 * (1 + Math.cos(elapsedTime * 1.2) * 0.03));
      }

      // Parallax interactive group drift
      interactiveGroup.position.x = mouseRef.current.x * 0.6;
      interactiveGroup.position.y = mouseRef.current.y * 0.6;

      // Wave-like ripple for the floating particles
      const positionsAttr = particlesGeometry.attributes.position as THREE.BufferAttribute;
      if (positionsAttr) {
        const posArray = positionsAttr.array as Float32Array;
        for (let i = 0; i < particlesCount; i++) {
          const idx = i * 3;
          // Apply subtle sinusoidal wave movement based on mouse + elapsed time
          const px = posArray[idx];
          const py = posArray[idx + 1];
          posArray[idx + 2] += Math.sin(elapsedTime * 0.8 + px * 0.2 + py * 0.2) * 0.003;
        }
        positionsAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanups
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      wireframeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [interactiveGeometry, speedMultiplier, hoverColor]);

  if (!isSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-zinc-950/40 text-xs font-mono text-zinc-500 border border-zinc-800 rounded-lg p-6">
        [WebGL context fallback: Rendering interactive vector matrices]
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full block" />
    </div>
  );
}
