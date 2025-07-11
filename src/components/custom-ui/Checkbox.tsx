import React, { FC, InputHTMLAttributes, ReactNode, useId } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  value: string;
  wrapperClassName?: string;
};

const Checkbox: FC<CheckboxProps> = ({ label, value, wrapperClassName = '', checked, className, ...props }) => {
  const id = useId();

  return (
    <div className={cn('flex group items-start gap-x-3', wrapperClassName)}>
      <div>
        <label
          className={cn(
            'w-5 h-5 cursor-pointer border border-gray-300 block relative bg-white group-hover:bg-gray-200',
            className
          )}
          htmlFor={id}
        >
          {checked && (
            <svg
              className="absolute -top-1.5 left-px"
              width="24"
              height="24"
              viewBox="0 0 17 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 7.5L6 11.5L15 1" stroke="currentColor" strokeWidth="3" />
            </svg>
          )}
        </label>
        <input
          className={cn('h-0 w-0 invisible block')}
          type="checkbox"
          value={value}
          checked={checked}
          id={id}
          {...props}
        />
      </div>

      <label className={cn('cursor-pointer leading-5', { 'opacity-50': props.disabled })} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
