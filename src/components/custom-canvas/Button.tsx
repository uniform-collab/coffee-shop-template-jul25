import { FC } from 'react';
import { Button as CSKButton, ButtonProps as CSKButtonProps } from '@uniformdev/csk-components/components/canvas';
import { cn } from '@uniformdev/csk-components/utils/styling';

type ButtonProps = CSKButtonProps & {
  fullWidth?: boolean;
};

const Button: FC<ButtonProps> = ({ fullWidth, ...props }) => (
  <CSKButton
    className={cn('h-fit', {
      'w-full text-center [&>span]:w-full': fullWidth,
    })}
    {...props}
  />
);

export default Button;
