import { create } from 'zustand'

export const useStore = create((set) => ({
  stage: 0,
  transitionProgress: 0,
  isTransitioning: false,
  
  setStage: (stage) => set({ stage }),
  
  startTransition: () => set({ isTransitioning: true, transitionProgress: 0 }),
  
  updateTransition: (progress) => set({ transitionProgress: progress }),
  
  completeTransition: () => set({ 
    stage: 2, 
    isTransitioning: false, 
    transitionProgress: 1 
  }),
  
  reset: () => set({ 
    stage: 0, 
    transitionProgress: 0, 
    isTransitioning: false 
  })
}))