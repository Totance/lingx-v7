/**
 * 简化版 PortalSpheres
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store'

export default function PortalSpheres() {
  const leftRef = useRef()
  const rightRef = useRef()
  const stage = useStore((s) => s.stage)
  const setStage = useStore((s) => s.setStage)
  
  useFrame((state) => {
    if (leftRef.current) {
      leftRef.current.rotation.y += 0.003
    }
    if (rightRef.current) {
      rightRef.current.rotation.y -= 0.003
    }
  })
  
  if (stage !== 2) return null
  
  return (
    <group>
      {/* 左侧入口 - 寻剑 - 冷色 */}
      <mesh 
        ref={leftRef} 
        position={[-3, 0, 0]}
        onClick={() => console.log('xunjian')}
      >
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshNormalMaterial color="#4a9eff" />
      </mesh>
      
      {/* 右侧入口 - 奇幻巴比伦 - 金色 */}
      <mesh 
        ref={rightRef} 
        position={[3, 0, 0]}
        onClick={() => console.log('babylon')}
      >
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshNormalMaterial color="#ffaa00" />
      </mesh>
    </group>
  )
}