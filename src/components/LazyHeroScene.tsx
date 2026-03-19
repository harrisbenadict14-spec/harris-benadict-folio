import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import HeroScene from './HeroScene';

interface LazyHeroSceneProps {
  className?: string;
  style?: React.CSSProperties;
}

const LazyHeroScene = ({ className, style }: LazyHeroSceneProps) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  return (
    <div ref={ref} className={className} style={style}>
      {isIntersecting ? (
        <div
          className="mx-auto"
          aria-hidden="true"
          style={{
            width: "min(90vw, 560px)",
            height: "min(90vw, 560px)",
            WebkitMaskImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, black 20%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 50% 50% at 50% 50%, black 20%, transparent 70%)",
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 5.5], fov: 42 }}
            style={{ width: "100%", height: "100%", background: "transparent" }}
            dpr={[1, 2]}
            gl={{ 
              antialias: true,
              powerPreference: "high-performance",
              alpha: true,
              stencil: false,
              depth: false
            }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
          >
            <PerformanceMonitor
              onDecline={() => {
                console.log('Performance declined, reducing quality');
              }}
            />
            <AdaptiveDpr pixelated />
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </div>
  );
};

export default LazyHeroScene;
