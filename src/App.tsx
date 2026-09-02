import { useEffect, useState, type FormEvent } from 'react'
import emailjs from 'emailjs-com'
import { motion, AnimatePresence } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaArrowUp, FaBars, FaTimes } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'
import { FiMonitor, FiCode, FiDatabase, FiTool } from 'react-icons/fi'
import { personalInfo, skills, projects, certifications, achievements, services } from './constants/content'
import './styles/index.css'
import profileImage from './assets/profile.jpg'

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [loading, setLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null
    if (savedTheme) setTheme(savedTheme)
    const timer = setTimeout(() => setLoading(false), 1200)
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0
      setScrollProgress(progress)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitStatus('sending')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus('error')
      return
    }

    emailjs
      .send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }, publicKey)
      .then(() => {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      })
      .catch(() => {
        setSubmitStatus('error')
      })
  }

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact']

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-midnight text-white' : 'bg-slate-50 text-slate-900'}`}>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-midnight"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="h-16 w-16 rounded-full border-4 border-primary/40 border-t-primary"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-x-0 top-0 z-[100] h-1 bg-slate-800/60">
        <div className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="text-lg font-semibold tracking-[0.3em] text-white">DP</a>
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-slate-300 transition hover:text-primary">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-white/10 bg-white/10 p-2 md:hidden">
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-white/10 bg-midnight/95 px-6 py-4 md:hidden">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-slate-300">
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      <main id="home">
        <section className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(6,182,212,0.2),_transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex justify-center lg:justify-end">
              <img
                src={profileImage}
                alt="Kasoju DivyaPrakash"
                className="h-72 w-72 rounded-full border-4 border-primary/40 object-cover shadow-glow"
              />
            </div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
                <HiSparkles /> <span>Available for opportunities</span>
              </div>
              <h1 className="text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
                Hi, I&apos;m <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">{personalInfo.name}</span>
              </h1>
              <p className="mt-6 text-xl font-medium text-slate-300">{personalInfo.role}</p>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">{personalInfo.summary}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-6 py-3 font-semibold text-white shadow-glow transition hover:scale-105">Let&apos;s Connect</a>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-3 transition hover:-translate-y-1 hover:text-primary"><FaLinkedin /></a>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-3 transition hover:-translate-y-1 hover:text-primary"><FaGithub /></a>
                <a href={`mailto:${personalInfo.email}`} className="rounded-full border border-white/10 bg-white/10 p-3 transition hover:-translate-y-1 hover:text-primary"><FaEnvelope /></a>
                <a href={`tel:${personalInfo.phone}`} className="rounded-full border border-white/10 bg-white/10 p-3 transition hover:-translate-y-1 hover:text-primary"><FaPhone /></a>
              </div>
            </motion.div>

          </div>
        </section>

        <section id="about" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-primary">About Me</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Crafting modern experiences with intention</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-glow backdrop-blur-xl">
                <h3 className="text-2xl font-semibold">Career Objective</h3>
                <p className="mt-4 text-slate-400">To build impactful, scalable, and elegant digital products while growing into a seasoned full-stack developer with strong product thinking and AI-driven innovation.</p>
                <div className="mt-8 space-y-4">
                  {['Current B.Tech Student', 'ECE Department', 'Passionate about Software Development', 'Interested in AI', 'Interested in Full Stack Development', 'Problem Solver', 'Quick Learner'].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3 text-slate-300">{item}</div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
                <h3 className="text-2xl font-semibold">My Journey</h3>
                <div className="mt-8 space-y-6">
                  {[
                    { title: 'B.Tech in Electronics and Communication Engineering', subtitle: 'Teegala Krishna Reddy Engineering College', date: '2023 - 2027' },
                    { title: 'Focused on Software Development', subtitle: 'Building frontend, backend, and AI-oriented projects', date: '2024 - Present' },
                    { title: 'Growing into Full-Stack Excellence', subtitle: 'Design, performance, and scalable architecture', date: '2025 - Present' },
                  ].map((item) => (
                    <div key={item.title} className="relative pl-8">
                      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                      <div className="border-l border-white/10 pl-6">
                        <p className="text-sm uppercase tracking-[0.3em] text-primary">{item.date}</p>
                        <h4 className="mt-1 text-lg font-semibold">{item.title}</h4>
                        <p className="mt-2 text-slate-400">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="skills" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-primary">Skills</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Technologies I bring to life</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skills.map((group, index) => (
                <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-3">
                    {index === 0 ? <FiMonitor className="text-primary" /> : index === 1 ? <FiCode className="text-primary" /> : index === 2 ? <FiDatabase className="text-primary" /> : <FiTool className="text-primary" />}
                    <h3 className="text-xl font-semibold">{group.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {group.items.map((item) => (
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
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-primary">Projects</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Selected work with premium polish</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              {projects.map((project, index) => (
                <motion.div key={project.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group rounded-3xl border border-white/10 bg-white/10 p-0 backdrop-blur-xl transition hover:-translate-y-2 hover:border-primary/30 overflow-hidden">
                  <div className="relative h-40 overflow-hidden rounded-t-3xl bg-slate-900">
                    <img src={project.coverImage} alt={`${project.title} cover`} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-3 text-slate-400">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-slate-900/40 px-3 py-1 text-sm text-slate-300">{tech}</span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={project.github} target="_blank" rel="noreferrer" className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">GitHub</a>
                      <a href={project.liveDemo} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white">Live Demo</a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.4em] text-primary">Certifications</p>
                <h2 className="mt-3 text-3xl font-semibold">Industry-ready credentials</h2>
                <div className="mt-8 grid gap-4">
                  {certifications.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/40 p-4">
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.issuer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.4em] text-primary">Achievements</p>
                <h2 className="mt-3 text-3xl font-semibold">Momentum in numbers</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {achievements.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-center">
                      <p className="text-4xl font-semibold text-primary">{item.value}</p>
                      <p className="mt-2 text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-primary">Services</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Building with clarity and impact</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-slate-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.4em] text-primary">Contact</p>
                <h2 className="mt-3 text-3xl font-semibold">Let&apos;s build something extraordinary</h2>
                <div className="mt-8 space-y-4 text-slate-300">
                  <p><span className="text-white">Email:</span> {personalInfo.email}</p>
                  <p><span className="text-white">Phone:</span> {personalInfo.phone}</p>
                  <p><span className="text-white">Location:</span> {personalInfo.location}</p>
                  <div className="flex gap-3 pt-4">
                    <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-slate-900/40 p-3"><FaLinkedin /></a>
                    <a href={personalInfo.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-slate-900/40 p-3"><FaGithub /></a>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 outline-none" placeholder="Name" />
                    <input required type="email" value={formData.email} onChange={(event) => setFormData({ ...formData, email: event.target.value })} className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 outline-none" placeholder="Email" />
                  </div>
                  <input required value={formData.subject} onChange={(event) => setFormData({ ...formData, subject: event.target.value })} className="w-full rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 outline-none" placeholder="Subject" />
                  <textarea required value={formData.message} onChange={(event) => setFormData({ ...formData, message: event.target.value })} className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 outline-none" placeholder="Message" />
                  <button type="submit" className="rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-6 py-3 font-semibold text-white">
                    {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  {submitStatus === 'success' && <p className="text-sm text-emerald-400">Message sent successfully.</p>}
                  {submitStatus === 'error' && <p className="text-sm text-rose-400">EmailJS is not configured yet. Please contact me directly at {personalInfo.email}.</p>}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-400">© 2026 KASOJU DIVYAPRAKASH. Crafted with modern design.</p>
          <div className="flex items-center gap-3">
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-2"><FaLinkedin /></a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/10 p-2"><FaGithub /></a>
            <a href="#home" className="rounded-full border border-white/10 bg-white/10 p-2"><FaArrowUp /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
