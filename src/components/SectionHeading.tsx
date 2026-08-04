import { motion } from 'framer-motion'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  center?: boolean
}

const SectionHeading = ({ eyebrow, title, description, center = true }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={center ? 'mb-12 text-center' : 'mb-12'}
    >
      <p className="text-sm uppercase tracking-[0.4em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description && <p className="mx-auto mt-4 max-w-2xl text-slate-400">{description}</p>}
    </motion.div>
  )
}

export default SectionHeading
