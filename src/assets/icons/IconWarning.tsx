import { IconProps } from "@/interfaces/icon";

const IconWarning = ({ width = "25px", height = "25px", color = "var(--colorBlack)" }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 25" fill="none">
            <path d="M12 2.4137C10.0716 2.4137 8.18657 2.98552 6.58319 4.05687C4.97982 5.12821 3.73013 6.65095 2.99218 8.43253C2.25422 10.2141 2.06114 12.1745 2.43735 14.0658C2.81355 15.9571 3.74215 17.6944 5.10571 19.058C6.46928 20.4215 8.20656 21.3501 10.0979 21.7264C11.9892 22.1026 13.9496 21.9095 15.7312 21.1715C17.5127 20.4336 19.0355 19.1839 20.1068 17.5805C21.1782 15.9771 21.75 14.0921 21.75 12.1637C21.7473 9.57867 20.7192 7.10031 18.8913 5.27242C17.0634 3.44453 14.585 2.41643 12 2.4137ZM12 20.4137C10.3683 20.4137 8.77326 19.9298 7.41655 19.0233C6.05984 18.1168 5.00242 16.8283 4.378 15.3208C3.75358 13.8133 3.5902 12.1545 3.90853 10.5542C4.22685 8.95386 5.01259 7.48385 6.16637 6.33007C7.32016 5.17628 8.79017 4.39055 10.3905 4.07222C11.9909 3.75389 13.6497 3.91727 15.1571 4.54169C16.6646 5.16611 17.9531 6.22354 18.8596 7.58024C19.7661 8.93695 20.25 10.532 20.25 12.1637C20.2475 14.351 19.3775 16.4479 17.8309 17.9946C16.2843 19.5412 14.1873 20.4112 12 20.4137ZM11.25 12.9137V7.6637C11.25 7.46478 11.329 7.27402 11.4697 7.13337C11.6103 6.99271 11.8011 6.9137 12 6.9137C12.1989 6.9137 12.3897 6.99271 12.5303 7.13337C12.671 7.27402 12.75 7.46478 12.75 7.6637V12.9137C12.75 13.1126 12.671 13.3034 12.5303 13.444C12.3897 13.5847 12.1989 13.6637 12 13.6637C11.8011 13.6637 11.6103 13.5847 11.4697 13.444C11.329 13.3034 11.25 13.1126 11.25 12.9137ZM13.125 16.2887C13.125 16.5112 13.059 16.7287 12.9354 16.9137C12.8118 17.0987 12.6361 17.2429 12.4305 17.3281C12.225 17.4132 11.9988 17.4355 11.7805 17.3921C11.5623 17.3487 11.3618 17.2415 11.2045 17.0842C11.0472 16.9269 10.94 16.7264 10.8966 16.5082C10.8532 16.2899 10.8755 16.0637 10.9606 15.8582C11.0458 15.6526 11.19 15.4769 11.375 15.3533C11.56 15.2297 11.7775 15.1637 12 15.1637C12.2984 15.1637 12.5845 15.2822 12.7955 15.4932C13.0065 15.7042 13.125 15.9903 13.125 16.2887Z" fill={color} />
        </svg>
    );
};

export default IconWarning;
