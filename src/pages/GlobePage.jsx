import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

// Shared Geometries and Materials for massive performance boost
const sharedMat = new THREE.MeshPhongMaterial({ color: '#00FF41', shininess: 50 });
const sharedStickGeo = new THREE.CylinderGeometry(0.15, 0.15, 3, 12);
sharedStickGeo.translate(0, 1.5, 0); // shift pivot to bottom
const sharedSphereGeo = new THREE.SphereGeometry(0.7, 32, 32);
const sharedHitboxGeo = new THREE.SphereGeometry(3.5, 16, 16);
const sharedHitboxMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });

export default function GlobePage({ islands, p, onSelectIsland, onClose }) {
  const globeEl = useRef();
  const getDimensions = () => {
    const zoom = window.innerWidth >= 768 ? 0.8 : 1;
    return {
      width: window.innerWidth / zoom,
      height: window.innerHeight / zoom
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions());

  useEffect(() => {
    const handleResize = () => setDimensions(getDimensions());
    window.addEventListener('resize', handleResize);
    
    // Auto-rotate
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false;
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Cleanup WebGL context to prevent Chrome's 16 active context limit
      if (globeEl.current) {
        try {
          if (typeof globeEl.current.pauseAnimation === 'function') {
            globeEl.current.pauseAnimation();
          }
          if (typeof globeEl.current.renderer === 'function') {
            const renderer = globeEl.current.renderer();
            if (renderer) {
              const gl = renderer.getContext();
              if (gl) {
                const ext = gl.getExtension('WEBGL_lose_context');
                if (ext) ext.loseContext();
              }
              renderer.dispose();
            }
          }
          if (typeof globeEl.current.scene === 'function') {
             const scene = globeEl.current.scene();
             if (scene) scene.clear();
          }
        } catch (e) {
          console.warn("Globe cleanup error:", e);
        }
      }
    };
  }, []);

  // Map islands to globe data format
  const globeData = islands.map(island => {
    return {
      lat: island.location?.lat || 0,
      lng: island.location?.lng || 0,
      size: 1.5,
      color: '#00FF41',
      name: island.name,
      island: island
    };
  }).filter(d => d.lat !== 0 || d.lng !== 0);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center fade-in bg-black">
      
      <div className="absolute bottom-32 md:bottom-auto md:top-32 left-4 md:left-8 z-40 pointer-events-none max-w-[80vw]">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
          Interactieve Wereldbol
        </h1>
        <p className="text-white/70 font-medium mt-2">Draai de bol en klik op een pin om een eiland te verkennen.</p>
      </div>

      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        objectsData={globeData}
        objectThreeObject={(d) => {
          const group = new THREE.Group();
          group.scale.set(1.1, 1.1, 1.1); // Make pins 10% larger

          // Stick (cylinder)
          const stick = new THREE.Mesh(sharedStickGeo, sharedMat);
          group.add(stick);

          // Sphere on top
          const sphere = new THREE.Mesh(sharedSphereGeo, sharedMat);
          sphere.position.y = 3; // Top of stick
          group.add(sphere);

          // Invisible Hitbox for easier clicking (especially on mobile)
          const hitbox = new THREE.Mesh(sharedHitboxGeo, sharedHitboxMat);
          hitbox.position.y = 2;
          group.add(hitbox);

          return group;
        }}
        onObjectClick={(point) => onSelectIsland(point.island)}
        objectLabel={(d) => `
          <div class="bg-white/90 text-black px-4 py-2 rounded-xl border-2 font-bold text-sm shadow-xl" style="border-color: #00FF41">
            ${d.name}
          </div>
        `}
      />
    </div>
  );
}
