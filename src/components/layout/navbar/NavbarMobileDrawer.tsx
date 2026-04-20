import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { NAVBAR_LINKS } from './navbarLinks'
import Button from '../../ui/primitives/Button'
import ErrorBoundary from '../../ui/primitives/ErrorBoundary'

const focusRing = 'focus-ring'
const iconButtonClass = `rounded p-2 text-gray-700 hover:text-brand-orange ${focusRing}`
const navLinkClass = `block rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors ${focusRing}`

const NavbarMobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  useEffect(() => {
    if (!isOpen) return

    // Trap focus inside drawer when open
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        openButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const drawer = drawerRef.current
      if (!drawer) return

      const focusable = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    closeButtonRef.current?.focus()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      {/* Hamburger button — visible below md */}
      <button
        ref={openButtonRef}
        type="button"
        onClick={open}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        className={`md:hidden ${iconButtonClass}`}
      >
        <Icon
          icon="heroicons:bars-3"
          width={24}
          height={24}
          aria-hidden="true"
        />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
          className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-white shadow-raised transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header — logo + close */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <a
            href="/en/"
            onClick={close}
            className={`font-bold text-brand-blue text-xl ${focusRing}`}
          >
            Hypernode
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className={iconButtonClass}
          >
            <Icon
              icon="heroicons:x-mark"
              width={24}
              height={24}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-5 py-6"
        >
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            {NAVBAR_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className={navLinkClass}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA pinned at bottom */}
        <div className="border-t border-gray-200 px-5 py-5">
          <Button
            href="https://www.hypernode.com/en/free-hosting-consult/"
            onClick={close}
            className="w-full"
          >
            Free hosting consult
          </Button>
        </div>
      </div>
    </>
  )
}

const NavbarMobileDrawerWithBoundary = () => (
  <ErrorBoundary>
    <NavbarMobileDrawer />
  </ErrorBoundary>
)

export default NavbarMobileDrawerWithBoundary
