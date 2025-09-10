import { motion } from 'framer-motion'
import { Code2, Globe2, WalletMinimal, Award, Users, Target } from 'lucide-react'
import { SkillsSection } from '../components/SkillsSection'

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

export function About() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-20">
      <section className="section-padding">
        <SectionTitle 
          label="About" 
          title="Computer Science graduate with <span class='epic-text'>Epic</span> Salesforce mastery" 
          subtitle="I bridge the gap between enterprise solutions and modern development, creating scalable platforms with 30+ Salesforce certifications and hands-on MERN stack expertise."
        />
        
        <div className="container-g grid md:grid-cols-3 gap-8 mb-16">
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

        {/* Personal Story Section */}
        <div className="container-g mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
          >
            <h3 className="text-2xl font-bold mb-6 epic-text">My Journey</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Graduated with a Bachelor's in Computer Science from Riphah International University, where I discovered my passion for enterprise solutions and modern web development.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Through hands-on internships and personal projects, I've specialized in Salesforce Development, Zoho integrations, and MERN stack applications, building solutions that matter.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="text-blue-400" size={20} />
                  <span className="text-gray-300">Best Chess Player at Riphah University</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-green-400" size={20} />
                  <span className="text-gray-300">Managed Riphah Computing Cup & Recruitment</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="text-purple-400" size={20} />
                  <span className="text-gray-300">Volunteer in Community Food Distribution</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education & Certifications */}
        <div className="container-g mb-16">
          <SectionTitle 
            label="Education & Certifications" 
            title="Continuous Learning & <span class='epic-text'>Excellence</span>" 
          />
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <h4 className="text-xl font-semibold mb-4 epic-text">Education</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-white">Bachelor's in Computer Science</h5>
                  <p className="text-gray-400">Riphah International University</p>
                  <p className="text-sm text-gray-500">Focus: Software Development, Database Systems, Web Technologies</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <h4 className="text-xl font-semibold mb-4 epic-text">Key Certifications</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>30+ Salesforce Trailhead Certificates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>C++ Certification (Cisco)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Java Certification (Great Learning)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Cybersecurity (HP LIFE)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Front-End Development Certified</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SkillsSection />
    </div>
  )
}
