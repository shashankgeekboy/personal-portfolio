import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const Scene = () => {
  const { viewport } = useThree();
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  // Create a grid for the cyberpunk ground
  const grid = useMemo(() => {
    const gridSize = 20;
    const gridDivisions = 20;
    const gridGeometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);
    const gridMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#7800ff') },
        color2: { value: new THREE.Color('#00bfff') },
        gridWidth: { value: 0.02 },
        pulseSpeed: { value: 0.5 },
        gridSpacing: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float gridWidth;
        uniform float pulseSpeed;
        uniform float gridSpacing;
        varying vec2 vUv;
        
        float grid(vec2 uv, float width, float spacing) {
          vec2 grid = abs(fract(uv * spacing - 0.5) - 0.5) / width;
          float line = min(grid.x, grid.y);
          return 1.0 - min(line, 1.0);
        }
        
        void main() {
          float brightness = sin(time * pulseSpeed) * 0.5 + 0.5;
          float gridValue = grid(vUv, gridWidth, gridSpacing);
          
          // Distance from center for fade effect
          float dist = length(vUv - 0.5) * 2.0;
          float fade = 1.0 - smoothstep(0.4, 1.0, dist);
          
          // Mix colors based on grid position
          vec3 color = mix(color1, color2, vUv.y);
          
          gl_FragColor = vec4(color * gridValue * brightness * fade, gridValue * fade);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    return { geometry: gridGeometry, material: gridMaterial };
  }, []);

  // Animation for the scene
  useFrame((state) => {
    const { clock } = state;
    
    // Update grid shader time uniform
    if (grid.material instanceof THREE.ShaderMaterial) {
      grid.material.uniforms.time.value = clock.getElapsedTime();
    }
    
    // Rotate the entire scene based on scroll
    if (groupRef.current) {
      const scrollOffset = scroll.offset;
      groupRef.current.rotation.x = -scrollOffset * Math.PI * 0.2 - Math.PI / 2;
      groupRef.current.position.z = scrollOffset * -10;
    }
  });

  return (
    <>
      {/* Stars background */}
      <Stars 
        radius={50} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
      
      {/* Main scene group */}
      <group ref={groupRef}>
        {/* Grid floor */}
        <mesh 
          position={[0, -5, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <primitive object={grid.geometry} />
          <primitive object={grid.material} />
        </mesh>
        
        {/* Distant light beams */}
        {Array.from({ length: 10 }).map((_, i) => {
          const x = (i % 2 === 0 ? 1 : -1) * (Math.random() * 10 + 5);
          const z = -Math.random() * 20 - 10;
          const height = Math.random() * 10 + 10;
          const width = Math.random() * 0.2 + 0.1;
          
          return (
            <mesh key={i} position={[x, -5, z]}>
              <boxGeometry args={[width, height, width]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? '#7800ff' : '#00bfff'} 
                transparent 
                opacity={0.3}
                emissive={i % 2 === 0 ? '#7800ff' : '#00bfff'}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={0.8} 
        />
        <Vignette 
          offset={0.5} 
          darkness={0.7} 
          eskil={false} 
        />
      </EffectComposer>
    </>
  );
};

export default Scene;
