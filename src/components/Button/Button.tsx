import React from 'react';
import style from './Button.module.scss';

interface ButtonProps {
  onClick: () => void,
  title: string,
  disabled?: boolean,
}

const Button: React.FC<ButtonProps> = ({ onClick, title, disabled }: ButtonProps) => (
  <button onClick={onClick} type="button" className={style.button} disabled={disabled}>
    {title}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

export default Button;
