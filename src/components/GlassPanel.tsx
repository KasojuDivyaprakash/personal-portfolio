type GlassPanelProps = {
  children: React.ReactNode
  className?: string
}

const GlassPanel = ({ children, className = '' }: GlassPanelProps) => {
  return <div className={`rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.08)] ${className}`}>{children}</div>
}

export default GlassPanel
