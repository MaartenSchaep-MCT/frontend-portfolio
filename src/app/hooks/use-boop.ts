// hooks/use-boop.js
'use client'

import { CSSProperties, useCallback, useEffect, useState } from 'react'

import usePrefersReducedMotion from './use-prefersReducedMotion'

function useBoop({
  animation = '',
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 300,
  timingFunction = 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  strokeDashoffset = 0,
  transitionDelay = 0,
}): [CSSProperties, () => void] {
  const [isBooped, setIsBooped] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()
  const style = {
    display: 'flex',
    backfaceVisibility: 'hidden',
    transition: `all ${timing}ms ${timingFunction}`,
    transitionDelay: `${transitionDelay}ms`,
    animation: isBooped ? animation : undefined,
    transform: isBooped
      ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
      : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,
    strokeDashoffset: isBooped ? strokeDashoffset : 0,
  }

  useEffect(() => {
    if (!isBooped) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIsBooped(false)
    }, timing)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isBooped, timing])

  const trigger = useCallback(() => {
    setIsBooped(true)
  }, [])
  // console.log(prefersReducedMotion)
  const applicableStyle = prefersReducedMotion ? {} : style
  return [applicableStyle, trigger]
}
export default useBoop
