import { FC } from 'react';
import { ComponentProps, UniformSlot } from '@uniformdev/canvas-next-rsc/component';
import { ContainerParameters } from '@uniformdev/csk-components/components/canvas';
import BaseModalLayout from '@/components/custom-ui/ModalLayout';

type ModalLayoutParameters = Pick<ContainerParameters, 'spacing' | 'border' | 'backgroundColor'> & {
  open: boolean;
};

enum ModalLayoutSlots {
  LayoutContent = 'layoutContent',
}

type ModalLayoutProps = ComponentProps<ModalLayoutParameters, ModalLayoutSlots>;

const ModalLayout: FC<ModalLayoutProps> = ({ open, spacing, border, backgroundColor, component, context, slots }) => (
  <BaseModalLayout isOpen={open} {...{ spacing, border, backgroundColor }}>
    <UniformSlot data={component} context={context} slot={slots.layoutContent} />
  </BaseModalLayout>
);

export default ModalLayout;
