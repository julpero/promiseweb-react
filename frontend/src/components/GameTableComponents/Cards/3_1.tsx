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
            <path d="M8.2 20.3c-2.2-3.6-4.4-7-7.3-10C3.8 7.3 6 4 8.2.3c2.1 3.6 4.4 7 7.2 10-2.8 3-5 6.4-7.2 10Z" id="path6399-9"/>
            <path d="M196.1 211.6c-2.1-3.6-4.4-7-7.2-10 2.8-3 5-6.4 7.2-10 2.2 3.6 4.4 7 7.3 10-2.9 3-5.1 6.4-7.3 10Z" id="path6403-1"/>
            <path d="M103.2 129.9a135 135 0 0 0-17.4-24A135 135 0 0 0 103.2 82a135 135 0 0 0 17.3 24 135 135 0 0 0-17.3 23.9Z" id="path6413-1"/>
          </g>
        </g>
      </g>
    </svg>
  );
};
