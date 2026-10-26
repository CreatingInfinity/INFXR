import { useEffect, useMemo, useRef, useSyncExternalStore } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
import { MathUtils, type Group, type MeshPhysicalMaterial } from 'three'

type SculptureSceneProps = {
  reducedMotion: boolean
  isMobile: boolean
}

type ArtifactProps = {
  reducedMotion: boolean
  isMobile: boolean
}

const pointer = { x: 0, y: 0 }
const scrollOffset = { y: 0 }

function ChromeMaterial({ roughness = 0.5 }: { roughness?: number }) {
  return (
    <meshPhysicalMaterial
      color="#d7dbe3"
      metalness={1}
      roughness={roughness}
      envMapIntensity={1.45}
      clearcoat={0.9}
      clearcoatRoughness={0.14}
      reflectivity={1}
      ior={1.46}
      specularIntensity={1.1}
    />
  )
}

function OrbitalArtifact({ reducedMotion, isMobile }: ArtifactProps) {
  const group = useRef<Group>(null)
  const knotMat = useRef<MeshPhysicalMaterial>(null)
  const quality = isMobile ? 0.65 : 1
  const torusRadial = Math.round(14 * quality) + 4
  const torusTubular = Math.round(72 * quality) + 16
  const knotTubular = Math.round(96 * quality) + 24
  const knotRadial = Math.round(12 * quality) + 6

  useFrame((state, delta) => {
    const node = group.current
    if (!node) return

    if (reducedMotion) {
      node.rotation.set(0.18, 0.45, 0.08)
      node.position.y = 0
      return
    }

    const targetX = pointer.y * 0.22 + 0.12
    const targetY = pointer.x * 0.35
    node.rotation.x = MathUtils.lerp(node.rotation.x, targetX, 0.045)
    node.rotation.y += delta * 0.22 + MathUtils.lerp(0, targetY, 0.012)
    node.rotation.z = MathUtils.lerp(node.rotation.z, scrollOffset.y * 0.00035, 0.04)
    node.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.09

    if (knotMat.current) {
      knotMat.current.roughness = 0.07 + Math.sin(state.clock.elapsedTime * 0.4) * 0.015
    }
  })

  return (
    <group ref={group} scale={isMobile ? 0.7 : 0.98} position={[0, 0.06, 0]}>
      <mesh rotation={[0.15, 0.2, -0.35]} castShadow={false}>
        <torusGeometry args={[1.52, 0.042, torusRadial, torusTubular]} />
        <ChromeMaterial roughness={0.08} />
      </mesh>
      <mesh rotation={[Math.PI / 2.05, 0.55, 0.18]} castShadow={false}>
        <torusGeometry args={[1.28, 0.095, torusRadial, torusTubular]} />
        <ChromeMaterial roughness={0.11} />
      </mesh>
      <mesh rotation={[1.05, -0.4, 1.2]} castShadow={false}>
        <torusGeometry args={[1.08, 0.038, torusRadial, torusTubular]} />
        <ChromeMaterial roughness={0.07} />
      </mesh>
      <mesh rotation={[0.4, 0.15, -0.2]} castShadow={false}>
        <torusKnotGeometry args={[0.72, 0.155, knotTubular, knotRadial, 2, 3]} />
        <meshPhysicalMaterial
          ref={knotMat}
          color="#eceff4"
          metalness={1}
          roughness={0.07}
          envMapIntensity={1.6}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={1}
        />
      </mesh>
      <mesh rotation={[-0.7, 1.1, 0.5]} castShadow={false}>
        <torusGeometry args={[0.62, 0.028, torusRadial, torusTubular]} />
        <ChromeMaterial roughness={0.06} />
      </mesh>
    </group>
  )
}

function StudioEnvironment({ resolution }: { resolution: number }) {
  return (
    <Environment resolution={resolution} frames={1} environmentIntensity={1.05}>
      <Lightformer
        form="rect"
        intensity={7}
        color="#f3f4f7"
        position={[0, 5.2, 0]}
        rotation-x={Math.PI / 2}
        scale={[9, 4.5, 1]}
      />
      <Lightformer
        form="rect"
        intensity={11}
        color="#ffffff"
        position={[5, 1.6, 3]}
        scale={[1.1, 8, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2.2}
        color="#a4a9b8"
        position={[-5.2, 0.4, 1.5]}
        scale={[3.5, 7, 1]}
      />
      <Lightformer form="ring" intensity={3.4} color="#ffffff" position={[0, 0.2, -5]} scale={6} />
      <Lightformer
        form="rect"
        intensity={1.4}
        color="#8b91a5"
        position={[0, -4.4, 0]}
        rotation-x={-Math.PI / 2}
        scale={[10, 10, 1]}
      />
      <Lightformer form="circle" intensity={2.8} color="#e8ebf2" position={[-2, 3.2, 4]} scale={1.6} />
    </Environment>
  )
}

function useDocumentVisible() {
  return useSyncExternalStore(
    (onStoreChange) => {
      document.addEventListener('visibilitychange', onStoreChange)
      return () => document.removeEventListener('visibilitychange', onStoreChange)
    },
    () => !document.hidden,
    () => true,
  )
}

export default function SculptureScene({ reducedMotion, isMobile }: SculptureSceneProps) {
  const visible = useDocumentVisible()
  const frameloop: 'always' | 'demand' | 'never' = !visible
    ? 'never'
    : reducedMotion
      ? 'demand'
      : 'always'

  const dpr = useMemo<[number, number]>(() => (isMobile ? [1, 1] : [1, 1.5]), [isMobile])

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    const onScroll = () => {
      scrollOffset.y = window.scrollY
    }

    onScroll()
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <Canvas
      dpr={dpr}
      frameloop={frameloop}
      camera={{ position: [0, 0.1, 5.7], fov: 32, near: 0.1, far: 30 }}
      gl={{
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
      onCreated={({ gl, invalidate }) => {
        gl.setClearColor(0x000000, 0)
        gl.toneMappingExposure = 1.08
        invalidate()
      }}
    >
      <ambientLight intensity={0.08} />
      <directionalLight position={[3.5, 4.5, 2.5]} intensity={0.55} color="#ffffff" />
      <directionalLight position={[-3, 1.2, 1]} intensity={0.18} color="#8b91a5" />
      <StudioEnvironment resolution={isMobile ? 128 : 256} />
      <OrbitalArtifact reducedMotion={reducedMotion} isMobile={isMobile} />
      {!isMobile && (
        <ContactShadows
          position={[0, -1.72, 0]}
          opacity={0.32}
          scale={8}
          blur={2.6}
          far={2.8}
          color="#000000"
          frames={1}
        />
      )}
    </Canvas>
  )
}
