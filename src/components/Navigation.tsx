import { useEffect, useId, useState } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const

export function Navigation() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="absolute top-0 right-0 left-0 z-50 border-b border-line/80 bg-obsidian/40 backdrop-blur-[2px]">
      <nav
        className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16"
        aria-label="Primary"
      >
        <a
          href="#home"
          className="font-display text-[1.65rem] leading-none font-medium tracking-[0.08em] text-sofwhite"
        >
          INFXR
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-[13px] tracking-[0.04em] text-sofwhite/90 transition-colors duration-300 hover:text-electric"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden items-center gap-2 border border-line px-4 py-2 font-display text-[13px] tracking-wide text-sofwhite transition-colors duration-300 hover:border-electric hover:text-electric sm:inline-flex"
          >
            Let&apos;s build
            <HiOutlineArrowRight aria-hidden="true" className="size-3.5" />
          </a>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center border border-line text-sofwhite md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span className={`block h-px w-4 bg-current transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block h-px w-4 bg-current transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id={menuId} className="border-t border-line bg-obsidian px-5 py-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 font-display text-lg text-sofwhite"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-6 inline-flex min-h-12 items-center gap-2 bg-electric px-5 py-3 font-display text-sm text-obsidian"
            onClick={() => setOpen(false)}
          >
            Let&apos;s build
            <HiOutlineArrowRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      )}
    </header>
  )
}
