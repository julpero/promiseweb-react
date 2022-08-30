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
        <g id="Clubs" transform="translate(10.000000, 23.000000)" fill="#006400">
          <g id="2" transform="translate(0.000000, 11.000000)" >
            <path d="M103.9.6c-9.8.2-14.2 11.3-7 19.8 1.1 1.2 1.2 2-.7.8C91.3 17.9 82 20 81.5 30c-.6 12.3 16.6 15.8 19.8 2.8.1-1.4 1.3-1.4 1 .6-.3 5.3-2 10.2-4.2 15h11.6c-2.3-4.8-4-9.7-4.2-15-.3-2 .8-2 1-.6 3.2 13 20.4 9.5 19.8-2.8-.5-10-9.9-12.1-14.7-8.8-2 1.2-1.9.4-.8-.8 7.2-8.5 2.9-19.6-7-19.8Z" id="path147-0-8-1-6-7-2-1-6-3"/>
            <path d="M103.9 246.3c-9.8-.2-14.2-11.2-7-19.8 1.1-1.2 1.2-2-.7-.8C91.3 229 82 227 81.5 217c-.6-12.3 16.6-15.8 19.8-2.8.1 1.4 1.3 1.4 1-.6-.3-5.3-2-10.2-4.2-15h11.6c-2.3 4.8-4 9.7-4.2 15-.3 2 .8 2 1 .6 3.2-13 20.4-9.5 19.8 2.8-.5 10-9.9 12.1-14.7 8.8-2-1.2-1.9-.4-.8.8 7.2 8.6 2.9 19.6-7 19.8Z" id="path147-0-8-1-6-1-4-5-4-2"/>
            <path d="M197.9 228.6c3.9 0 5.6-4.6 2.7-8.2-.4-.5-.4-.8.3-.3 2 1.3 5.7.4 5.9-3.7.2-5.1-6.6-6.6-8-1.2 0 .6-.4.6-.3-.2.1-2.2.8-4.3 1.7-6.3h-4.7c1 2 1.6 4 1.7 6.3.1.8-.3.8-.4.2-1.3-5.4-8.1-4-7.9 1.2.2 4.1 4 5 5.9 3.7.7-.5.7-.2.3.3-3 3.6-1.2 8.1 2.7 8.2Z" id="path147-6-9-8-7-0-5-4-9-1"/>
            <path d="M9.9 17.4c-4 .1-5.7 4.7-2.8 8.3.5.5.5.8-.3.3-2-1.4-5.7-.5-5.9 3.7-.2 5.1 6.7 6.6 8 1.1 0-.5.5-.5.4.3-.2 2.2-.8 4.3-1.7 6.3h4.6c-.9-2-1.6-4.1-1.7-6.3 0-.8.4-.8.4-.3 1.3 5.5 8.2 4 8-1.1-.2-4.2-4-5-6-3.7-.7.5-.7.2-.2-.3 2.9-3.6 1.1-8.2-2.8-8.3Z" id="path147-6-9-8-7-4-5-9-2-7"/>
          </g>
        </g>
      </g>
    </svg>
  );
};
