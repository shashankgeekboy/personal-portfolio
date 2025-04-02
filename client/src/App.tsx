import { Suspense, useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Canvas } from "@react-three/fiber";
import { useAudio } from "./hooks/useAudio";
import { CustomCursor } from "./components/ui/cursor";
import Layout from "./components/Layout";
import { useMousePosition } from "./hooks/useMousePosition";
import { Loader } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/ui/Navbar";
import ParticlesBackground from "./components/ui/ParticlesBackground";
import SocialSidebar from "./components/ui/SocialSidebar";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { initializeAudio } = useAudio();
  const { mousePosition } = useMousePosition();

  useEffect(() => {
    // Initialize audio
    initializeAudio();

    // Set a global flag that ThreeJS is available in this context
    if (typeof window !== 'undefined') {
      window.isThreeJsInitialized = true;
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [initializeAudio]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="fixed inset-0 bg-background overflow-hidden">
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
            >
              <div className="w-32 h-32 relative mb-8">
                <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-accent border-l-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full border-2 border-t-transparent border-r-primary border-b-transparent border-l-accent animate-spin-slow"></div>
              </div>
              <motion.h1 
                className="text-2xl md:text-3xl font-orbitron text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-primary">INITIALIZING</span> PORTAL
              </motion.h1>
              <motion.div 
                className="mt-4 text-muted-foreground text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Preparing cybernetic interface...
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <CustomCursor mousePosition={mousePosition} />
        {!isLoading && (
          <>
            <Navbar />
            <ParticlesBackground />
            <SocialSidebar />
          </>
        )}
        
        <Canvas
          shadows
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 15], fov: 60, near: 0.1, far: 1000 }}
          className="fixed inset-0 z-0"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 0
          }}
        >
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 15, 30]} />
          <Suspense fallback={null}>
            <Layout />
          </Suspense>
        </Canvas>
        
        <Loader
          containerStyles={{
            background: "transparent",
            zIndex: 1000,
          }}
          innerStyles={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderRadius: "10px",
          }}
          barStyles={{
            backgroundColor: "hsl(var(--primary))",
            height: "4px",
          }}
          dataStyles={{
            color: "hsl(var(--primary))",
            fontSize: "14px",
            fontFamily: "Orbitron, sans-serif",
          }}
          dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
