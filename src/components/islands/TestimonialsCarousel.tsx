import { useState } from 'react'

export interface TestimonialItem {
  quote: string
  author: string
  role: string
}

export interface TestimonialsCarouselProps {
  testimonials: TestimonialItem[]
}

const BUTTON_CLASS =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white hover:text-brand-blue focus:outline-2 focus:outline-offset-2 focus:outline-white disabled:cursor-not-allowed disabled:opacity-40'

const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (testimonials.length === 0) {
    return null
  }

  const previousSlide = () => {
    setActiveIndex(currentIndex =>
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1,
    )
  }

  const nextSlide = () => {
    setActiveIndex(currentIndex =>
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1,
    )
  }

  const activeTestimonial = testimonials[activeIndex]

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur md:p-12">
        <p className="text-2xl font-bold leading-tight text-white md:text-4xl">
          “{activeTestimonial.quote}”
        </p>
        <div className="mt-8 flex flex-col gap-2 border-t border-white/15 pt-6 text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold text-white">{activeTestimonial.author}</p>
            <p className="text-sm uppercase tracking-[0.2em] text-white/70">{activeTestimonial.role}</p>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className={BUTTON_CLASS} onClick={previousSlide} aria-label="Previous testimonial">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className={BUTTON_CLASS} onClick={nextSlide} aria-label="Next testimonial">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3" aria-label="Testimonial navigation">
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={testimonial.author}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-3 rounded-full transition-all focus:outline-2 focus:outline-offset-4 focus:outline-white ${
                isActive ? 'w-10 bg-white' : 'w-3 bg-white/35 hover:bg-white/60'
              }`}
              aria-label={`Show testimonial ${index + 1}`}
              aria-pressed={isActive}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TestimonialsCarousel