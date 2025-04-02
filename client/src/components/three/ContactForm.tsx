import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ContactForm = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create a stylish 3D background for the contact form
  const [particlesGeometry] = useState(() => {
    // Create a grid of particles
    const particleCount = 100;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 5;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;
      scales[i] = Math.random();
    }
    
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    
    return particlesGeo;
  });
  
  // Create shader material for particles - wrap in useMemo to avoid recreation on every render
  const particlesMaterial = useRef<THREE.ShaderMaterial | null>(null);
  
  // Initialize the material only once using useState
  useState(() => {
    if (!particlesMaterial.current) {
      particlesMaterial.current = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#4bc0c0') }
        },
        vertexShader: `
          attribute float scale;
          uniform float uTime;
          varying float vScale;
          
          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            
            // Add some movement
            modelPosition.y += sin(uTime * 0.2 + modelPosition.x * 2.0) * 0.1;
            modelPosition.x += cos(uTime * 0.2 + modelPosition.y * 2.0) * 0.1;
            
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
            
            gl_Position = projectedPosition;
            
            // Point size based on scale
            gl_PointSize = scale * 5.0;
            // Size attenuation
            gl_PointSize *= (1.0 / - viewPosition.z);
            
            vScale = scale;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          varying float vScale;
          
          void main() {
            // Create a circle
            float strength = distance(gl_PointCoord, vec2(0.5));
            strength = 1.0 - strength;
            strength = pow(strength, 4.0);
            
            // Final color
            vec3 color = mix(vec3(0.0), uColor, vScale);
            gl_FragColor = vec4(color, strength);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
    }
  });
  
  // Animate particles
  useFrame((state) => {
    try {
      // Update shader time for particles
      if (particlesMaterial.current) {
        particlesMaterial.current.uniforms.uTime.value = state.clock.getElapsedTime();
      }
      
      // Rotate the group if it exists
      if (groupRef.current && groupRef.current.rotation) {
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      }
    } catch (error) {
      console.error("Error in ContactForm animation:", error);
    }
  });
  
  // Only render if particleMaterial is available
  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* Particles */}
      {particlesMaterial.current && (
        <points geometry={particlesGeometry}>
          <primitive object={particlesMaterial.current} attach="material" />
        </points>
      )}
      
      {/* Decorative rings */}
      <mesh position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2, 64]} />
        <meshBasicMaterial color="#7800ff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh position={[0, 0, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.3, 64]} />
        <meshBasicMaterial color="#00bfff" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      
      <mesh position={[0, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.6, 64]} />
        <meshBasicMaterial color="#4bc0c0" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default ContactForm;
