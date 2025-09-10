import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Tip } from './Tip'
import FloatingParticles from './FloatingParticles'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingParticles />
      
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="container-g">
          <div className="glass-premium rounded-2xl px-6 py-4 flex items-center justify-between epic-float">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/" className="text-xl font-bold">
                Mustafa
              </Link>
            </motion.div>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link 
                to="/" 
                className={`transition-colors ${
                  isActive('/') 
                    ? 'text-white epic-text' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`transition-colors ${
                  isActive('/about') 
                    ? 'text-white epic-text' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                About
              </Link>
              <Link 
                to="/projects" 
                className={`transition-colors ${
                  isActive('/projects') 
                    ? 'text-white epic-text' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Projects
              </Link>
              <Link 
                to="/contact" 
                className={`transition-colors ${
                  isActive('/contact') 
                    ? 'text-white epic-text' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Contact
              </Link>
            </nav>
            
            <div className="flex items-center gap-3">
              <ConnectButton accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }} />
              <Tip />
            </div>
          </div>
        </div>
      </motion.header>

      <main>{children}</main>

      <footer className="py-10 border-t border-white/10 relative">
        <div className="container-g text-sm text-gray-400 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Mustafa. All rights reserved. <span className="epic-text">Epic</span> by design.
          </p>
          <p className="opacity-80">
            Built with Salesforce expertise, MERN stack craft, and <span className="epic-text">epic</span> development passion.
          </p>
        </div>
      </footer>
    </div>
  )
}
