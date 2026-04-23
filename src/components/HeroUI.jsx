import { useStore } from '../store'

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '80px',
    pointerEvents: 'auto',
    cursor: 'pointer',
    zIndex: 100
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    fontWeight: 300,
    color: 'var(--color-text-primary)',
    margin: 0,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    textShadow: '0 0 40px rgba(74, 158, 255, 0.5)',
    animation: 'fadeIn 2s ease-out'
  },
  subtitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
    fontWeight: 200,
    color: 'var(--color-text-secondary)',
    margin: '20px 0 0 0',
    letterSpacing: '0.5em',
    textTransform: 'uppercase'
  },
  slogan: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
    fontWeight: 300,
    color: 'var(--color-text-tertiary)',
    margin: '40px 0 0 0',
    letterSpacing: '0.2em'
  },
  sloganEn: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
    fontWeight: 200,
    color: 'var(--color-text-tertiary)',
    margin: '10px 0 0 0',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    opacity: 0.75
  },
  hint: {
    marginTop: '60px',
    padding: '12px 30px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '30px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--color-text-tertiary)',
    letterSpacing: '0.2em',
    animation: 'pulse 2s ease-in-out infinite'
  }
}

export default function HeroUI() {
  const stage = useStore((s) => s.stage)
  const startTransition = useStore((s) => s.startTransition)
  const setStage = useStore((s) => s.setStage)
  const isTransitioning = useStore((s) => s.isTransitioning)
  
  if (stage !== 0) return null
  
  const handleClick = () => {
    if (!isTransitioning) {
      startTransition()
      setTimeout(() => {
        setStage(2)
      }, 1200)
    }
  }
  
  return (
    <div onClick={handleClick} style={styles.container}>
      <h1 style={styles.title}>零想科技</h1>
      <p style={styles.subtitle}>LINGX</p>
      <p style={styles.slogan}>点亮每个人心中的梦境</p>
      <p style={styles.sloganEn}>LIGHT UP YOUR DREAMWORLD</p>
      <div style={styles.hint}>点击进入</div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  )
}