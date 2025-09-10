import { motion } from 'framer-motion'
import { ExternalLink, Github, Eye } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  image?: string
  tags: string[]
  liveUrl?: string
  codeUrl?: string
  featured?: boolean
}

export function ProjectCard({ title, description, image, tags, liveUrl, codeUrl, featured }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`glass-card group relative overflow-hidden h-full flex flex-col ${featured ? 'md:col-span-2' : ''}`}
    >
      <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-violet-500/20 relative flex-shrink-0">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center">
            <Eye className="opacity-40" size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <ExternalLink size={18} />
              Live
            </a>
          )}
          {codeUrl && (
            <a href={codeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              <Github size={18} />
              Code
            </a>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-gray-400 text-sm leading-relaxed flex-grow">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
