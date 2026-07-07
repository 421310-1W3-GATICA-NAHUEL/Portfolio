import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Rotate slowly
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.rotation.z = Math.sin(t / 1.5) / 2;
    // Slight floating effect
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <group>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#06b6d4" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
      
      <Icosahedron ref={meshRef} args={[1, 15]} scale={2}>
        <MeshDistortMaterial
          color="#0B0C10"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          wireframe={true}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </Icosahedron>
    </group>
  );
}
