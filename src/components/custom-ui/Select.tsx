import { FC, SelectHTMLAttributes } from 'react';
import { cn } from '@uniformdev/csk-components/utils/styling';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const Select: FC<SelectProps> = ({ className = '', children, ...props }) => (
  <div className="relative">
    <select
      className={cn('relative w-full pr-12 p-input-large border-product-card focus:outline-current', className)}
      style={{ appearance: 'none' }}
      {...props}
    >
      {children}
    </select>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="absolute inset-y-0 right-4 top-1/2 size-4 -translate-y-1/2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  </div>
);

export default Select;
