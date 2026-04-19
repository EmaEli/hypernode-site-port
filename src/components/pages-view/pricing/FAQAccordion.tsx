import { useState } from 'react'
import { Icon } from '@iconify/react'

import ErrorBoundary from '../../ui/primitives/ErrorBoundary'
import type { PricingFaqItem } from '../../../types/pricing'

export interface FAQAccordionProps {
  items: PricingFaqItem[]
}

const FAQAccordion = ({ items }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="mx-auto max-w-[770px] px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-brand-sky">Frequently asked questions</p>
        <h2 className="mt-4">Answers before you choose a plan</h2>
      </div>

      <div className="mt-10 border-t border-slate-200">
        {items.map((item, index) => {
          const isOpen = index === openIndex

          return (
            <article key={item.question}
className="border-b border-slate-200">
              <h3 className="m-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-0 py-5 text-left text-xl font-bold text-brand-blue-dark focus:outline-2 focus:outline-offset-[-2px] focus:outline-brand-orange"
                  onClick={() => setOpenIndex(currentIndex => (currentIndex === index ? -1 : index))}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span
                    className={`inline-flex shrink-0 items-center justify-center text-brand-orange transition-transform duration-300 ease-out ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <Icon icon="heroicons:chevron-down-20-solid"
className="h-5 w-5" />
                  </span>
                </button>
              </h3>

              <div
                className={`overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-out ${
                  isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pb-6 pr-14 text-base leading-7 text-brand-blue">{item.answer}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

const FAQAccordionWithBoundary = (props: FAQAccordionProps) => (
  <ErrorBoundary>
    <FAQAccordion {...props} />
  </ErrorBoundary>
)

export default FAQAccordionWithBoundary
