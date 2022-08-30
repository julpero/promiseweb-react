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
        <g id="Spades" transform="translate(9.000000, 26.000000)" fill="#000000">
          <g id="A" transform="translate(0.000000, 26.000000)" >
            <path d="M9.7.4C5.5 5.9 1 9 .7 13.3c0 1.4.9 3.7 3.5 4.2 1.7.2 4-1 4.1-3.5 0-.5.6-.5.6.2 0 2-.8 4.3-2 6.1h5.7a13 13 0 0 1-2-6c0-.8.6-.8.6-.3 0 2.5 2.4 3.7 4 3.5a4.1 4.1 0 0 0 3.5-4.2C18.7 9 14 5.9 9.7.4Z" id="path153-0-1-2-5-5-5-3-4"/>
            <path d="M197.7 211.6c-4.3-5.5-8.9-8.6-9-12.9 0-1.4.8-3.7 3.5-4.2 1.7-.2 4 1 4 3.5 0 .5.6.5.6-.2 0-2-.7-4.3-2-6.1h5.7a13 13 0 0 0-2 6c0 .8.6.8.6.3 0-2.5 2.4-3.7 4.1-3.5 2.6.5 3.5 2.8 3.5 4.2-.1 4.3-4.7 7.4-9 12.9Z" id="path153-0-1-2-5-6-5-9-1-9"/>
            <path d="M104.7 82c-9.2 13.2-19 20.7-19.2 31 0 3.3 1.8 9 7.4 10 3.6.7 8.6-2.3 8.7-8.2 0-1.2 1.3-1.2 1.3.4a34 34 0 0 1-4.2 14.7h12a34 34 0 0 1-4.1-14.7c0-1.6 1.2-1.6 1.2-.4.1 6 5.1 8.9 8.8 8.2 5.6-1 7.4-6.7 7.3-10-.2-10.3-10-17.8-19.2-31Z" id="path153-6-3-1-6-92-7-2-9-8"/>
          </g>
        </g>
      </g>
    </svg>
  );
};
