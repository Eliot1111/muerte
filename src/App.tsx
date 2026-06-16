import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { ConceptSection } from './sections/ConceptSection';
import { Scroll3DScene } from './sections/Scroll3DScene';
import { MenuSection } from './sections/MenuSection';
import { BarSection } from './sections/BarSection';
import { ReservationSection } from './sections/ReservationSection';
import { ContactSection } from './sections/ContactSection';
import { useLenis } from './hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ConceptSection />
        <Scroll3DScene />
        <MenuSection />
        <BarSection />
        <ReservationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
