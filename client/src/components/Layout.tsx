import { Suspense, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { useAudio } from "../hooks/useAudio";

import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';
import Scene from './three/Scene';
import AstronautModel from './three/AstronautModel';
import FloatingElements from './three/FloatingElements';

function AnimatedLayout() {
  const { playHover } = useAudio();
  const scrollData = useScroll();
  const { viewport } = useThree();
  
  const astronautRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useFrame(() => {
    if (!astronautRef.current) return;
    
    const scrollOffset = scrollData.offset;
    
    // Calculate astronaut position based on scroll
    let targetPosition = new THREE.Vector3();
    let targetRotationY = 0;
    
    if (scrollOffset < 0.2) {
      // Hero section
      targetPosition.set(3, 0, 0);
      targetRotationY = 0;
    } else if (scrollOffset < 0.4) {
      // About section
      targetPosition.set(-3, 2, 1);
      targetRotationY = -0.2;
    } else if (scrollOffset < 0.6) {
      // Projects section 
      targetPosition.set(3, -1, 2);
      targetRotationY = 0.3;
    } else if (scrollOffset < 0.8) {
      // Testimonials section
      targetPosition.set(-2, -2, 1);
      targetRotationY = -0.1;
    } else {
      // Contact section
      targetPosition.set(0, 0, 3);
      targetRotationY = 0;
    }
    
    // Smooth transition with null checks
    if (astronautRef.current) {
      // Position transition
      if (astronautRef.current.position) {
        astronautRef.current.position.lerp(targetPosition, 0.05);
      }
      
      // Rotation transition
      if (astronautRef.current.rotation) {
        astronautRef.current.rotation.y = THREE.MathUtils.lerp(
          astronautRef.current.rotation.y || 0,
          targetRotationY,
          0.05
        );
      }
      
      // Scale transition
      if (astronautRef.current.scale) {
        const targetScale = isHovered ? 1.05 : 1;
        astronautRef.current.scale.lerp(
          new THREE.Vector3(targetScale, targetScale, targetScale), 
          0.1
        );
      }
    }
  });

  return (
    <>
      <directionalLight 
        position={[1, 2, 3]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
      />
      <ambientLight intensity={0.3} />
      
      <Suspense fallback={null}>
        <Scene />
        <FloatingElements />
      </Suspense>
      
      <group 
        ref={astronautRef}
        position={[3, 0, 0]}
        onPointerOver={() => {
          playHover();
          setIsHovered(true);
        }}
        onPointerOut={() => setIsHovered(false)}
      >
        <AstronautModel />
      </group>
      
      <Scroll html>
        <div className="w-screen">
          <section className="h-screen relative flex items-center justify-center">
            <Hero />
          </section>
          
          <section className="h-screen relative flex items-center justify-center">
            <About />
          </section>
          
          <section className="h-screen relative flex items-center justify-center">
            <Projects />
          </section>
          
          <section className="h-screen relative flex items-center justify-center">
            <Testimonials />
          </section>
          
          <section className="h-screen relative flex items-center justify-center">
            <Contact />
          </section>
          
          <section className="relative mt-8">
            <Footer />
          </section>
        </div>
      </Scroll>
    </>
  );
}

export default function Layout() {
  return (
    <ScrollControls pages={5.5} damping={0.3} distance={1}>
      <AnimatedLayout />
    </ScrollControls>
  );
}
