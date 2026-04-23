import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store'

export default function TransitionEffect() {
  const isTransitioning = useStore((s) => s.isTransitioning)
  const transitionProgress = useStore((s) => s.transitionProgress)
  const lightLinesRef = useRef()
  
  const particles = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 2 + Math.random() * 3
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      colors[i * 3] = 0.5 + Math.random() * 0.5
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
      colors[i * 3 + 2] = 1.0
    }
    
    return { positions, colors, count }
  }, [])
  
  useFrame((state) => {
    if (!lightLinesRef.current) return
    
    const positions = lightLinesRef.current.geometry.attributes.position.array
    const t = state.clock.elapsedTime
    
    for (let i = 0; i < particles.count; i++) {
      const originalR = Math.sqrt(
        particles.positions[i * 3] ** 2 +
        particles.positions[i * 3 + 1] ** 2 +
        particles.positions[i * 3 + 2] ** 2
      )
      
      const progress = isTransitioning ? transitionProgress : 0
      const speed = 0.5 + (i % 10) * 0.1
      const offset = (t * speed) % 1
      const currentR = originalR * (1 - progress * (1 - offset))
      
      const theta = Math.atan2(
        particles.positions[i * 3 + 1],
        particles.positions[i * 3]
      )
      const phi = Math.acos(
        particles.positions[i * 3 + 2] / (originalR || 1)
      )
      
      positions[i * 3] = currentR * Math.sin(phi) * Math.cos(theta + t * 0.2)
      positions[i * 3 + 1] = currentR * Math.sin(phi) * Math.sin(theta + t * 0.2)
      positions[i * 3 + 2] = currentR * Math.cos(phi)
    }
    
    lightLinesRef.current.geometry.attributes.position.needsUpdate = true
    
    if (lightLinesRef.current.material) {
      lightLinesRef.current.material.opacity = isTransitioning ? transitionProgress * 0.8 : 0
    }
  })
  
  return (
    <points ref={lightLinesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}