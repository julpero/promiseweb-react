import React from "react";
import "./card.css";

interface IProps {
	title: string,
	text: string,
  suite: string,
  playableClass?: string,
}

export const xxx = ({title, text, suite, playableClass}: IProps) => {
  return (
    <svg className={`svgBody ${playableClass}`} width="100%" height="100%" viewBox="0 0 227 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>{title}</title>
      <text className={`noHover ${suite}`} transform="translate(5.000000, 46.000000)" fontSize={30}>{text}</text>
      <text className={`noHover ${suite}`} transform="translate(221.000000, 268.000000) rotate(180)" fontSize={30}>{text}</text>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Diamonds" transform="translate(10.000000, 25.000000)" fill="#0000CD">
          <g id="A" transform="translate(0.000000, 26.000000)" >
            <path d="M8.17566514,20.3028471 C6.0243142,16.7456546 3.76106514,13.2882421 0.932750458,10.3348134 C3.76106514,7.3814844 6.0243142,3.92407191 8.17566514,0.36677972 C10.3269165,3.92407191 12.5901656,7.3814844 15.4184803,10.3348134 C12.5901656,13.2882421 10.3269165,16.7456546 8.17566514,20.3028471 L8.17566514,20.3028471 Z" id="path6399-9"></path>
            <path d="M196.12723,211.554127 C193.97588,207.996934 191.71263,204.539522 188.884316,201.586093 C191.71263,198.632764 193.97588,195.175352 196.12723,191.61806 C198.278482,195.175352 200.541731,198.632764 203.370046,201.586093 C200.541731,204.539522 198.278482,207.996934 196.12723,211.554127 L196.12723,211.554127 Z" id="path6403-1"></path>
            <path d="M103.150975,129.883734 C97.9879318,121.346313 92.5560942,113.048622 85.7680394,105.960453 C92.5560942,98.8723839 97.9879318,90.5746937 103.150975,82.0371725 C108.314118,90.5746937 113.745955,98.8723839 120.53401,105.960453 C113.745955,113.048622 108.314118,121.346313 103.150975,129.883734 L103.150975,129.883734 Z" id="path6413-1"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};