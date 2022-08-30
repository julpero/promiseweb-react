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
          <g id="5" transform="translate(1.000000, 9.000000)" >
            <path d="M8 37.3c-2-3.6-4.3-7-7.2-10 2.9-3 5.1-6.4 7.3-10 2.1 3.6 4.4 7 7.2 10-2.8 3-5 6.4-7.2 10Z" id="path6722-9"/>
            <path d="M153.6 48a135 135 0 0 0-17.4-24A135 135 0 0 0 153.6.2a135 135 0 0 0 17.4 24A135 135 0 0 0 153.6 48Z" id="path6724-6"/>
            <path d="M196 228.6c-2.1-3.6-4.4-7-7.2-10 2.8-3 5-6.4 7.2-10 2.2 3.6 4.4 7 7.3 10-2.9 3-5.1 6.4-7.3 10Z" id="path6726-3"/>
            <path d="M50.5 48a135 135 0 0 0-17.4-24A135 135 0 0 0 50.5.2a135 135 0 0 0 17.4 24A135 135 0 0 0 50.5 48Z" id="path6728-7"/>
            <path d="M102 146.9a135 135 0 0 0-17.3-24A135 135 0 0 0 102 99a135 135 0 0 0 17.4 24 135 135 0 0 0-17.4 23.9Z" id="path6736-0"/>
            <path d="M50.5 245.8a135 135 0 0 0-17.4-24A135 135 0 0 0 50.5 198 135 135 0 0 0 68 222a135 135 0 0 0-17.4 23.9Z" id="path6744-9"/>
            <path d="M153.6 245.8a135 135 0 0 0-17.4-24 135 135 0 0 0 17.4-23.9 135 135 0 0 0 17.4 24 135 135 0 0 0-17.4 23.9Z" id="path6746-2"/>
          </g>
        </g>
      </g>
    </svg>
  );
};
