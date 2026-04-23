/**
 * 简化版 BokehField
 */
import { useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'

export default function BokehField() {
  const stage = useStore((s) => s.stage)
  
  const spheres = useMemo(() => {
    const arr = []
    for (let i = 0; i < 30; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15,
          -5 - Math.random() * 15
        ],
        scale: 0.3 + Math.random() * 0.8,
        color: Math.random() > 0.5 ? '#4a9eff' : '#ff9f4a'
      })
    }
    return arr
  }, [])
  
  if (stage !== 2) return null
  
  return (
    <group>
      {spheres.map((s, i) => (
        <mesh key={i} position={s.position}>
          <sphereGeometry args={[s.scale, 16, 16]} />
          <meshNormalMaterial transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  )
}