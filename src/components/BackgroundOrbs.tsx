import { motion } from 'framer-motion'

export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {/* Large floating orb */}
      <motion.div 
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-15%] left-[5%] w-[50vw] h-[50vw] rounded-full blur-3xl opacity-15 bg-gradient-to-tr from-blue-500 via-violet-500 to-blue-500"
      />
      
      {/* Medium orb */}
      <motion.div 
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[-20%] right-[0%] w-[40vw] h-[40vw] rounded-full blur-3xl opacity-12 bg-gradient-to-bl from-violet-500 via-purple-500 to-pink-500"
      />
      
      {/* Small accent orb */}
      <motion.div 
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute top-[40%] right-[20%] w-[25vw] h-[25vw] rounded-full blur-2xl opacity-8 bg-gradient-to-r from-cyan-400 to-blue-400"
      />
      
      {/* Tiny accent orb */}
      <motion.div 
        animate={{
          y: [0, 20, 0],
          x: [0, -8, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-[20%] left-[60%] w-[15vw] h-[15vw] rounded-full blur-xl opacity-10 bg-gradient-to-tr from-emerald-400 to-cyan-400"
      />
    </div>
  )
}
