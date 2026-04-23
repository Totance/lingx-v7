import CrystalLogo from './CrystalLogo'
import TransitionEffect from './TransitionEffect'
import PortalSpheres from './PortalSpheres'
import BokehField from './BokehField'

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#4a9eff" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#ff9f4a" />
      
      <CrystalLogo />
      <TransitionEffect />
      <BokehField />
      <PortalSpheres />
    </>
  )
}