import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';
import './Hero.css';

const HeroCanvas = lazy(() =>
  import('../three/Canvas3D').then((m) => ({ default: m.HeroCanvas }))
);

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__gradient hero__gradient--1" />
        <div className="hero__gradient hero__gradient--2" />
        <div className="hero__gradient hero__gradient--3" />
      </div>

      <div className="hero__content container">
        <div className="hero__layout">
          <motion.div
            className="hero__text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <motion.p
              className="hero__eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Центр Москвы
            </motion.p>

            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="hero__title-line">Santa</span>
              <span className="hero__title-accent">MUERTE</span>
            </motion.h1>

            <motion.p
              className="hero__tagline"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
            >
              Мексиканская кухня в тёмном сердце Москвы
            </motion.p>

            <motion.p
              className="hero__description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
            >
              Santa MUERTE — место, где огонь, агава и ритуал становятся ужином.
              Авторские тако, мескаль, приглушённый свет и ночь, которая начинается за столом.
            </motion.p>

            <motion.div
              className="hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <MagneticButton href="#menu" variant="primary">
                Посмотреть меню
              </MagneticButton>
              <MagneticButton href="#reservation" variant="secondary">
                Забронировать стол
              </MagneticButton>
            </motion.div>
          </motion.div>

          <Suspense fallback={<div className="hero__canvas-fallback" />}>
            <HeroCanvas className="hero__canvas" />
          </Suspense>
        </div>
      </div>

      <motion.div
        className="hero__scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="hero__scroll-text">Листайте</span>
        <span className="hero__scroll-line" />
      </motion.div>
    </section>
  );
}
