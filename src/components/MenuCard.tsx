import { motion } from 'framer-motion';
import type { MenuItem } from '../data/menu';
import { getMenuPhoto } from '../data/menu';
import './MenuCard.css';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export function MenuCard({ item, index }: MenuCardProps) {
  const photo = getMenuPhoto(item);
  const hasPhoto = Boolean(photo);

  return (
    <motion.article
      className={`menu-card ${hasPhoto ? '' : 'menu-card--text-only'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {hasPhoto && (
        <div className="menu-card__image-wrap">
          <div className="menu-card__image-glow" aria-hidden="true" />
          <img
            src={photo}
            alt={item.name}
            className="menu-card__image"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.add('menu-card__placeholder--visible');
            }}
          />
          <div className="menu-card__placeholder" aria-hidden="true">
            <span className="menu-card__placeholder-icon">✦</span>
            <span className="menu-card__placeholder-text">{item.name}</span>
          </div>
          <div className="menu-card__overlay" />
        </div>
      )}
      <div className="menu-card__content">
        <div className="menu-card__header">
          <h3 className="menu-card__name">{item.name}</h3>
          <span className="menu-card__price">
            {item.price.toLocaleString('ru-RU')} ₽
          </span>
        </div>
        <p className="menu-card__description">{item.description}</p>
      </div>
    </motion.article>
  );
}
