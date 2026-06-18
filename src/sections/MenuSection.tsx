import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MenuAccordion } from '../components/MenuAccordion';
import { categories, categoryLabels, menuItems } from '../data/menu';
import './MenuSection.css';

export function MenuSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const groups = useMemo(
    () =>
      categories.map((category) => ({
        id: category,
        label: categoryLabels[category],
        items: menuItems
          .filter((item) => item.category === category)
          .map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
          })),
      })),
    []
  );

  return (
    <section className="menu" id="menu" ref={ref}>
      <div className="menu__glow" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="menu__header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Меню</p>
          <h2 className="section-title">Карта вкусов</h2>
          <p className="section-subtitle">
            Авторская интерпретация мексиканской кухни — от уличных antojitos до гриля
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <MenuAccordion groups={groups} />
        </motion.div>
      </div>
    </section>
  );
}
