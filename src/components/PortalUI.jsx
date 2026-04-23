import { useStore } from '../store'

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 100
  },
  header: {
    position: 'absolute',
    top: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
    fontWeight: 300,
    color: 'var(--color-text-primary)',
    margin: 0,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    opacity: 0.8
  },
  subtitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
    fontWeight: 200,
    color: 'var(--color-text-tertiary)',
    margin: '10px 0 0 0',
    letterSpacing: '0.3em'
  },
  leftEntry: {
    position: 'absolute',
    left: '10%',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center',
    pointerEvents: 'auto',
    cursor: 'pointer'
  },
  rightEntry: {
    position: 'absolute',
    right: '10%',
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: 'center',
    pointerEvents: 'auto',
    cursor: 'pointer'
  },
  gameTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 2vw, 1.3rem)',
    fontWeight: 300,
    marginBottom: '10px',
    letterSpacing: '0.2em'
  },
  gameTitleEn: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(0.6rem, 1vw, 0.8rem)',
    fontWeight: 200,
    letterSpacing: '0.15em'
  },
  gameDesc: {
    fontFamily: 'var(--font-body)',
    marginTop: '15px',
    fontSize: '0.7rem',
    color: 'var(--color-text-tertiary)'
  },
  backBtn: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '12px 30px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '30px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--color-text-tertiary)',
    letterSpacing: '0.2em',
    cursor: 'pointer',
    pointerEvents: 'auto',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}

export default function PortalUI() {
  const stage = useStore((s) => s.stage)
  const reset = useStore((s) => s.reset)
  
  if (stage !== 2) return null
  
  const handleBack = () => {
    reset()
  }
  
  const handleHover = (e, isEnter) => {
    if (isEnter) {
      e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)'
      e.target.style.color = 'rgba(255, 255, 255, 0.8)'
    } else {
      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
      e.target.style.color = 'rgba(255, 255, 255, 0.4)'
    }
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>选择你的梦境</h2>
        <p style={styles.subtitle}>CHOOSE YOUR DREAM</p>
      </div>
      
      <div style={styles.leftEntry}>
        <div style={{ ...styles.gameTitle, color: '#4a9eff' }}>《寻剑》</div>
        <div style={{ ...styles.gameTitleEn, color: 'rgba(74, 158, 255, 0.6)' }}>
          SWORD QUEST
        </div>
        <div style={styles.gameDesc}>冷色雾气 · 东方幻想</div>
      </div>
      
      <div style={styles.rightEntry}>
        <div style={{ ...styles.gameTitle, color: '#ffd700' }}>《奇幻巴比伦》</div>
        <div style={{ ...styles.gameTitleEn, color: 'rgba(255, 215, 0, 0.6)' }}>
          FANTASY BABYLON
        </div>
        <div style={styles.gameDesc}>金色几何 · 西方奇幻</div>
      </div>
      
      <div
        onClick={handleBack}
        style={styles.backBtn}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        返回
      </div>
    </div>
  )
}