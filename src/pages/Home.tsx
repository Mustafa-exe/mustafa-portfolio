import { motion } from 'framer-motion'
import { ArrowRight, Code2, Globe2, Mail, WalletMinimal, ExternalLink, Github } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { BackgroundOrbs } from '../components/BackgroundOrbs'
import FloatingParticles from '../components/FloatingParticles'
import { ProjectCard } from '../components/ProjectCard'
import { SkillsSection } from '../components/SkillsSection'
import { TestimonialsSection } from '../components/TestimonialsSection'

function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      <div className="inline-flex items-center gap-2 glass-premium px-3 py-1 rounded-full text-sm mb-4">
        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
        {label}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p className="text-gray-400 max-w-2xl mx-auto text-lg">{subtitle}</p>}
    </motion.div>
  )
}

// Featured projects for home page (first 6)
const featuredProjects = [
  {
    title: 'Sportshub — Sports Community Platform',
    description: 'A comprehensive sports community website for discovering, joining, and organizing sports events. Features authentication, event creation, live updates, dashboards, and secure APIs.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'MERN'],
    featured: true,
    gradient: 'from-blue-500 to-violet-500'
  },
  {
    title: 'Salesforce LWC Student Portal',
    description: 'Built a student resource access portal with authentication using Salesforce Lightning Web Components and Apex. Custom Experience Cloud implementation with announcements and course resources.',
    tags: ['Salesforce', 'LWC', 'Apex', 'Experience Cloud'],
    featured: true,
    gradient: 'from-green-500 to-blue-500'
  },
  {
    title: 'Game Launcher — Java OOP Hub',
    description: 'Interactive gaming hub featuring multiple games (Flappy Bird, Tic Tac Toe, etc.) with secure authentication system. Built using Java OOP principles with MySQL database.',
    tags: ['Java', 'MySQL', 'OOP', 'Game Development'],
    featured: true,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'E-commerce Computer Shop',
    description: 'Marketplace for laptops and accessories built with C++ and Qt framework. Features login/signup/reset password functionality with enhanced UI and SQLite database integration.',
    tags: ['C++', 'Qt', 'SQLite', 'DSA'],
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Zoho CRM Lead Merger Widget',
    description: 'Automated lead merging functionality widget for Zoho CRM using APIs, webhooks, and custom integrations. Streamlined CRM workflow automation.',
    tags: ['Zoho CRM', 'APIs', 'Webhooks', 'Automation'],
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Student Management System',
    description: 'Academic resources platform featuring timetables, announcements, and events management. Built with modern web technologies and Firebase backend.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    gradient: 'from-emerald-500 to-teal-500'
  }
]

function ProjectShowcase({ onUnlock }: { onUnlock: (unlocked: boolean) => void }) {
  const [currentProject, setCurrentProject] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [viewedProjects, setViewedProjects] = useState(new Set([0]))
  const [showConfetti, setShowConfetti] = useState(false)
  const [portfolioUnlocked, setPortfolioUnlocked] = useState(false)
  const [gameLevel, setGameLevel] = useState(0)
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [gameActive, setGameActive] = useState(false)

  // Game colors for the sequence game
  const gameColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500']
  const [flashingColor, setFlashingColor] = useState<number | null>(null)

  // Auto-advance projects every 4 seconds, but allow manual control
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        handleNextProject()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [currentProject, isTransitioning])

  // Start game when 1 project is viewed (immediate access!)
  useEffect(() => {
    if (viewedProjects.size >= 1 && !portfolioUnlocked) {
      setTimeout(() => setGameActive(true), 2000)
    }
  }, [viewedProjects.size, portfolioUnlocked])

  // Generate game sequence
  const generateSequence = useCallback(() => {
    // Much easier: Start with 2 colors, max 3 colors
    const sequenceLength = gameLevel === 0 ? 2 : gameLevel === 1 ? 2 : 3
    const newSequence = Array.from({ length: sequenceLength }, () => Math.floor(Math.random() * 4))
    setSequence(newSequence)
    setPlayerSequence([])
    
    // Play the sequence with slower timing
    newSequence.forEach((color, index) => {
      setTimeout(() => {
        setFlashingColor(color)
        setTimeout(() => setFlashingColor(null), 600) // Longer flash
      }, index * 800) // Slower sequence
    })
  }, [gameLevel])

  // Start new game level - only need 2 levels now!
  useEffect(() => {
    if (gameActive && gameLevel < 2) {
      setTimeout(() => generateSequence(), 1500) // More time between levels
    }
  }, [gameActive, gameLevel, generateSequence])

  // Handle player input
  const handleColorClick = (colorIndex: number) => {
    if (!gameActive || flashingColor !== null) return
    
    const newPlayerSequence = [...playerSequence, colorIndex]
    setPlayerSequence(newPlayerSequence)
    
    // Check if player made a mistake
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      // Wrong! Give them another chance - just reset this attempt
      setPlayerSequence([])
      // Don't restart the whole sequence, just let them try again
      return
    }
    
    // Check if player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      setGameLevel(prev => prev + 1)
      setPlayerSequence([])
      
      // Check if game is complete - now only need 2 levels!
      if (gameLevel >= 1) {
        setPortfolioUnlocked(true)
        setGameActive(false)
        setShowConfetti(true)
        onUnlock(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }
  }

  const handleNextProject = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setShowConfetti(true)
    
    const nextProject = (currentProject + 1) % featuredProjects.length
    
    setTimeout(() => {
      setCurrentProject(nextProject)
      setViewedProjects(prev => new Set([...prev, nextProject]))
      setIsTransitioning(false)
    }, 300)
    
    setTimeout(() => setShowConfetti(false), 1500)
  }

  const handlePrevProject = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    const prevProject = currentProject === 0 ? featuredProjects.length - 1 : currentProject - 1
    
    setTimeout(() => {
      setCurrentProject(prevProject)
      setViewedProjects(prev => new Set([...prev, prevProject]))
      setIsTransitioning(false)
    }, 300)
  }

  const goToProject = (index: number) => {
    if (isTransitioning || index === currentProject) return
    
    setIsTransitioning(true)
    setShowConfetti(true)
    
    setTimeout(() => {
      setCurrentProject(index)
      setViewedProjects(prev => new Set([...prev, index]))
      setIsTransitioning(false)
    }, 300)
    
    setTimeout(() => setShowConfetti(false), 1500)
  }

  const project = featuredProjects[currentProject]
  const allProjectsViewed = viewedProjects.size === featuredProjects.length

  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        {/* Project showcase card */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main project card */}
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`glass-card p-8 md:p-12 text-center relative overflow-hidden rounded-3xl bg-gradient-to-br ${project.gradient}/20 border border-white/10`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Dynamic background pattern */}
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: `conic-gradient(from ${currentProject * 60}deg, transparent, ${project.gradient?.split(' ')[1] || '#3b82f6'}, transparent)`
              }}
              transition={{ duration: 2 }}
            />

            {/* Confetti explosion */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {Array.from({ length: 40 }, (_, i) => (
                  <motion.div
                    key={`confetti-${currentProject}-${i}`}
                    initial={{ 
                      x: '50%', 
                      y: '50%', 
                      opacity: 1, 
                      scale: 1,
                      rotate: 0
                    }}
                    animate={{
                      x: `${20 + Math.random() * 60}%`,
                      y: `${10 + Math.random() * 80}%`,
                      opacity: 0,
                      scale: Math.random() * 0.5,
                      rotate: Math.random() * 720
                    }}
                    transition={{ 
                      duration: 1.5 + Math.random(), 
                      delay: i * 0.02,
                      ease: "easeOut"
                    }}
                    className="absolute w-4 h-4 rounded-full"
                    style={{ 
                      backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'][i % 7]
                    }}
                  />
                ))}
              </div>
            )}

            {/* Project content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.h2 
                className="text-3xl md:text-6xl font-bold text-white mb-6"
                animate={{ 
                  textShadow: showConfetti ? '0 0 20px rgba(59, 130, 246, 0.8)' : '0 0 0px transparent'
                }}
              >
                {project.title}
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {project.description}
              </motion.p>
              
              {/* Interactive tech tags */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={`${currentProject}-${tag}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium border border-white/20 cursor-pointer hover:bg-white/30"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 justify-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-medium border border-white/20 hover:bg-white/30 transition-all"
                >
                  View Live Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl text-white font-medium border border-white/20 hover:bg-white/30 transition-all"
                >
                  GitHub Code
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous button */}
            <motion.button
              onClick={handlePrevProject}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 glass-card rounded-full text-white hover:bg-white/20 transition-all"
              disabled={isTransitioning}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Project indicators */}
            <div className="flex gap-3">
              {featuredProjects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToProject(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentProject 
                      ? 'bg-white shadow-lg' 
                      : viewedProjects.has(index)
                        ? 'bg-green-400'
                        : 'bg-white/30'
                  }`}
                  disabled={isTransitioning}
                />
              ))}
            </div>

            {/* Next button */}
            <motion.button
              onClick={handleNextProject}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 glass-card rounded-full text-white hover:bg-white/20 transition-all"
              disabled={isTransitioning}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Progress and achievement */}
          <div className="mt-6 text-center">
            <div className="text-white font-bold text-xl mb-2">
              Project {currentProject + 1} of {featuredProjects.length}
            </div>
            
            {allProjectsViewed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-400 font-bold text-lg"
              >
                🎉 Portfolio Explorer Achievement Unlocked! 🎉
              </motion.div>
            ) : (
              <div className="text-gray-400">
                {viewedProjects.size} of {featuredProjects.length} projects explored
              </div>
            )}
          </div>

          {/* Memory Game to Unlock Portfolio */}
          {viewedProjects.size >= 1 && !portfolioUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8 text-center"
            >
              <div className="glass-card p-6 rounded-2xl max-w-md mx-auto">
                <h3 className="text-white font-bold text-xl mb-4">
                  🎮 Memory Challenge
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  Complete the sequence game to unlock the full portfolio!
                </p>
                
                {gameActive ? (
                  <div>
                    <div className="text-white mb-4">
                      Level {gameLevel + 1} of 2
                    </div>
                    
                    {/* Game Board */}
                    <div className="grid grid-cols-2 gap-3 max-w-48 mx-auto mb-4">
                      {gameColors.map((color, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleColorClick(index)}
                          className={`w-20 h-20 rounded-xl ${color} ${
                            flashingColor === index ? 'brightness-150 scale-110' : 'brightness-75'
                          } transition-all duration-200`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={flashingColor !== null}
                        />
                      ))}
                    </div>
                    
                    <div className="text-gray-400 text-sm">
                      {flashingColor !== null ? 'Watch the sequence...' : 'Repeat the sequence!'}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-300">
                    Preparing challenge...
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Portfolio Unlocked Message */}
          {portfolioUnlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <div className="glass-card p-6 rounded-2xl max-w-md mx-auto bg-gradient-to-r from-green-500/20 to-blue-500/20">
                <h3 className="text-white font-bold text-xl mb-2">
                  🎉 Portfolio Unlocked! 🎉
                </h3>
                <p className="text-gray-300 text-sm">
                  You can now scroll down to explore the full portfolio!
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export function Home() {
  const [portfolioUnlocked, setPortfolioUnlocked] = useState(false)

  // Lock scrolling until portfolio is unlocked
  useEffect(() => {
    if (!portfolioUnlocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [portfolioUnlocked])

  return (
    <div className="relative">
      <FloatingParticles />
      
      {/* Interactive Project Showcase Hero */}
      <section className="relative min-h-screen pt-24">
        <BackgroundOrbs />
        <div className="container-g py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Building <span className="epic-text">Epic</span> Digital Solutions
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Muhammad Mustafa — Computer Science graduate specializing in Salesforce Development, 
              Zoho integrations, and MERN stack projects. Scroll through my featured projects below!
            </p>
          </motion.div>
        </div>
        
        {/* Scroll-Controlled Project Showcase */}
        <ProjectShowcase onUnlock={setPortfolioUnlocked} />
      </section>

      {/* Rest of portfolio content - only shown when unlocked */}
      {portfolioUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

      {/* About Section - Condensed */}
      <section className="section-padding">
        <SectionTitle 
          label="About" 
          title="Computer Science graduate with <span class='epic-text'>Epic</span> Salesforce mastery" 
          subtitle="I bridge the gap between enterprise solutions and modern development, creating scalable platforms with 30+ Salesforce certifications and hands-on MERN stack expertise."
        />
        <div className="container-g grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card text-center floating-card"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-violet-500 rounded-2xl grid place-items-center mx-auto mb-4 pulse-epic">
              <Globe2 className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              <span className="epic-text">Epic</span> Salesforce Development
            </h3>
            <p className="text-gray-400 leading-relaxed">
              30+ Trailhead certifications, Lightning Web Components, Apex development, and Experience Cloud customization. Enterprise-grade <span className="epic-text">epic</span> solutions.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card text-center floating-card"
            style={{ animationDelay: '1s' }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl grid place-items-center mx-auto mb-4 pulse-epic">
              <Code2 className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              MERN Stack <span className="epic-text">Mastery</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              MongoDB, Express.js, React, Node.js expertise. Building <span className="epic-text">epic</span> full-stack applications with modern architecture and scalable solutions.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-card text-center floating-card"
            style={{ animationDelay: '2s' }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl grid place-items-center mx-auto mb-4 pulse-epic">
              <WalletMinimal className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              CRM <span className="epic-text">Integration</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Zoho CRM automation, API integrations, webhooks, and workflow optimization. Streamlining business processes with <span className="epic-text">epic</span> efficiency.
            </p>
          </motion.div>
        </div>
        
        {/* Learn More Button */}
        <div className="text-center mt-12">
          <Link to="/about" className="btn-secondary">
            Learn More About Me <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-gradient-to-b from-transparent to-black/20 relative">
        <SectionTitle 
          label="Featured Work" 
          title="<span class='epic-text'>Epic</span> Projects That Perform" 
          subtitle="A selection of my best work showcasing Salesforce expertise, MERN stack development, and innovative solutions."
        />
        <div className="container-g">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {featuredProjects.map((project, index) => (
              <div key={index} className="floating-card h-full" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
          
          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">
              View All Projects <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section - Condensed */}
      <SkillsSection />

      {/* Testimonials Section - Condensed */}
      <TestimonialsSection />

      {/* Contact Section - Brief */}
      <section className="py-16 md:py-24 relative">
        <SectionTitle 
          label="Contact" 
          title="Have a brief? Let's build something <span class='epic-text'>EPIC</span>." 
        />
        <div className="container-g grid md:grid-cols-2 gap-8">
          <div className="glass-card floating-card">
            <h3 className="font-semibold mb-2">
              <span className="epic-text">Epic</span> Email
            </h3>
            <a 
              className="block text-gray-300 hover:text-white transition-colors duration-300 epic-text" 
              href="mailto:2mustafa.exe@gmail.com"
            >
              2mustafa.exe@gmail.com
            </a>
          </div>
          <div className="glass-card floating-card" style={{ animationDelay: '1s' }}>
            <h3 className="font-semibold mb-2">Availability</h3>
            <p className="text-gray-300">
              Ready for <span className="epic-text">epic</span> freelance projects and full‑time Salesforce/MERN opportunities.
            </p>
          </div>
        </div>
        
        {/* Get In Touch Button */}
        <div className="text-center mt-12">
          <Link to="/contact" className="btn-primary">
            Get In Touch <Mail size={18} />
          </Link>
        </div>
      </section>
        </motion.div>
      )}
    </div>
  )
}
