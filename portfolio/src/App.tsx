import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import Background from './components/Background'
import ParticlePetals from './components/ParticlePetals'
import WaterRipple from './components/WaterRipple'
import IntroScreen from './components/IntroScreen'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Certificates from './pages/Certificates'
import Education from './pages/Education'
import Contact from './pages/Contact'

export default function App() {
  const location = useLocation()
  // Always true on fresh load — intro shows every reload, no persistence
  const [showIntro, setShowIntro] = useState(true)

  return (
    <>
      {/* Always-present background layers — visible behind intro AND main */}
      <Background />
      <WaterRipple />
      <ParticlePetals />

      {/* Intro splash — rendered above everything, always on reload */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen onEnter={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main portfolio — fades in after intro exits */}
      <AnimatePresence>
        {!showIntro && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Layout>
              <ScrollToTop />
              <AnimatePresence mode="wait">
                <PageTransition key={location.pathname}>
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/certificates" element={<Certificates />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </PageTransition>
              </AnimatePresence>
            </Layout>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
