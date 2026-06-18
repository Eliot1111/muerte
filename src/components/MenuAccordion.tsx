import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MenuAccordion.css';

export interface AccordionItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
}

export interface AccordionGroup {
  id: string;
  label: string;
  items: AccordionItem[];
}

interface MenuAccordionProps {
  groups: AccordionGroup[];
  allowMultiple?: boolean;
}

export function MenuAccordion({ groups, allowMultiple = false }: MenuAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="menu-accordion">
      {groups.map((group, groupIndex) => {
        const isOpen = openIds.has(group.id);

        return (
          <div
            key={group.id}
            className={`menu-accordion__section ${isOpen ? 'menu-accordion__section--open' : ''}`}
          >
            <button
              type="button"
              className="menu-accordion__trigger"
              onClick={() => toggle(group.id)}
              aria-expanded={isOpen}
              aria-controls={`menu-panel-${group.id}`}
            >
              <span className="menu-accordion__trigger-main">
                <span className="menu-accordion__index">
                  {String(groupIndex + 1).padStart(2, '0')}
                </span>
                <span className="menu-accordion__label">{group.label}</span>
              </span>
              <span className="menu-accordion__meta">
                <span className="menu-accordion__count">{group.items.length}</span>
                <span className="menu-accordion__icon" aria-hidden="true" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`menu-panel-${group.id}`}
                  className="menu-accordion__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="menu-accordion__grid">
                    {group.items.map((item, itemIndex) => (
                      <motion.article
                        key={item.id}
                        className="menu-accordion__card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: itemIndex * 0.07,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <div className="menu-accordion__card-header">
                          <h4 className="menu-accordion__card-name">{item.name}</h4>
                          {item.price != null && (
                            <span className="menu-accordion__card-price">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="menu-accordion__card-description">{item.description}</p>
                        )}
                      </motion.article>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
