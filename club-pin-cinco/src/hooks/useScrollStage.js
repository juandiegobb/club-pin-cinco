import { useState, useEffect } from 'react'

export function useScrollStage() {
  const [scroll, setScroll] = useState({
    progress: 0,  // 0 to 1 overall progress
    stage: 0,     // 0, 1, or 2 based on scroll thresholds
    stageProgress: 0  // 0 to 1 progress within the current stage
  })

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0

      let stage, stageProgress
      if (progress < 0.33) {
        stage = 0
        stageProgress = progress / 0.33
      } else if (progress < 0.66) {
        stage = 1
        stageProgress = (progress - 0.33) / 0.33
      } else {
        stage = 2
        stageProgress = Math.min((progress - 0.66) / 0.34, 1)
      }

      setScroll({ progress, stage, stageProgress })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scroll
}
