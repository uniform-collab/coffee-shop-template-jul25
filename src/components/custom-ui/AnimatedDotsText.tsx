import { FC, useEffect, useState } from 'react';

type AnimatedDotsTextProps = {
  baseText?: string;
  interval?: number;
};

const AnimatedDotsText: FC<AnimatedDotsTextProps> = ({ baseText = 'Adding', interval = 400 }) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDotCount(prev => (prev + 1) % 4);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return baseText + '.'.repeat(dotCount);
};

export default AnimatedDotsText;
