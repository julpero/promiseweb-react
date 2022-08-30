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
        <g id="Diamonds" transform="translate(11.000000, 25.000000)" fill="#0000CD">
          <g id="4" transform="translate(1.000000, 9.000000)" >
            <path d="M7.8 37.3c-2.1-3.6-4.4-7-7.2-10 2.8-3 5.1-6.4 7.2-10 2.2 3.6 4.5 7 7.3 10-2.8 3-5.1 6.4-7.3 10Z" id="path6654-0"/>
            <path d="M153.4 48A135 135 0 0 0 136 24 135 135 0 0 0 153.4.2a135 135 0 0 0 17.3 24A135 135 0 0 0 153.4 48Z" id="path6656-6"/>
            <path d="M195.8 228.6c-2.2-3.6-4.4-7-7.2-10 2.8-3 5-6.4 7.2-10 2.2 3.6 4.4 7 7.2 10-2.8 3-5 6.4-7.2 10Z" id="path6658-8"/>
            <path d="M50.3 48a135 135 0 0 0-17.4-24A135 135 0 0 0 50.3.2a135 135 0 0 0 17.4 24A135 135 0 0 0 50.3 48Z" id="path6660-7"/>
            <path d="M50.3 245.8a135 135 0 0 0-17.4-24A135 135 0 0 0 50.3 198a135 135 0 0 0 17.4 24 135 135 0 0 0-17.4 23.9Z" id="path6676-4"/>
            <path d="M153.4 245.8a135 135 0 0 0-17.4-24 135 135 0 0 0 17.4-23.9 135 135 0 0 0 17.3 24 135 135 0 0 0-17.3 23.9Z" id="path6678-8"/>
          </g>
        </g>
      </g>
    </svg>
  );
};
