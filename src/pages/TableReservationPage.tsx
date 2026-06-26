import { useMemo, useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../components/MagneticButton';
import { loadReservationDraft, type ReservationDraft } from '../utils/reservationDraft';
import './TableReservationPage.css';

type TableStatus = 'available' | 'busy';
type TableShape = 'round' | 'square' | 'banquet';

interface RestaurantTable {
  id: string;
  name: string;
  seats: number;
  zone: string;
  x: number;
  y: number;
  status: TableStatus;
  shape: TableShape;
  note: string;
}

const TABLES: RestaurantTable[] = [
  { id: 'T01', name: 'Лунная ниша', seats: 2, zone: 'Окна', x: 15, y: 20, status: 'available', shape: 'round', note: 'Тихий стол для пары у мягкого света.' },
  { id: 'T02', name: 'Красная свеча', seats: 2, zone: 'Окна', x: 34, y: 17, status: 'available', shape: 'round', note: 'Компактная посадка рядом с барной линией.' },
  { id: 'T03', name: 'Мескаль', seats: 4, zone: 'Окна', x: 56, y: 20, status: 'available', shape: 'square', note: 'Удобно для ужина и дегустации.' },
  { id: 'T04', name: 'Календулы', seats: 4, zone: 'Окна', x: 80, y: 22, status: 'busy', shape: 'square', note: 'Уже занято на выбранное время.' },
  { id: 'T05', name: 'Алтарь', seats: 6, zone: 'Центр', x: 17, y: 43, status: 'available', shape: 'square', note: 'В центре зала, рядом с декоративной стеной.' },
  { id: 'T06', name: 'Какао', seats: 4, zone: 'Центр', x: 38, y: 42, status: 'available', shape: 'square', note: 'Баланс приватности и атмосферы.' },
  { id: 'T07', name: 'Череп', seats: 8, zone: 'Центр', x: 61, y: 44, status: 'available', shape: 'banquet', note: 'Большой стол для компании.' },
  { id: 'T08', name: 'Сомбра', seats: 2, zone: 'Центр', x: 83, y: 44, status: 'available', shape: 'round', note: 'Небольшой стол у прохода.' },
  { id: 'T09', name: 'Пепел', seats: 4, zone: 'Лаунж', x: 20, y: 66, status: 'available', shape: 'round', note: 'Ниже света, ближе к диванной зоне.' },
  { id: 'T10', name: 'Оахака', seats: 6, zone: 'Лаунж', x: 42, y: 66, status: 'available', shape: 'square', note: 'Хорошо для ужина с друзьями.' },
  { id: 'T11', name: 'Ночь', seats: 8, zone: 'Лаунж', x: 66, y: 68, status: 'available', shape: 'banquet', note: 'Широкая посадка на компанию.' },
  { id: 'T12', name: 'Дым', seats: 4, zone: 'Лаунж', x: 86, y: 67, status: 'busy', shape: 'square', note: 'Уже занято на выбранное время.' },
  { id: 'T13', name: 'Большой алтарь', seats: 10, zone: 'Банкет', x: 24, y: 86, status: 'available', shape: 'banquet', note: 'Для большого ужина и праздника.' },
  { id: 'T14', name: 'Золото', seats: 6, zone: 'Банкет', x: 55, y: 86, status: 'available', shape: 'square', note: 'Уютная зона рядом с декоративным светом.' },
  { id: 'T15', name: 'Санта Муэрте', seats: 12, zone: 'Банкет', x: 83, y: 86, status: 'available', shape: 'banquet', note: 'Самая просторная посадка зала.' },
];

interface TableReservationPageProps {
  onBackHome: () => void;
}

function getPeopleLabel(count: number) {
  if (count === 1) return '1 человек';
  if (count > 1 && count < 5) return `${count} человека`;
  return `${count} человек`;
}

function getSeatsLabel(count: number) {
  if (count === 1) return '1 место';
  if (count > 1 && count < 5) return `${count} места`;
  return `${count} мест`;
}

function getDraftGuests(draft: ReservationDraft | null) {
  const guests = Number(draft?.guests ?? 2);
  return Number.isFinite(guests) && guests > 0 ? guests : 2;
}

function TableChairs({ count, radius }: { count: number; radius: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="table-node__chair"
          style={
            {
              '--chair-angle': `${(360 / count) * index}deg`,
              '--chair-radius': `${radius}px`,
            } as CSSProperties
          }
        />
      ))}
    </>
  );
}

export function TableReservationPage({ onBackHome }: TableReservationPageProps) {
  const draft = useMemo(() => loadReservationDraft(), []);
  const guests = getDraftGuests(draft);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [reservedTableId, setReservedTableId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const selectedTable = TABLES.find((table) => table.id === selectedTableId) ?? null;
  const reservedTable = TABLES.find((table) => table.id === reservedTableId) ?? null;
  const selectedTableIsBookable =
    selectedTable?.status === 'available' && selectedTable.seats >= guests;
  const recommendedTables = TABLES.filter(
    (table) => table.status === 'available' && table.seats >= guests
  ).length;

  const bookSelectedTable = () => {
    if (!selectedTableIsBookable || !selectedTable) return;

    setReservedTableId(selectedTable.id);
    setConfirmed(false);
  };

  const confirmReservation = () => {
    if (!reservedTable) return;

    setConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="table-reserve">
      <div className="table-reserve__glow table-reserve__glow--red" aria-hidden="true" />
      <div className="table-reserve__glow table-reserve__glow--gold" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="table-reserve__hero"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="section-label">Резерв столов</p>
            <h1 className="section-title">Выберите место для вашей ночи</h1>
            <p className="section-subtitle">
              Нажмите на стол на схеме зала, забронируйте его и подтвердите
              резервацию. Это демо-резерв — данные пока остаются только в браузере.
            </p>
          </div>

          <div className="table-reserve__actions">
            <MagneticButton
              variant="primary"
              onClick={confirmReservation}
              disabled={!reservedTable || confirmed}
            >
              {confirmed ? 'Резервация подтверждена' : 'Подтвердить резервацию'}
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={onBackHome}>
              Вернуться к форме
            </MagneticButton>
          </div>
        </motion.div>

        <AnimatePresence>
          {confirmed && reservedTable && (
            <motion.div
              className="table-reserve__confirmation"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="status"
            >
              <span className="table-reserve__confirmation-mark" aria-hidden="true">✦</span>
              <div>
                <strong>Резервация готова</strong>
                <p>
                  {draft?.name || 'Гость'}, стол {reservedTable.id} “{reservedTable.name}” ждёт{' '}
                  {draft?.date ? draft.date : 'в выбранную дату'} в{' '}
                  {draft?.time ? draft.time : 'выбранное время'}.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="table-reserve__summary" aria-label="Данные резерва">
          <div>
            <span>Имя</span>
            <strong>{draft?.name || 'Гость'}</strong>
          </div>
          <div>
            <span>Дата и время</span>
            <strong>
              {draft?.date || 'Дата не указана'} · {draft?.time || 'Время не указано'}
            </strong>
          </div>
          <div>
            <span>Гостей</span>
            <strong>{getPeopleLabel(guests)}</strong>
          </div>
          <div>
            <span>Подходящих столов</span>
            <strong>{recommendedTables}</strong>
          </div>
        </div>

        <div className="table-reserve__layout">
          <motion.div
            className="table-reserve__plan"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="table-reserve__zone table-reserve__zone--bar">Бар</div>
            <div className="table-reserve__zone table-reserve__zone--altar">Алтарная стена</div>
            <div className="table-reserve__zone table-reserve__zone--entry">Вход</div>

            {TABLES.map((table) => {
              const isSelected = selectedTableId === table.id;
              const isReserved = reservedTableId === table.id;
              const isTooSmall = table.status === 'available' && table.seats < guests;
              const nodeClasses = [
                'table-node',
                `table-node--${table.shape}`,
                isSelected ? 'table-node--selected' : '',
                isReserved ? 'table-node--reserved' : '',
                table.status === 'busy' ? 'table-node--busy' : '',
                isTooSmall ? 'table-node--small' : '',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <button
                  key={table.id}
                  type="button"
                  className={nodeClasses}
                  style={
                    {
                      '--table-x': `${table.x}%`,
                      '--table-y': `${table.y}%`,
                    } as CSSProperties
                  }
                  onClick={() => {
                    setSelectedTableId(table.id);
                    setConfirmed(false);
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Стол ${table.id}, ${table.name}, ${getSeatsLabel(table.seats)}`}
                >
                  <TableChairs count={table.seats} radius={table.shape === 'banquet' ? 48 : 42} />
                  <span className="table-node__plate">
                    <span>{table.id}</span>
                    <small>{table.seats}</small>
                  </span>
                </button>
              );
            })}
          </motion.div>

          <aside className="table-reserve__panel">
            <AnimatePresence mode="wait">
              {selectedTable ? (
                <motion.div
                  key={selectedTable.id}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="table-reserve__panel-kicker">Выбранный стол</span>
                  <h2>{selectedTable.name}</h2>
                  <p className="table-reserve__panel-id">
                    {selectedTable.id} · {selectedTable.zone} · {getSeatsLabel(selectedTable.seats)}
                  </p>
                  <p className="table-reserve__panel-note">{selectedTable.note}</p>

                  {selectedTable.status === 'busy' && (
                    <p className="table-reserve__warning">
                      Этот стол уже занят. Выберите свободный вариант на схеме.
                    </p>
                  )}

                  {selectedTable.status === 'available' && selectedTable.seats < guests && (
                    <p className="table-reserve__warning">
                      Для {getPeopleLabel(guests)} здесь мало мест. Нужен стол побольше.
                    </p>
                  )}

                  {reservedTableId === selectedTable.id && (
                    <p className="table-reserve__success-note">
                      Стол забронирован. Осталось подтвердить резервацию сверху.
                    </p>
                  )}

                  <MagneticButton
                    variant={reservedTableId === selectedTable.id ? 'secondary' : 'primary'}
                    onClick={bookSelectedTable}
                    disabled={!selectedTableIsBookable || reservedTableId === selectedTable.id}
                  >
                    {reservedTableId === selectedTable.id ? 'Стол забронирован' : 'Забронировать'}
                  </MagneticButton>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="table-reserve__panel-kicker">План зала</span>
                  <h2>15 столов</h2>
                  <p className="table-reserve__panel-note">
                    Золотые столы доступны, красные уже заняты, приглушённые — меньше вашей
                    компании. Выберите подходящий стол на схеме.
                  </p>
                  <div className="table-reserve__legend">
                    <span><i className="table-reserve__legend-dot table-reserve__legend-dot--free" /> Свободен</span>
                    <span><i className="table-reserve__legend-dot table-reserve__legend-dot--busy" /> Занят</span>
                    <span><i className="table-reserve__legend-dot table-reserve__legend-dot--small" /> Мало мест</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
