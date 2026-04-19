import pricingContent from '../../../lib/pricing-content.json'
import Button from '../../ui/primitives/Button'
import ImageLinkButton from '../../ui/primitives/ImageLinkButton'
import VerticalFlex from '../../ui/primitives/VerticalFlex'
import PricingEnvironmentToggle from './PricingEnvironmentToggle'

import type { Environment } from '../../../types/pricing'

export interface PricingSidebarProps {
  imageSrc: string
  environment: Environment
  onEnvironmentChange: (value: Environment) => void
}

const scrollToSection = (id: string) => {
  const SCROLL_OFFSET = 120
  const SCROLL_DURATION = 650

  const easeInOutCubic = (progress: number) =>
    progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2

  const target = document.getElementById(id)
  if (!target) return
  const startTop = window.scrollY
  const targetTop = startTop + target.getBoundingClientRect().top - SCROLL_OFFSET
  const distance = targetTop - startTop
  const startTime = performance.now()

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / SCROLL_DURATION, 1)
    window.scrollTo(0, startTop + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
  window.history.replaceState(null, '', `#${id}`)
}

const PricingSidebar = ({ imageSrc, environment, onEnvironmentChange }: PricingSidebarProps) => {
  const { sidebar } = pricingContent

  return (
    <aside>
      <VerticalFlex gap="4" className="sticky top-28 rounded-shell surface-card p-4">
        <PricingEnvironmentToggle value={environment} onChange={onEnvironmentChange} />

        <VerticalFlex gap="3">
          <ImageLinkButton
            imageSrc={imageSrc}
            imageAlt="Cloud hosting plans icon"
            label={sidebar.cloudLabel}
            onClick={() => scrollToSection('cloud-hosting-pricing')}
          />

          <ImageLinkButton
            imageSrc={imageSrc}
            imageAlt="Dedicated hosting plans icon"
            label={sidebar.dedicatedLabel}
            onClick={() => scrollToSection('dedicated-hosting-pricing')}
          />
        </VerticalFlex>

        <VerticalFlex rounded className="bg-brand-blue-dark px-5 py-6 text-white">
          <p className="mb-4">{sidebar.consultationText}</p>

          <Button href={sidebar.consultationCta.href} variant="primary">
            {sidebar.consultationCta.label}
          </Button>
        </VerticalFlex>
      </VerticalFlex>
    </aside>
  )
}

export default PricingSidebar
