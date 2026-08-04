import { motion } from 'framer-motion'
import { FiMonitor, FiCode, FiDatabase, FiTool } from 'react-icons/fi'

type SkillCardProps = {
  title: string
  items: Array<{ name: string; level: number }>
  index: number
}

const iconMap = [FiMonitor, FiCode, FiDatabase, FiTool]

const SkillCard = ({ title, items, index }: SkillCardProps) => {
  const Icon = iconMap[index] ?? FiTool

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center gap-3">
        <Icon className="text-primary" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.name}>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>{item.name}</span>
              <span>{item.level}%</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-gradient-to-r from-primary via-secondary to-accent" style={{ width: `${item.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default SkillCard
