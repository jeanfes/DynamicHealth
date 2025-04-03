import { IconProps } from "@/interfaces/icon";

export const IconCalendar = ({ width = "16", height = "16", color = "var(--colorBlack)" }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 25" fill="none">
      <path d="M19.1525 4.27874H5.15247C4.0479 4.27874 3.15247 5.17417 3.15247 6.27874V20.2787C3.15247 21.3833 4.0479 22.2787 5.15247 22.2787H19.1525C20.257 22.2787 21.1525 21.3833 21.1525 20.2787V6.27874C21.1525 5.17417 20.257 4.27874 19.1525 4.27874Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.1525 2.27874V6.27874" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.15247 2.27874V6.27874" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.15247 10.2787H21.1525" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
