import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <>
      <BackToTop />
      <Navbar />
      <main className="w-full min-h-screen bg-dark">
        <Hero />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
