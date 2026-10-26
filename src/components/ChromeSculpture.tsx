import { lazy, Suspense, useSyncExternalStore } from 'react'
import { SceneErrorBoundary, SceneFallback, SceneLoader } from './SceneFallback'

const SculptureScene = lazy(() => import('./SculptureScene'))

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function subscribeMediaQuery(query: string) {
  return (onStoreChange: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', onStoreChange)
    return () => media.removeEventListener('change', onStoreChange)
  }
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    subscribeMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export function ChromeSculpture() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const supported = useSyncExternalStore(
    () => () => {},
    hasWebGL,
    () => true,
  )

  if (!supported) {
    return <SceneFallback />
  }

  return (
    <SceneErrorBoundary>
      <Suspense fallback={<SceneLoader />}>
        <div className="h-full w-full" role="img" aria-label="Polished chrome orbital sculpture">
          <SculptureScene reducedMotion={reducedMotion} isMobile={isMobile} />
        </div>
      </Suspense>
    </SceneErrorBoundary>
  )
}
