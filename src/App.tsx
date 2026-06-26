import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { ConceptSection } from './sections/ConceptSection';
import { Scroll3DScene } from './sections/Scroll3DScene';
import { MenuSection } from './sections/MenuSection';
import { BarSection } from './sections/BarSection';
import { ReservationSection } from './sections/ReservationSection';
import { ContactSection } from './sections/ContactSection';
import { TableReservationPage } from './pages/TableReservationPage';
import { useLenis } from './hooks/useLenis';
import {
  homeHashPath,
  readRouteFromLocation,
  routePath,
  type AppRoute,
} from './utils/routing';
import { saveReservationDraft, type ReservationDraft } from './utils/reservationDraft';

const HOME_TITLE = 'Santa MUERTE — Мексиканская кухня в центре Москвы';
const RESERVE_TITLE = 'Резерв столов — Santa MUERTE';

export default function App() {
  useLenis();
  const [route, setRoute] = useState<AppRoute>(() => readRouteFromLocation());

  useEffect(() => {
    const handlePopState = () => setRoute(readRouteFromLocation());

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = route === 'reserve' ? RESERVE_TITLE : HOME_TITLE;
  }, [route]);

  const scrollToHomeTarget = useCallback((hash?: string) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!hash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }

        const target = document.querySelector(hash);
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

  const navigateHome = useCallback(
    (hash?: string) => {
      window.history.pushState(null, '', homeHashPath(hash));
      setRoute('home');
      scrollToHomeTarget(hash);
    },
    [scrollToHomeTarget]
  );

  const navigateReserve = useCallback(() => {
    window.history.pushState(null, '', routePath('reserve'));
    setRoute('reserve');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReservationReady = useCallback(
    (draft: ReservationDraft) => {
      saveReservationDraft(draft);
      navigateReserve();
    },
    [navigateReserve]
  );

  return (
    <>
      <Header onNavigateHome={navigateHome} />
      <main>
        {route === 'reserve' ? (
          <TableReservationPage onBackHome={() => navigateHome('#reservation')} />
        ) : (
          <>
            <Hero />
            <ConceptSection />
            <Scroll3DScene />
            <MenuSection />
            <BarSection />
            <ReservationSection onReservationReady={handleReservationReady} />
            <ContactSection />
          </>
        )}
      </main>
      <Footer onNavigateHome={navigateHome} />
    </>
  );
}
