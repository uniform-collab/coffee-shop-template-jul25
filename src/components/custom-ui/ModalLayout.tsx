import { FC, PropsWithChildren } from 'react';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas';
import { Container } from '@uniformdev/csk-components/components/ui';
import { cn } from '@uniformdev/csk-components/utils/styling';

type Props = PropsWithChildren<
  Pick<ContainerParameters, 'spacing' | 'border' | 'backgroundColor'> & {
    isOpen: boolean;
    onCloseModal?: () => void;
  }
>;

const ModalLayout: FC<Props> = ({ isOpen, onCloseModal, children, backgroundColor, border, spacing }) => (
  <div className={cn('fixed inset-0 z-10', { 'pointer-events-none': !isOpen })}>
    <button
      className={cn('fixed inset-0 bg-slate-500/[.5] transition-opacity duration-300 ease-in-out', {
        'pointer-events-none opacity-0': !isOpen,
      })}
      onClick={onCloseModal}
    />
    <Container
      wrapperClassName={cn(
        'h-full absolute md:translate-x-4 top-0 right-0 bottom-0 md:w-[558px] w-full transition-opacity duration-300 ease-in-out bg-white',
        { 'opacity-100 overflow-y-auto': isOpen },
        { 'pointer-events-none opacity-0': !isOpen }
      )}
      backgroundColor={backgroundColor}
      border={border}
      spacing={spacing}
      fluidContent
    >
      {children}
    </Container>
  </div>
);

export default ModalLayout;
