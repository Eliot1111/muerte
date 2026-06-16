import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';
import './ContactSection.css';

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="contact" id="contacts" ref={ref}>
      <div className="contact__gradient" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="contact__layout"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contact__main">
            <p className="section-label">Контакты</p>
            <h2 className="contact__title">
              Москва,
              <br />
              <em>сердце города</em>
            </h2>
            <p className="contact__address">
              ул. Большая Никитская, 12
              <br />
              Москва, 125009
            </p>
          </div>

          <div className="contact__grid">
            <div className="contact__item">
              <span className="contact__item-label">Телефон</span>
              <a href="tel:+74951234567" className="contact__item-value">
                +7 (495) 123-45-67
              </a>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Время работы</span>
              <span className="contact__item-value">
                Пн — Вс
                <br />
                17:00 — 02:00
              </span>
            </div>
            <div className="contact__item">
              <span className="contact__item-label">Карта</span>
              <a
                href="https://yandex.ru/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__item-value contact__item-link"
              >
                Открыть на карте →
              </a>
            </div>
          </div>

          <MagneticButton
            href="https://yandex.ru/maps"
            variant="secondary"
            className="contact__map-btn"
          >
            Как добраться
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
