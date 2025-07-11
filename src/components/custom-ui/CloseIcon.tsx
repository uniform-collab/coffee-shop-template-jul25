import { FC, SVGProps } from 'react';

const CloseIcon: FC<SVGProps<SVGElement>> = ({ className }) => (
  <svg
    width="12px"
    height="12px"
    viewBox="0 0 12 12"
    fill="black"
    strokeWidth="1px"
    stroke="black"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M5.99243 4.51968L10.2426 0.269035L11.7163 1.7568L7.47971 5.99292L11.7163 10.2431L10.2426 11.7168L5.99243 7.4802L1.75631 11.7168L0.268555 10.2431L4.51919 5.99292L0.268555 1.7568L1.75631 0.269035L5.99243 4.51968Z" />
  </svg>
);

export default CloseIcon;
