import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { categories, categoryLabels, menuItems, type MenuCategory } from '../data/menu';
import { MenuCard } from '../components/MenuCard';
import './MenuSection.css';

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('tacos');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = menuItems.filter((item) => item.category === activeCategory);

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

        <motion.nav
          className="menu__tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          aria-label="Категории меню"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`menu__tab ${activeCategory === cat ? 'menu__tab--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </motion.nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="menu__grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {filtered.map((item, i) => (
              <MenuCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
