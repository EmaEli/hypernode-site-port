export interface SectionAnchorIntroProps {
  id: string
  title: string
  description: string
  highlight?: string
}

const SectionAnchorIntro = ({ id, title, description, highlight }: SectionAnchorIntroProps) => (
  <header id={id} className="scroll-mt-32">
    <h2>{title}</h2>

    <p className="mt-5 max-w-4xl text-base leading-8 text-brand-blue">{description}</p>

    {highlight && (
      <p className="mt-4 max-w-4xl text-base font-bold leading-8 text-brand-blue-dark">
        {highlight}
      </p>
    )}
  </header>
)

export default SectionAnchorIntro
