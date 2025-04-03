import { IconProps } from "@/interfaces/icon";

export const IconHeartBeat = ({ width = "16", height = "16", color = "var(--colorBlack)" }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 25 25" fill="none">
            <path d="M22.5647 12.3301H18.5647L15.5647 21.3301L9.5647 3.33011L6.5647 12.3301H2.5647" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
