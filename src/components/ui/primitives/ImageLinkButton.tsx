const CLASS =
  'group flex items-center gap-4 rounded-card surface-card p-4 text-left no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange hover:shadow-raised focus:outline-2 focus:outline-offset-2 focus:outline-brand-orange'

interface ImageLinkButtonProps {
  imageSrc: string
  imageAlt: string
  label: string
  onClick: () => void
}

const ImageLinkButton = ({ imageSrc, imageAlt, label, onClick }: ImageLinkButtonProps) => {
  return (
    <button className={CLASS} onClick={onClick}>
      <img src={imageSrc} alt={imageAlt} className="h-[60px] w-[59px] shrink-0" width={59} height={60} />
      <span className="font-bold leading-6 text-brand-blue-dark">{label}</span>
    </button>
  )
}

export default ImageLinkButton
