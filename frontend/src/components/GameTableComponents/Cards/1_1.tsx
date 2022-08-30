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
        <g id="Hearts" transform="translate(9.000000, 25.000000)" fill="#D40000">
          <g id="A" transform="translate(0.000000, 27.000000)" >
            <path d="M9.5 20.7s-2.2-3.2-5.2-7C2.3 11.4.7 8.7.6 6.3.4 3.6 2 1 4.9.8c3-.2 4.1 2 4.6 3.8.5-1.8 1.7-4 4.6-3.8 3 0 4.5 2.8 4.4 5.4-.2 2.4-1.8 5-3.8 7.6-3 3.7-5.2 6.9-5.2 6.9Z" id="path9698-0-0"/>
            <path d="M197.5 192s-2.2 3.2-5.2 7c-2 2.4-3.6 5.1-3.8 7.5-.1 2.6 1.5 5.3 4.4 5.4 3 .2 4-2 4.6-3.8.5 1.8 1.6 4 4.6 3.8 2.9-.1 4.5-2.8 4.3-5.4-.1-2.4-1.7-5-3.7-7.6-3-3.7-5.2-6.9-5.2-6.9Z" id="path9700-3-2"/>
            <path d="M104.5 130.3s-4.6-7.7-11-16.6c-4.1-6-7.5-12.5-7.8-18.1-.3-6.4 3-12.9 9.2-13.2 6.1-.3 8.6 5 9.6 9.3 1-4.3 3.5-9.6 9.6-9.3 6.1.3 9.5 6.8 9.2 13.2a38.6 38.6 0 0 1-7.9 18c-6.3 9-10.9 16.7-10.9 16.7Z" id="path9714-6-6"/>
          </g>
        </g>
      </g>
    </svg>
  );
};
