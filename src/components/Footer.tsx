import { type MouseEvent } from 'react';
import { NAV_ITEMS } from '../data/navigation';
import { homeHashPath } from '../utils/routing';
import './Footer.css';

interface FooterProps {
  onNavigateHome: (hash?: string) => void;
}

export function Footer({ onNavigateHome }: FooterProps) {
  const year = new Date().getFullYear();
  const handleFooterLinkClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    onNavigateHome(hash);
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">Santa MUERTE</span>
          <p className="footer__tagline">
            Мексиканская кухня в тёмном сердце Москвы
          </p>
        </div>

        <div className="footer__links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={homeHashPath(item.href)}
              onClick={(event) => handleFooterLinkClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <p className="footer__copy">
          © {year} Santa MUERTE. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
