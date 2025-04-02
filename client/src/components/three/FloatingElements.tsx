import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

// Define interfaces for better type safety
interface ElementBase {
  type: 'cube' | 'sphere' | 'text' | 'particle';
  position: THREE.Vector3;
  velocity: {
    x: number;
    y: number;
    z: number;
    rotX?: number;
    rotY?: number;
    rotZ?: number;
  };
  color: string;
  rotation?: THREE.Euler;
  scale?: number;
}

interface CubeElement extends ElementBase {
  type: 'cube';
  rotation: THREE.Euler;
  scale: number;
}

interface SphereElement extends ElementBase {
  type: 'sphere';
  scale: number;
}

interface TextElement extends ElementBase {
  type: 'text';
  text: string;
  rotation: THREE.Euler;
  fontSize?: number;
}

interface ParticleElement extends ElementBase {
  type: 'particle';
  scale: number;
}

type FloatingElement = CubeElement | SphereElement | TextElement | ParticleElement;

const FloatingElements = () => {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  
  // Create floating elements with cyberpunk aesthetic
  const elements = useMemo<FloatingElement[]>(() => {
    const items: FloatingElement[] = [];
    const count = 20;
    
    // Create holographic cubes
    for (let i = 0; i < count / 5; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      );
      
      const rotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      const scale = Math.random() * 0.3 + 0.1;
      
      // Add random velocity for animation
      const velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
        rotX: (Math.random() - 0.5) * 0.01,
        rotY: (Math.random() - 0.5) * 0.01,
        rotZ: (Math.random() - 0.5) * 0.01
      };
      
      items.push({
        type: 'cube',
        position,
        rotation,
        scale,
        velocity,
        color: i % 2 === 0 ? '#7800ff' : '#00bfff'
      });
    }
    
    // Create holographic spheres
    for (let i = 0; i < count / 5; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      );
      
      const scale = Math.random() * 0.25 + 0.1;
      
      // Add random velocity for animation
      const velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      };
      
      items.push({
        type: 'sphere',
        position,
        scale,
        velocity,
        color: i % 2 === 0 ? '#4bc0c0' : '#7800ff'
      });
    }
    
    // Create binary code elements
    for (let i = 0; i < count / 5; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      );
      
      const rotation = new THREE.Euler(
        0,
        0,
        Math.random() * Math.PI
      );
      
      // Add random velocity for animation
      const velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
        rotZ: (Math.random() - 0.5) * 0.01
      };
      
      items.push({
        type: 'text',
        text: Math.random() > 0.5 ? '0' : '1',
        position,
        rotation,
        velocity,
        color: '#00bfff'
      });
    }
    
    // Create AI-related text elements
    const aiTerms = ['AI', 'ML', 'NEURAL', 'DATA', 'GPU', 'DEEP', 'NLP'];
    for (let i = 0; i < count / 5; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      );
      
      const rotation = new THREE.Euler(
        0,
        0,
        Math.random() * Math.PI / 6 - Math.PI / 12
      );
      
      // Add random velocity for animation
      const velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01,
        rotZ: (Math.random() - 0.5) * 0.005
      };
      
      items.push({
        type: 'text',
        text: aiTerms[Math.floor(Math.random() * aiTerms.length)],
        position,
        rotation,
        velocity,
        color: i % 2 === 0 ? '#4bc0c0' : '#7800ff',
        fontSize: 0.3
      });
    }
    
    // Create circular particles
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10 - 5
      );
      
      const scale = Math.random() * 0.05 + 0.01;
      
      // Add random velocity for animation
      const velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      };
      
      items.push({
        type: 'particle',
        position,
        scale,
        velocity,
        color: ['#7800ff', '#4bc0c0', '#00bfff'][Math.floor(Math.random() * 3)]
      });
    }
    
    return items;
  }, []);

  // Animate the floating elements
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Update each element's position and rotation
    elements.forEach((element, i) => {
      const object = groupRef.current?.children[i];
      if (!object) return;
      
      // Apply velocities
      object.position.x += element.velocity.x;
      object.position.y += element.velocity.y;
      object.position.z += element.velocity.z;
      
      // Apply rotation if applicable and rotation properties exist
      if ('rotX' in element.velocity && object.rotation) {
        // Check each property individually to avoid undefined errors
        if (object.rotation.x !== undefined && element.velocity.rotX !== undefined) {
          object.rotation.x += element.velocity.rotX;
        }
        if (object.rotation.y !== undefined && element.velocity.rotY !== undefined) {
          object.rotation.y += element.velocity.rotY;
        }
        if (object.rotation.z !== undefined && element.velocity.rotZ !== undefined) {
          object.rotation.z += element.velocity.rotZ;
        }
      } else if ('rotZ' in element.velocity && object.rotation && object.rotation.z !== undefined) {
        // This is specifically for text elements which only have rotZ
        if (element.velocity.rotZ !== undefined) {
          object.rotation.z += element.velocity.rotZ;
        }
      }
      
      // Bounce when reaching bounds
      if (Math.abs(object.position.x) > 10) element.velocity.x *= -1;
      if (Math.abs(object.position.y) > 5) element.velocity.y *= -1;
      if (Math.abs(object.position.z) > 5) element.velocity.z *= -1;
      
      // Add subtle wave motion
      if (element.type === 'particle') {
        object.position.y += Math.sin(time * 0.5 + i) * 0.005;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {elements.map((element, i) => {
        if (element.type === 'cube') {
          return (
            <mesh 
              key={i}
              position={[element.position.x, element.position.y, element.position.z]}
              rotation={element.rotation ? [element.rotation.x || 0, element.rotation.y || 0, element.rotation.z || 0] : [0, 0, 0]}
              scale={element.scale}
            >
              <boxGeometry />
              <meshStandardMaterial 
                color={element.color} 
                transparent 
                opacity={0.3} 
                wireframe={true}
                emissive={element.color}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        } else if (element.type === 'sphere') {
          return (
            <mesh 
              key={i}
              position={[element.position.x, element.position.y, element.position.z]}
              scale={element.scale}
            >
              <sphereGeometry args={[1, 8, 8]} />
              <meshStandardMaterial 
                color={element.color} 
                transparent 
                opacity={0.3} 
                wireframe={true}
                emissive={element.color}
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        } else if (element.type === 'text') {
          return (
            <Text
              key={i}
              position={[element.position.x, element.position.y, element.position.z]}
              rotation={element.rotation ? [element.rotation.x || 0, element.rotation.y || 0, element.rotation.z || 0] : [0, 0, 0]}
              fontSize={element.fontSize || 0.2}
              color={element.color}
              anchorX="center"
              anchorY="middle"
              font="/fonts/inter.json"
            >
              {element.text}
              <meshStandardMaterial 
                color={element.color} 
                emissive={element.color}
                emissiveIntensity={0.8}
              />
            </Text>
          );
        } else if (element.type === 'particle') {
          return (
            <mesh 
              key={i}
              position={[element.position.x, element.position.y, element.position.z]}
              scale={element.scale}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial 
                color={element.color} 
                emissive={element.color}
                emissiveIntensity={0.8}
              />
            </mesh>
          );
        }
        return null;
      })}
    </group>
  );
};

export default FloatingElements;
