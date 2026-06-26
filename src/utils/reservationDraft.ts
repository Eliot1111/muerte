export interface ReservationDraft {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
}

const RESERVATION_DRAFT_KEY = 'santa-muerte-reservation-draft';

function isReservationDraft(value: unknown): value is ReservationDraft {
  if (!value || typeof value !== 'object') return false;

  const draft = value as Record<keyof ReservationDraft, unknown>;

  return (
    typeof draft.name === 'string' &&
    typeof draft.phone === 'string' &&
    typeof draft.date === 'string' &&
    typeof draft.time === 'string' &&
    typeof draft.guests === 'string'
  );
}

export function saveReservationDraft(draft: ReservationDraft) {
  window.sessionStorage.setItem(RESERVATION_DRAFT_KEY, JSON.stringify(draft));
}

export function loadReservationDraft(): ReservationDraft | null {
  try {
    const storedDraft = window.sessionStorage.getItem(RESERVATION_DRAFT_KEY);
    if (!storedDraft) return null;

    const parsedDraft: unknown = JSON.parse(storedDraft);
    return isReservationDraft(parsedDraft) ? parsedDraft : null;
  } catch {
    return null;
  }
}
