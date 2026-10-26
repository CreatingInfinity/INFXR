import { Component, type ReactNode } from 'react'

type FallbackProps = {
  message?: string
}

export function SceneFallback({ message = 'WebGL unavailable' }: FallbackProps) {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,145,165,0.16),transparent_62%)]" />
      <svg
        viewBox="0 0 400 400"
        className="h-[min(70vw,420px)] w-[min(70vw,420px)] text-sofwhite/80"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="chrome-fall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5f5f7" />
            <stop offset="42%" stopColor="#8b91a5" />
            <stop offset="100%" stopColor="#262a33" />
          </linearGradient>
        </defs>
        <ellipse
          cx="200"
          cy="200"
          rx="128"
          ry="48"
          fill="none"
          stroke="url(#chrome-fall)"
          strokeWidth="7"
          transform="rotate(-18 200 200)"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="118"
          ry="44"
          fill="none"
          stroke="url(#chrome-fall)"
          strokeWidth="11"
          transform="rotate(62 200 200)"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="86"
          ry="86"
          fill="none"
          stroke="url(#chrome-fall)"
          strokeWidth="5"
        />
        <path
          d="M200 112c48 18 78 52 78 88s-30 70-78 88c-48-18-78-52-78-88s30-70 78-88z"
          fill="none"
          stroke="url(#chrome-fall)"
          strokeWidth="8"
        />
      </svg>
      <p className="absolute bottom-6 font-mono text-[10px] tracking-[0.28em] text-slategray uppercase">
        {message}
      </p>
    </div>
  )
}

export function SceneLoader() {
  return (
    <div className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 rounded-full border border-line border-t-sofwhite/80 animate-spin" />
      <p className="font-mono text-[10px] tracking-[0.32em] text-slategray uppercase">
        Initializing scene
      </p>
    </div>
  )
}

type BoundaryProps = {
  children: ReactNode
}

type BoundaryState = {
  hasError: boolean
}

export class SceneErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false }

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <SceneFallback message="Scene failed to load" />
    }

    return this.props.children
  }
}
