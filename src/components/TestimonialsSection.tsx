import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface TestimonialProps {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

function TestimonialCard({ name, role, company, content, rating, avatar }: TestimonialProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card relative"
    >
      <Quote className="absolute top-4 right-4 text-blue-300/30" size={32} />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-violet-500 rounded-full grid place-items-center text-white font-semibold">
          {avatar ? <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" /> : name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-gray-400">{role} at {company}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-500'} />
        ))}
      </div>
      
      <p className="text-gray-300 leading-relaxed">{content}</p>
    </motion.div>
  )
}

const testimonials = [
  {
    name: 'Riphah University',
    role: 'Academic Achievement',
    company: 'Computing Department',
    content: 'Muhammad Mustafa demonstrated exceptional leadership managing the Riphah Computing Cup and recruitment drives. His technical expertise in Salesforce and MERN stack projects was outstanding.',
    rating: 5
  },
  {
    name: 'Chess Excellence',
    role: 'Best Chess Player',
    company: 'Riphah University',
    content: 'Awarded Best Chess Player at Riphah University, demonstrating strategic thinking and problem-solving skills that translate perfectly to software development challenges.',
    rating: 5
  },
  {
    name: 'Project Excellence',
    role: 'Technical Innovation',
    company: 'Portfolio Projects',
    content: 'Successfully delivered 10+ complex projects including Sportshub community platform, Salesforce LWC portals, and Zoho CRM integrations. Each project showcased technical mastery and innovation.',
    rating: 5
  }
]

const clients = [
  'Salesforce', 'Zoho CRM', 'Riphah University', 'MongoDB', 'Express.js', 'React Projects'
]

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-gradient-to-b from-transparent to-black/20">
      <div className="container-g">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-300 tracking-widest uppercase text-sm font-medium">Testimonials</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold gradient-text">What Clients Say</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real feedback from real projects. Results that speak louder than words.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Trusted by</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 glass-premium rounded-lg text-gray-400 font-medium"
              >
                {client}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
