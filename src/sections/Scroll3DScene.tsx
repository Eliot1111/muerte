import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Scroll3DScene.css';

const ScrollCanvas = lazy(() =>
  import('../three/Canvas3D').then((m) => ({ default: m.ScrollCanvas }))
);

const stages = [
  {
    label: 'Маска',
    title: 'Дух Santa Muerte',
    text: 'Реалистичная calavera — символ перехода между мирами и начало вечера.',
  },
  {
    label: 'Ритуал',
    title: 'Свечи и орнамент',
    text: 'Тёмное золото, красный свет, papel picado — атмосфера Santa Muerte.',
  },
  {
    label: 'Агава',
    title: 'Сердце текилы',
    text: 'Blue agave — душа мексиканского бара и основа нашего меню.',
  },
  {
    label: 'Бар',
    title: 'Дух мескаля',
    text: 'Янтарный свет, соль, дым — luxury product render нашего бара.',
  },
  {
    label: 'Меню',
    title: 'Вкус ночи',
    text: 'Тако, лайм, чили — кульминация путешествия за столом Santa MUERTE.',
  },
];

export function Scroll3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setProgress(v);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  const activeStage = Math.min(
    Math.floor(progress * stages.length),
    stages.length - 1
  );

  return (
    <section className="scroll-3d" id="experience" ref={containerRef}>
      <div className="scroll-3d__sticky">
        <Suspense fallback={<div className="scroll-3d__canvas-fallback" />}>
          <ScrollCanvas progress={progress} />
        </Suspense>

        <motion.div className="scroll-3d__overlay" style={{ opacity }}>
          <div className="container scroll-3d__content">
            <p className="section-label">Путешествие</p>

            <div className="scroll-3d__stages">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  className={`scroll-3d__stage ${i === activeStage ? 'scroll-3d__stage--active' : ''}`}
                  animate={{
                    opacity: i === activeStage ? 1 : 0.15,
                    y: i === activeStage ? 0 : 10,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="scroll-3d__stage-label">{stage.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              key={activeStage}
              className="scroll-3d__text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="scroll-3d__title">{stages[activeStage].title}</h2>
              <p className="scroll-3d__description">{stages[activeStage].text}</p>
            </motion.div>

            <div className="scroll-3d__progress">
              <div
                className="scroll-3d__progress-bar"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="scroll-3d__spacer" aria-hidden="true" />
    </section>
  );
}
