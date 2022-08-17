import React from "react";
import "./card.css";

interface IProps {
	title: string,
	text: string,
  suite: string,
}

export const xxx = ({title, text, suite}: IProps) => {
  return (
    <svg className="svgBody" width="100%" height="100%" viewBox="0 0 227 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>{title}</title>
      <text className={`noHover ${suite}`} transform="translate(5.000000, 46.000000)" fontSize={30}>{text}</text>
      <text className={`noHover ${suite}`} transform="translate(221.000000, 268.000000)" fontSize={30} rotate={180}>{text}</text>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Clubs" transform="translate(10.000000, 23.000000)" fill="#006400">
          <g id="3" transform="translate(1.000000, 11.000000)" >
            <path d="M103.0956,0.6353 C93.3211,0.8476 88.9382,11.8526 96.1772,20.3986 C97.2271,21.6451 97.3354,22.3605 95.4126,21.1631 C90.5388,17.9039 81.1934,20.0465 80.7148,30.0104 C80.1237,42.2873 97.2777,45.8247 100.4985,32.7701 C100.6686,31.3927 101.7879,31.4241 101.5181,33.3792 C101.2244,38.6856 99.5672,43.6453 97.2894,48.4817 L108.9096,48.4817 C106.6319,43.6453 104.9747,38.6856 104.681,33.3792 C104.4111,31.4241 105.5305,31.3927 105.7005,32.7701 C108.9214,45.8247 126.0754,42.2873 125.4842,30.0104 C125.0058,20.0465 115.6603,17.9039 110.7864,21.1631 C108.8636,22.3605 108.9719,21.6451 110.0219,20.3986 C117.2609,11.8526 112.878,0.8476 103.1036,0.6353 C103.1036,0.6352 103.1036,0.6353 103.0936,0.6353 L103.0956,0.6353 Z" id="path147-0-8-1-6-7-2-5-9-2"></path>
            <path d="M103.0956,246.26835 C93.3211,246.05609 88.9382,235.05108 96.1772,226.50506 C97.2271,225.25853 97.3354,224.54319 95.4126,225.74054 C90.5388,228.99973 81.1934,226.85716 80.7148,216.89326 C80.1237,204.61631 97.2777,201.07899 100.4985,214.13359 C100.6686,215.51095 101.788,215.47952 101.5181,213.52443 C101.2244,208.21802 99.5672,203.25837 97.2894,198.4219 L108.9096,198.4219 C106.632,203.25837 104.9747,208.21802 104.681,213.52443 C104.4111,215.47952 105.5305,215.51095 105.7005,214.13359 C108.9214,201.07899 126.0754,204.61631 125.4842,216.89326 C125.0058,226.85716 115.6603,228.99973 110.7864,225.74054 C108.8637,224.54319 108.972,225.25853 110.0219,226.50506 C117.2609,235.05108 112.878,246.05608 103.1036,246.26835 C103.1036,246.26841 103.1036,246.2683 103.0936,246.26835 L103.0956,246.26835 Z" id="path147-0-8-1-6-1-4-3-4-3"></path>
            <path d="M103.0956,99.5286 C93.3211,99.74086 88.9382,110.74587 96.1772,119.29188 C97.2271,120.53841 97.3354,121.25376 95.4126,120.05641 C90.5388,116.79722 81.1934,118.93978 80.7148,128.90369 C80.1237,141.18063 97.2777,144.71795 100.4985,131.66335 C100.6686,130.28599 101.7879,130.31742 101.5181,132.27252 C101.2244,137.57893 99.5672,142.53858 97.2894,147.37505 L108.9096,147.37505 C106.6319,142.53858 104.9747,137.57893 104.681,132.27252 C104.4111,130.31742 105.5305,130.28599 105.7005,131.66335 C108.9214,144.71795 126.0754,141.18063 125.4842,128.90369 C125.0058,118.93978 115.6603,116.79722 110.7864,120.05641 C108.8636,121.25376 108.972,120.53841 110.0219,119.29188 C117.2609,110.74587 112.878,99.74087 103.1036,99.5286 C103.1036,99.52854 103.1036,99.52865 103.0936,99.5286 L103.0956,99.5286 Z" id="path147-0-8-1-6-1-1-0-4-8-8"></path>
            <path d="M197.0776,228.63086 C200.9873,228.54246 202.7406,223.957 199.845,220.39617 C199.4249,219.87677 199.3816,219.57871 200.1508,220.07761 C202.1003,221.43561 205.8385,220.54287 206.0299,216.39124 C206.2664,211.27584 199.4047,209.80196 198.1164,215.24138 C198.0484,215.81529 197.6006,215.80219 197.7086,214.98756 C197.8261,212.77656 198.4889,210.71004 199.4,208.69485 L194.7522,208.69485 C195.6633,210.71004 196.3261,212.77656 196.4436,214.98756 C196.5516,215.80219 196.1038,215.81529 196.0358,215.24138 C194.7475,209.80196 187.8859,211.27584 188.1223,216.39124 C188.3137,220.54287 192.0519,221.43561 194.0014,220.07761 C194.7706,219.57871 194.7273,219.87677 194.3073,220.39617 C191.4117,223.957 193.1649,228.54241 197.0746,228.63086 C197.0756,228.63088 197.0746,228.63084 197.0746,228.63086 L197.0776,228.63086 Z" id="path147-6-9-8-7-0-5-5-1-4"></path>
            <path d="M9.1226,17.4439 C5.2128,17.5319 3.4596,22.1178 6.3552,25.6786 C6.7752,26.198 6.8185,26.4961 6.0494,25.9972 C4.0998,24.6392 0.3617,25.5319 0.1702,29.6835 C-0.06619,34.7989 6.7954,36.2728 8.0838,30.8334 C8.1518,30.2595 8.5996,30.2726 8.4915,31.0872 C8.3741,33.2982 7.7112,35.3647 6.8001,37.3799 L11.448,37.3799 C10.5369,35.3647 9.874,33.2982 9.7566,31.0872 C9.6486,30.2726 10.0963,30.2595 10.1643,30.8334 C11.4527,36.2728 18.3143,34.7989 18.0779,29.6835 C17.8864,25.5319 14.1483,24.6392 12.1987,25.9972 C11.4296,26.4961 11.4729,26.198 11.8929,25.6786 C14.7885,22.1178 13.0353,17.5324 9.1256,17.4439 C9.1246,17.4439 9.1256,17.4439 9.1256,17.4439 L9.1226,17.4439 Z" id="path147-6-9-8-7-4-5-8-2-3"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
