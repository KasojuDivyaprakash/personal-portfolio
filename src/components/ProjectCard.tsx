import { motion } from 'framer-motion'

type ProjectCardProps = {
  project: {
    title: string
    description: string
    tech: string[]
  }
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-primary/30"
    >
      <div className="mb-6 h-40 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
      <h3 className="text-2xl font-semibold">{project.title}</h3>
      <p className="mt-3 text-slate-400">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span key={tech} className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-sm text-slate-300">{tech}</span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#" className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">GitHub</a>
        <a href="#" className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white">Live Demo</a>
      </div>
    </motion.div>
  )
}

export default ProjectCard
