import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const count = 400;
  const points = useRef();

  // Generate random positions
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20;     // X coordinate
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y coordinate
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20; // Z coordinate
    }
    return temp;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotate particle system slowly
    points.current.rotation.y = time * 0.03;
    points.current.rotation.x = time * 0.015;

    // React to pointer coordinates for responsive feel
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.8;
    points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, targetX, 0.05);
    points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, targetY, 0.05);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#66FCF1"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="canvas-background-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
