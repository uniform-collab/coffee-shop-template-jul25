import { FC, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import ModalLayout from '@/components/custom-ui/ModalLayout';
import { useCard } from '@/providers/CardProvider';
import CartDrawer from './CartDrawer/CartDrawer';

const ShoppingCartModal: FC = () => {
  const { isModalCartOpen, setIsModalCartOpen } = useCard();
  const pathname = usePathname();

  const onCloseModal = useCallback((): void => setIsModalCartOpen(false), [setIsModalCartOpen]);

  useEffect(() => {
    setIsModalCartOpen(false);
  }, [pathname, setIsModalCartOpen]);

  return (
    <ModalLayout isOpen={isModalCartOpen} onCloseModal={onCloseModal}>
      <CartDrawer onCloseModal={onCloseModal} />
    </ModalLayout>
  );
};

export default ShoppingCartModal;
