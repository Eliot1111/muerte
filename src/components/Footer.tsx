import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

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
          <a href="#concept">Концепция</a>
          <a href="#menu">Меню</a>
          <a href="#bar">Бар</a>
          <a href="#reservation">Бронь</a>
          <a href="#contacts">Контакты</a>
        </div>

        <p className="footer__copy">
          © {year} Santa MUERTE. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
