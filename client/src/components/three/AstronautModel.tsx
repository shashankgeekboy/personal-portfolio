import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

function AstronautModel() {
  const group = useRef<THREE.Group>(null);
  const { scene, viewport } = useThree();
  const { mousePosition } = useMousePosition();
  
  // We'll create a simpler astronaut mesh since we don't have a real model file
  const astronaut = useMemo(() => {
    // Create an astronaut-like shape combining different geometries
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 32),
      new THREE.MeshStandardMaterial({ 
        color: 0xCCCCCC, 
        roughness: 0.4,
        metalness: 0.6,
        emissive: 0x5555ff,
        emissiveIntensity: 0.2
      })
    );
    head.position.y = 0.65;
    
    // Visor
    const visor = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 32, 32, 0, Math.PI, 0, Math.PI/1.2),
      new THREE.MeshStandardMaterial({ 
        color: 0x4444ff, 
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.8
      })
    );
    visor.rotation.x = -0.3;
    visor.rotation.y = Math.PI;
    visor.position.y = 0.65;
    visor.position.z = 0.12;
    
    // Body
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.25, 0.6, 16),
      new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, 
        roughness: 0.4,
        metalness: 0.3
      })
    );
    body.position.y = 0.3;
    
    // Backpack
    const backpack = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.45, 0.2),
      new THREE.MeshStandardMaterial({ 
        color: 0xcccccc, 
        roughness: 0.6,
        metalness: 0.2
      })
    );
    backpack.position.y = 0.32;
    backpack.position.z = -0.2;
    
    // Arms
    const leftArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.5, 8),
      new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, 
        roughness: 0.4,
        metalness: 0.3
      })
    );
    leftArm.position.x = -0.38;
    leftArm.position.y = 0.3;
    leftArm.rotation.z = -0.3;
    
    const rightArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.5, 8),
      new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, 
        roughness: 0.4,
        metalness: 0.3
      })
    );
    rightArm.position.x = 0.38;
    rightArm.position.y = 0.3;
    rightArm.rotation.z = 0.3;
    
    // Legs
    const leftLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.6, 8),
      new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, 
        roughness: 0.4,
        metalness: 0.3
      })
    );
    leftLeg.position.x = -0.15;
    leftLeg.position.y = -0.3;
    
    const rightLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.6, 8),
      new THREE.MeshStandardMaterial({ 
        color: 0xFFFFFF, 
        roughness: 0.4,
        metalness: 0.3
      })
    );
    rightLeg.position.x = 0.15;
    rightLeg.position.y = -0.3;
    
    // Create highlights & accents
    const accent1 = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 0.3),
      new THREE.MeshStandardMaterial({ 
        color: 0x00ffff, 
        roughness: 0.1,
        metalness: 0.8,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8
      })
    );
    accent1.position.y = 0.3;
    accent1.position.x = 0.2;
    
    const accent2 = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.05, 0.3),
      new THREE.MeshStandardMaterial({ 
        color: 0x00ffff, 
        roughness: 0.1,
        metalness: 0.8,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8
      })
    );
    accent2.position.y = 0.3;
    accent2.position.x = -0.2;
    
    // Lights that move with the astronaut
    const astronautLight = new THREE.PointLight(0x4444ff, 2, 2);
    astronautLight.position.set(0, 0.5, 0.5);
    
    // Combine all parts
    const astronautGroup = new THREE.Group();
    astronautGroup.add(
      head, visor, body, backpack, 
      leftArm, rightArm, leftLeg, rightLeg,
      accent1, accent2, astronautLight
    );
    
    // Add slight shadow
    astronautGroup.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    
    return astronautGroup;
  }, []);
  
  // Animation loop for floating effect
  useFrame((state, delta) => {
    if (!group.current) return;
    
    // Floating motion
    const time = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(time * 0.5) * 0.2;
    
    // Slow spinning
    group.current.rotation.y += delta * 0.1;
    
    // Subtle tilt
    group.current.rotation.z = Math.sin(time * 0.3) * 0.1;
    
    // Look toward mouse position
    if (mousePosition.x && mousePosition.y) {
      const mouseX = (mousePosition.x / window.innerWidth) * 2 - 1;
      const mouseY = -(mousePosition.y / window.innerHeight) * 2 + 1;
      
      const targetRotationX = mouseY * 0.3;
      const targetRotationY = mouseX * 0.3;
      
      astronaut.rotation.x = THREE.MathUtils.lerp(
        astronaut.rotation.x,
        targetRotationX,
        0.05
      );
      
      // Override Y rotation from spinning to look at mouse when close
      if (Math.abs(mouseX) > 0.3) {
        astronaut.rotation.y = THREE.MathUtils.lerp(
          astronaut.rotation.y,
          targetRotationY,
          0.05
        );
      }
    }
  });
  
  return (
    <group ref={group} scale={[0.8, 0.8, 0.8]}>
      <primitive object={astronaut} />
    </group>
  );
}

export default AstronautModel;
