import { motion } from 'framer-motion'

interface SkillBarProps {
  skill: string
  level: number
  color?: string
}

function SkillBar({ skill, level, color = 'blue' }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-medium">{skill}</span>
        <span className="text-gray-400 text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${
            color === 'blue' ? 'from-blue-500 to-violet-500' :
            color === 'green' ? 'from-green-400 to-emerald-500' :
            color === 'orange' ? 'from-orange-400 to-red-500' :
            'from-purple-400 to-pink-500'
          } rounded-full`}
        />
      </div>
    </div>
  )
}

const skills = [
  { skill: 'Salesforce Development', level: 95, color: 'blue' },
  { skill: 'MERN Stack', level: 90, color: 'blue' },
  { skill: 'Java & C++', level: 85, color: 'green' },
  { skill: 'Zoho CRM Integration', level: 88, color: 'purple' },
  { skill: 'API Development', level: 82, color: 'green' },
  { skill: 'Database Management', level: 86, color: 'orange' }
]

const certifications = [
  '30+ Salesforce Trailhead Certificates',
  'C++ Certification (Cisco)',
  'Java Certification (Great Learning)',
  'Cybersecurity (HP LIFE)',
  'Front-End Development Certified'
]

export function SkillsSection() {
  return (
    <section className="section-padding">
      <div className="container-g">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-300 tracking-widest uppercase text-sm font-medium">Expertise</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold gradient-text">Skills & Technologies</h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            From Webflow wizardry to Web3 integration, here's what I bring to every project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((item, index) => (
                <SkillBar key={index} {...item} />
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card">
              <h3 className="text-2xl font-semibold text-white mb-4">Certifications</h3>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                    <span className="text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <h3 className="text-2xl font-semibold text-white mb-4">Services</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Webflow Sites',
                  'React Apps', 
                  'Web3 dApps',
                  'UI/UX Design',
                  'API Integration',
                  'Performance Optimization'
                ].map((service, index) => (
                  <div key={index} className="text-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-gray-300 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
