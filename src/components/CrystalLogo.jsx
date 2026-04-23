/**
 * CrystalLogo - 使用 LINGX SVG LOGO
 */

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store'

export default function CrystalLogo() {
  const meshRef = useRef()
  const stage = useStore((s) => s.stage)
  const setStage = useStore((s) => s.setStage)
  const setIsTransitioning = useStore((s) => s.setIsTransitioning)
  
  // 加载 SVG 作为纹理
  const texture = useTexture('/lingx-logo.svg')
  
  // 创建发光材质
  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [texture])
  
  useFrame((state) => {
    if (meshRef.current && stage === 0) {
      // 缓慢漂移
      meshRef.current.rotation.y += 0.003
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })
  
  const handleClick = () => {
    if (stage === 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setStage(1)
        setTimeout(() => {
          setStage(2)
          setIsTransitioning(false)
        }, 1200)
      }, 100)
    }
  }
  
  if (stage === 2) return null
  
  return (
    <group>
      <mesh 
        ref={meshRef} 
        onClick={handleClick}
        scale={stage === 1 ? 0.3 : 1}
      >
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
          map={texture} 
          transparent 
          side={THREE.DoubleSide}
          color="#ffffff"
        />
      </mesh>
      
      {/* 外发光效果 */}
      <mesh scale={stage === 1 ? 0.35 : 1.1}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
          color="#4a9eff" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}