import { useState, useEffect, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../data/navigation';
import { homeHashPath } from '../utils/routing';
import './Header.css';

interface HeaderProps {
  onNavigateHome: (hash?: string) => void;
}

export function Header({ onNavigateHome }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigateHome();
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigateHome(href);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner container">
          <a href={homeHashPath()} className="header__logo" onClick={handleLogoClick}>
            <span className="header__logo-main">Santa</span>
            <span className="header__logo-accent">MUERTE</span>
          </a>

          <nav className="header__nav" aria-label="Основная навигация">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={homeHashPath(item.href)}
                className="header__link"
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="mobile-menu__bg"
              initial={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
              animate={{ clipPath: 'circle(150% at calc(100% - 2rem) 2rem)' }}
              exit={{ clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <nav className="mobile-menu__nav">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={homeHashPath(item.href)}
                  className="mobile-menu__link"
                  onClick={(event) => handleNavClick(event, item.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                >
                  <span className="mobile-menu__index">0{i + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.p
              className="mobile-menu__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Мексиканская кухня в тёмном сердце Москвы
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
