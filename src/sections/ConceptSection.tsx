import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ConceptSection.css';

const concepts = [
  {
    number: '01',
    title: 'Мексиканская кухня',
    subtitle: 'в центре Москвы',
    text: 'Мы не воспроизводим Мексику — мы переводим её на язык московской ночи. Каждое блюдо — диалог между традицией Оахаки и европейской точностью.',
  },
  {
    number: '02',
    title: 'Авторская подача',
    subtitle: 'без компромиссов',
    text: 'Техники молекулярной кухни встречаются с рецептами, передаваемыми из поколения в поколение. Огонь, дым, кислота — три кита нашего меню.',
  },
  {
    number: '03',
    title: 'Барная культура',
    subtitle: 'текила и мескаль',
    text: 'Коллекция из более чем сорока сортов агавовых дистиллятов. Каждый коктейль — ритуал: sal de gusano, обожжённый лайм, лёд из чистой воды.',
  },
  {
    number: '04',
    title: 'Атмосфера',
    subtitle: 'Santa Muerte',
    text: 'Тёмный бархат, приглушённый свет, золотые акценты. Пространство, где время замедляется, а ужин становится церемонией.',
  },
];

export function ConceptSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="concept" id="concept" ref={ref}>
      <div className="concept__bg-parallax" aria-hidden="true">
        <div className="concept__orb concept__orb--1" />
        <div className="concept__orb concept__orb--2" />
      </div>

      <div className="container">
        <motion.div
          className="concept__header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Концепция</p>
          <h2 className="section-title">
            Ритуал вкуса
            <br />
            <em>и огня</em>
          </h2>
          <p className="section-subtitle">
            Четыре столпа, на которых стоит Santa MUERTE
          </p>
        </motion.div>

        <div className="concept__grid">
          {concepts.map((item, i) => (
            <motion.article
              key={item.number}
              className="concept__card"
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="concept__number">{item.number}</span>
              <div className="concept__card-content">
                <h3 className="concept__card-title">
                  {item.title}
                  <span className="concept__card-subtitle">{item.subtitle}</span>
                </h3>
                <p className="concept__card-text">{item.text}</p>
              </div>
              <div className="concept__card-line" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
