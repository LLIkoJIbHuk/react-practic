import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.pops';

const Input = forwardRef<HTMLInputElement, InputProps> (function Input({className, isValid = true, ...props}, ref) {

  return (
    <input ref={ref} className={cn(styles['input'], className, styles['input'], {
          [styles['invalid']] : isValid
        })} {...props} />
  );
});

export default Input;