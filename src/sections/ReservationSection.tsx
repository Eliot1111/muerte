import { useState, useRef, type FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';
import './ReservationSection.css';

interface FormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

const initialForm: FormData = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
};

export function ReservationSection() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="reservation" id="reservation" ref={ref}>
      <div className="reservation__glow" aria-hidden="true" />

      <div className="container">
        <div className="reservation__layout">
          <motion.div
            className="reservation__info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="section-label">Бронирование</p>
            <h2 className="section-title">Ваш вечер</h2>
            <p className="section-subtitle">
              Забронируйте стол — мы подготовим всё для незабываемой ночи
            </p>
            <div className="reservation__details">
              <div className="reservation__detail">
                <span className="reservation__detail-label">Время работы</span>
                <span className="reservation__detail-value">Пн–Вс, 17:00 — 02:00</span>
              </div>
              <div className="reservation__detail">
                <span className="reservation__detail-label">Дресс-код</span>
                <span className="reservation__detail-value">Smart casual</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="reservation__form-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  className="reservation__form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="reservation__field">
                    <label htmlFor="name" className="reservation__label">Имя</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="reservation__input"
                      placeholder="Как к вам обращаться"
                    />
                  </div>

                  <div className="reservation__field">
                    <label htmlFor="phone" className="reservation__label">Телефон</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="reservation__input"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>

                  <div className="reservation__row">
                    <div className="reservation__field">
                      <label htmlFor="date" className="reservation__label">Дата</label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                        className="reservation__input"
                      />
                    </div>
                    <div className="reservation__field">
                      <label htmlFor="time" className="reservation__label">Время</label>
                      <input
                        id="time"
                        name="time"
                        type="time"
                        required
                        value={form.time}
                        onChange={handleChange}
                        className="reservation__input"
                      />
                    </div>
                  </div>

                  <div className="reservation__field">
                    <label htmlFor="guests" className="reservation__label">Гостей</label>
                    <select
                      id="guests"
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="reservation__input reservation__select"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <MagneticButton type="submit" variant="primary">
                    Забронировать
                  </MagneticButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="reservation__success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="reservation__success-icon" aria-hidden="true">✦</div>
                  <h3 className="reservation__success-title">Заявка подготовлена</h3>
                  <p className="reservation__success-text">
                    Спасибо, {form.name || 'гость'}. Мы свяжемся с вами по номеру{' '}
                    {form.phone || 'указанному телефону'} для подтверждения брони на{' '}
                    {form.date || 'выбранную дату'} в {form.time || 'указанное время'}.
                  </p>
                  <MagneticButton
                    variant="secondary"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(initialForm);
                    }}
                  >
                    Новая бронь
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
