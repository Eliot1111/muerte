import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './BarSection.css';

const barItems = [
  {
    category: 'Текила',
    items: [
      { name: 'Clase Azul Reposado', note: 'Гуанахуато, выдержка 8 месяцев' },
      { name: 'Fortaleza Blanco', note: 'Тахона, 100% blue agave' },
      { name: 'G4 Reposado', note: 'Халиско, дубовые бочки' },
    ],
  },
  {
    category: 'Мескаль',
    items: [
      { name: 'Del Maguey Vida', note: 'Эспадин, Оахака' },
      { name: 'Mezcal Tosba', note: 'Артизанальный, дымный' },
      { name: 'Bozal Tobasiche', note: 'Дикая агава, лимитированный' },
    ],
  },
  {
    category: 'Авторские коктейли',
    items: [
      { name: 'La Ofrenda', note: 'Мескаль, hibiscus, chipotle' },
      { name: 'Noche en CDMX', note: 'Текила, tamarindo, mezcal foam' },
      { name: 'Sangre de Agave', note: 'Репозадо, blood orange, sage' },
    ],
  },
];

export function BarSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bar" id="bar" ref={ref}>
      <div className="bar__ambient" aria-hidden="true">
        <div className="bar__liquid bar__liquid--1" />
        <div className="bar__liquid bar__liquid--2" />
        <div className="bar__ring" />
      </div>

      <div className="container bar__inner">
        <motion.div
          className="bar__header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Бар</p>
          <h2 className="section-title">
            Дух агавы
            <br />
            <em>в каждом бокале</em>
          </h2>
          <p className="section-subtitle">
            Более сорока сортов текилы и мескаля. Каждый налив — ритуал.
          </p>
        </motion.div>

        <div className="bar__columns">
          {barItems.map((group, gi) => (
            <motion.div
              key={group.category}
              className="bar__column"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + gi * 0.15 }}
            >
              <h3 className="bar__column-title">{group.category}</h3>
              <ul className="bar__list">
                {group.items.map((item, ii) => (
                  <motion.li
                    key={item.name}
                    className="bar__item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + gi * 0.15 + ii * 0.08 }}
                  >
                    <span className="bar__item-name">{item.name}</span>
                    <span className="bar__item-note">{item.note}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="bar__footnote"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Sal de gusano · Обожжённый лайм · Лёд из фильтрованной воды
        </motion.p>
      </div>
    </section>
  );
}
