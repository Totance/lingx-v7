import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/Scene'
import HeroUI from './components/HeroUI'
import PortalUI from './components/PortalUI'
import PostProcessing from './components/PostProcessing'

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 5, 20]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      <HeroUI />
      <PortalUI />
    </>
  )
}