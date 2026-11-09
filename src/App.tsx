import { MotionConfig } from "framer-motion";
import { Footer } from "./components/layout/Footer.tsx";
import { Header } from "./components/layout/Header.tsx";
import { About } from "./components/sections/About.tsx";
import { Contact } from "./components/sections/Contact.tsx";
import { Experience } from "./components/sections/Experience.tsx";
import { Hero } from "./components/sections/Hero.tsx";
import { Projects } from "./components/sections/Projects.tsx";
import { Skills } from "./components/sections/Skills.tsx";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
