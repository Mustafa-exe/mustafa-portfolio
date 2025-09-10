import { motion } from 'framer-motion'
import { ProjectCard } from '../components/ProjectCard'
import { Filter, Search } from 'lucide-react'
import { useState } from 'react'

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

const projects = [
  {
    title: 'Sportshub — Sports Community Platform',
    description: 'A comprehensive sports community website for discovering, joining, and organizing sports events. Features authentication, event creation, live updates, dashboards, and secure APIs built with modern MERN stack architecture.',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'MERN'],
    featured: true,
    category: 'Full-Stack'
  },
  {
    title: 'Salesforce LWC Student Portal',
    description: 'Built a student resource access portal with authentication using Salesforce Lightning Web Components and Apex. Custom Experience Cloud implementation with announcements and course resources for enhanced student experience.',
    tags: ['Salesforce', 'LWC', 'Apex', 'Experience Cloud'],
    featured: true,
    category: 'Enterprise'
  },
  {
    title: 'Game Launcher — Java OOP Hub',
    description: 'Interactive gaming hub featuring multiple games (Flappy Bird, Tic Tac Toe, etc.) with secure authentication system. Built using Java OOP principles with MySQL database for user management and game statistics.',
    tags: ['Java', 'MySQL', 'OOP', 'Game Development'],
    featured: true,
    category: 'Desktop'
  },
  {
    title: 'E-commerce Computer Shop',
    description: 'Marketplace for laptops and accessories built with C++ and Qt framework. Features comprehensive login/signup/reset password functionality with enhanced UI and SQLite database integration for inventory management.',
    tags: ['C++', 'Qt', 'SQLite', 'DSA'],
    category: 'Desktop'
  },
  {
    title: 'Zoho CRM Lead Merger Widget',
    description: 'Automated lead merging functionality widget for Zoho CRM using APIs, webhooks, and custom integrations. Streamlined CRM workflow automation that reduces manual work and improves data consistency.',
    tags: ['Zoho CRM', 'APIs', 'Webhooks', 'Automation'],
    category: 'Integration'
  },
  {
    title: 'Student Management System',
    description: 'Academic resources platform featuring comprehensive timetables, announcements, and events management. Built with modern web technologies and Firebase backend for real-time updates and seamless user experience.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    category: 'Web'
  },
  {
    title: 'Music Player — Web App',
    description: 'Interactive audio player with modern UI features and smooth playback controls. Built with vanilla JavaScript for optimal performance, featuring playlist management, equalizer, and responsive design.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Audio API'],
    category: 'Web'
  },
  {
    title: 'Anime Hub — Interactive Website',
    description: 'Anime-themed interactive website with engaging user interface and smooth animations. Features content discovery, user engagement elements, and responsive design for anime enthusiasts.',
    tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
    category: 'Web'
  },
  {
    title: 'Salesforce Experience Cloud Portal',
    description: 'Customized community portals with announcements and course resources using Salesforce Experience Cloud. Enhanced user experience with custom branding, navigation, and content management features.',
    tags: ['Salesforce', 'Experience Cloud', 'Community', 'Custom Site'],
    category: 'Enterprise'
  },
  {
    title: 'Console E-Commerce — Assembly Language',
    description: 'Text-based e-commerce platform with authentication system built entirely in Assembly language. Demonstrates advanced low-level programming expertise with memory management and system calls.',
    tags: ['Assembly Language', 'Console App', 'Authentication', 'Low-Level'],
    category: 'System'
  }
]

const categories = ['All', 'Full-Stack', 'Enterprise', 'Desktop', 'Web', 'Integration', 'System']

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      <section className="section-padding">
        <SectionTitle 
          label="Portfolio" 
          title="<span class='epic-text'>Epic</span> Projects That Perform" 
          subtitle="From enterprise Salesforce solutions to MERN stack applications. Each project showcases technical excellence and innovative problem-solving."
        />

        {/* Filters */}
        <div className="container-g mb-12">
          <div className="glass-card">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="text-gray-400" size={20} />
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container-g">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="floating-card h-full" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 text-lg">No projects found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchTerm('')
                }}
                className="btn-primary mt-4"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>

        {/* Project Stats */}
        <div className="container-g mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold epic-text mb-2">10+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold epic-text mb-2">6</div>
                <div className="text-gray-400">Technology Stacks</div>
              </div>
              <div>
                <div className="text-3xl font-bold epic-text mb-2">30+</div>
                <div className="text-gray-400">Salesforce Certs</div>
              </div>
              <div>
                <div className="text-3xl font-bold epic-text mb-2">100%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
