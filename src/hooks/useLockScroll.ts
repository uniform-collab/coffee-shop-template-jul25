import { useEffect } from 'react';

export const useLockScroll = (isOpen: boolean): void => {
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;
    const scrollY = window.scrollY;

    const hasVerticalScrollbar = html.scrollHeight > html.clientHeight;

    if (isOpen && hasVerticalScrollbar) {
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.overflowY = 'scroll';
      body.dataset.scrollY = scrollY.toString();
    } else {
      const savedY = parseInt(body.dataset.scrollY || '0');
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.overflowY = '';
      delete body.dataset.scrollY;

      window.scrollTo(0, savedY);
    }
  }, [isOpen]);
};
