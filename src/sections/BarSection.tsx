import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MenuAccordion } from '../components/MenuAccordion';
import './BarSection.css';

const barItems = [
  {
    id: 'tequila',
    category: 'Текила',
    items: [
      { id: 't1', name: 'Clase Azul Reposado', description: 'Гуанахуато, выдержка 8 месяцев' },
      { id: 't2', name: 'Fortaleza Blanco', description: 'Тахона, 100% blue agave' },
      { id: 't3', name: 'G4 Reposado', description: 'Халиско, дубовые бочки' },
    ],
  },
  {
    id: 'mezcal',
    category: 'Мескаль',
    items: [
      { id: 'm1', name: 'Del Maguey Vida', description: 'Эспадин, Оахака' },
      { id: 'm2', name: 'Mezcal Tosba', description: 'Артизанальный, дымный' },
      { id: 'm3', name: 'Bozal Tobasiche', description: 'Дикая агава, лимитированный' },
    ],
  },
  {
    id: 'cocktails',
    category: 'Авторские коктейли',
    items: [
      { id: 'c1', name: 'La Ofrenda', description: 'Мескаль, hibiscus, chipotle' },
      { id: 'c2', name: 'Noche en CDMX', description: 'Текила, tamarindo, mezcal foam' },
      { id: 'c3', name: 'Sangre de Agave', description: 'Репозадо, blood orange, sage' },
    ],
  },
];

export function BarSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const groups = useMemo(
    () =>
      barItems.map((group) => ({
        id: group.id,
        label: group.category,
        items: group.items,
      })),
    []
  );

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

        <motion.div
          className="bar__accordion"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <MenuAccordion groups={groups} />
        </motion.div>

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
