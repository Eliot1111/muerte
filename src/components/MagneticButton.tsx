import { type MouseEvent, type ReactNode, type RefObject } from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';
import './MagneticButton.css';

type Variant = 'primary' | 'secondary' | 'ghost';

interface MagneticButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function MagneticButton({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const { ref, transform, handleMouseMove, handleMouseLeave } = useMagnetic({
    strength: 0.25,
  });

  const classes = `magnetic-btn magnetic-btn--${variant} ${
    disabled ? 'magnetic-btn--disabled' : ''
  } ${className}`.trim();

  const inner = (
    <motion.span
      className="magnetic-btn__inner"
      animate={{ x: transform.x, y: transform.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="magnetic-btn__glow" aria-hidden="true" />
      <span className="magnetic-btn__text">{children}</span>
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        className={classes}
        onMouseMove={handleMouseMove as (e: MouseEvent) => void}
        onMouseLeave={handleMouseLeave}
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      className={classes}
      onMouseMove={handleMouseMove as (e: MouseEvent) => void}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {inner}
    </motion.button>
  );
}
