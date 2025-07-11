'use client';

import { FC } from 'react';
import { ButtonProps as CSKButtonProps, Button as CSKButton } from '@uniformdev/csk-components/components/canvas';

const RemoveButton: FC<CSKButtonProps> = props => {
  const onClick = () => {
    console.info('product removed');
  };

  return <CSKButton {...props} onClick={onClick} />;
};

export default RemoveButton;
