import { HiOutlineArrowRight } from 'react-icons/hi'
import { ChromeSculpture } from './ChromeSculpture'

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-screen overflow-hidden bg-obsidian pt-24 md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(139,145,165,0.12),transparent_42%),linear-gradient(180deg,rgba(8,9,13,0)_0%,rgba(8,9,13,0.35)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-[8%] hidden w-px bg-line/70 lg:block" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-[1440px] items-center gap-8 px-5 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6 lg:px-12 xl:px-16">
        <div className="relative z-10 max-w-2xl">
          <p className="hero-in font-mono text-[11px] tracking-[0.34em] text-slategray uppercase">
            Digital studio / 001
          </p>

          <h1
            id="hero-heading"
            className="hero-in hero-delay-1 mt-6 font-display text-[clamp(3.1rem,8.4vw,7.4rem)] leading-[0.86] font-medium tracking-[-0.045em] text-sofwhite"
          >
            WE BUILD
            <br />
            WHAT&apos;S NEXT.
          </h1>

          <p className="hero-in hero-delay-2 mt-7 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
            Websites, applications, and digital products that help businesses grow, scale, and stay
            ahead.
          </p>

          <div className="hero-in hero-delay-3 mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-electric px-6 py-3 font-display text-sm font-medium tracking-wide text-obsidian transition-colors duration-300 hover:bg-[#e7ff8f]"
            >
              Start a project
              <HiOutlineArrowRight aria-hidden="true" className="size-3.5" />
            </a>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center gap-2 border-b border-sofwhite/70 pb-1 font-display text-sm tracking-wide text-sofwhite transition-colors duration-300 hover:border-electric hover:text-electric"
            >
              View our work
              <HiOutlineArrowRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>

          <p className="hero-in hero-delay-4 mt-14 font-mono text-[10px] tracking-[0.28em] text-slategray uppercase">
            Design / Development / AI
          </p>
        </div>

        <div className="relative mx-auto h-[min(52vh,380px)] w-full max-w-[560px] lg:mx-0 lg:h-[min(78vh,720px)] lg:max-w-none lg:translate-x-4 xl:translate-x-8">
          <div className="pointer-events-none absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(245,245,247,0.08),transparent_64%)]" />
          <ChromeSculpture />
          <p className="pointer-events-none absolute right-2 bottom-2 hidden font-mono text-[10px] tracking-[0.28em] text-slategray uppercase sm:block">
            OBJ / ORBITAL-03
          </p>
        </div>
      </div>
    </section>
  )
}
