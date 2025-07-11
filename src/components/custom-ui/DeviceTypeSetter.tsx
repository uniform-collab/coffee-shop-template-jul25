'use client';

import { FC, useEffect } from 'react';
import { useQuirks, useUniformContext } from '@uniformdev/canvas-next-rsc-client';
import { DEVICE_TYPE_COOKIE_NAME, getBestDevicePreset } from '@/utils/deviceType';

type DeviceTypeSetterProps = {
  previewViewports: { name: string; width: number }[];
};

export const DeviceTypeSetter: FC<DeviceTypeSetterProps> = ({ previewViewports }) => {
  const { context } = useUniformContext();
  const quirks = useQuirks();

  useEffect(() => {
    const updateDeviceType = () => {
      const deviceType = getBestDevicePreset(previewViewports, window.innerWidth);
      if (deviceType && quirks[DEVICE_TYPE_COOKIE_NAME] !== deviceType) {
        context?.update({
          quirks: { [DEVICE_TYPE_COOKIE_NAME]: deviceType },
        });
      }
    };
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, [context, quirks, previewViewports]);

  return null;
};
