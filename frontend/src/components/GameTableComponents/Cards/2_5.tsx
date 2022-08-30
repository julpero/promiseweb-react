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
          <g id="5" transform="translate(0.000000, 11.000000)" >
            <path d="M155 .6c-9.7.2-14 11.3-6.8 19.8 1 1.2 1.1 2-.8.8-4.9-3.3-14.2-1.2-14.7 8.8-.6 12.3 16.6 15.8 19.8 2.8.2-1.4 1.3-1.4 1 .6-.3 5.3-2 10.2-4.2 15h11.6c-2.3-4.8-4-9.7-4.2-15-.3-2 .8-2 1-.6 3.2 13 20.4 9.5 19.8-2.8-.5-10-9.9-12.1-14.7-8.8-2 1.2-1.8.4-.8-.8 7.2-8.5 2.9-19.6-7-19.8Z" id="path147-0-8-1-6-13-2-8-2-5"/>
            <path d="M52 .6C42.2.8 38 12 45 20.4c1.1 1.2 1.3 2-.7.8-4.8-3.3-14.2-1.2-14.7 8.8-.6 12.3 16.6 15.8 19.8 2.8.2-1.4 1.3-1.4 1 .6-.3 5.3-2 10.2-4.2 15h11.6c-2.3-4.8-4-9.7-4.2-15-.3-2 .8-2 1-.6 3.2 13 20.4 9.5 19.8-2.8-.5-10-9.8-12.1-14.7-8.8-2 1.2-1.8.4-.8-.8C66.2 11.9 61.8.8 52 .6Z" id="path147-0-8-1-6-75-2-83-7-6-4"/>
            <path d="M155 246.3c-9.7-.2-14-11.2-6.8-19.8 1-1.2 1.1-2-.8-.8-4.9 3.3-14.2 1.2-14.7-8.8-.6-12.3 16.6-15.8 19.8-2.8.2 1.4 1.3 1.4 1-.6-.3-5.3-2-10.2-4.2-15h11.6c-2.3 4.8-4 9.7-4.2 15-.3 2 .8 2 1 .6 3.2-13 20.4-9.5 19.8 2.8-.5 10-9.9 12.1-14.7 8.8-2-1.2-1.8-.4-.8.8 7.2 8.6 2.9 19.6-7 19.8Z" id="path147-0-8-1-6-7-5-5-7-6-8-5"/>
            <path d="M52 246.3c-9.8-.2-14.1-11.2-7-19.8 1.1-1.2 1.3-2-.7-.8-4.8 3.3-14.2 1.2-14.7-8.8-.6-12.3 16.6-15.8 19.8-2.8.2 1.4 1.3 1.4 1-.6-.3-5.3-2-10.2-4.2-15h11.6c-2.3 4.8-4 9.7-4.2 15-.3 2 .8 2 1 .6 3.2-13 20.4-9.5 19.8 2.8-.5 10-9.8 12.1-14.7 8.8-2-1.2-1.8-.4-.8.8 7.3 8.6 2.9 19.6-6.9 19.8Z" id="path147-0-8-1-6-75-6-1-2-4-9-5"/>
            <path d="M103.5 99.5c-9.7.2-14.1 11.2-6.9 19.8 1 1.2 1.2 2-.7.8-5-3.3-14.3-1.2-14.7 8.8-.6 12.3 16.5 15.8 19.7 2.8.2-1.4 1.3-1.4 1 .6-.2 5.3-1.9 10.2-4.2 15h11.7c-2.3-4.8-4-9.7-4.3-15-.2-2 .9-2 1-.6 3.3 13 20.4 9.5 19.8-2.8-.4-10-9.8-12.1-14.7-8.8-1.9 1.2-1.8.4-.7-.8 7.2-8.6 2.8-19.6-7-19.8Z" id="path147-0-8-1-6-1-1-0-5-6-4-0"/>
            <path d="M197.5 228.6c4 0 5.7-4.6 2.8-8.2-.4-.5-.5-.8.3-.3 2 1.3 5.7.4 5.9-3.7.2-5.1-6.6-6.6-8-1.2 0 .6-.4.6-.3-.2 0-2.2.7-4.3 1.7-6.3h-4.7c1 2 1.6 4 1.7 6.3.1.8-.3.8-.4.2-1.3-5.4-8.2-4-8 1.2.3 4.1 4 5 6 3.7.7-.5.7-.2.3.3-3 3.6-1.2 8.1 2.7 8.2Z" id="path147-6-9-8-7-0-5-6-7-4-6"/>
            <path d="M9.6 17.4c-4 .1-5.7 4.7-2.8 8.3.4.5.5.8-.3.3-2-1.4-5.7-.5-5.9 3.7-.2 5.1 6.6 6.6 8 1.1 0-.5.4-.5.3.3 0 2.2-.7 4.3-1.6 6.3h4.6c-1-2-1.6-4.1-1.7-6.3-.1-.8.3-.8.4-.3 1.3 5.5 8.2 4 8-1.1-.3-4.2-4-5-6-3.7-.7.5-.7.2-.3-.3 3-3.6 1.2-8.2-2.7-8.3Z" id="path147-6-9-8-7-4-5-62-2-3-8"/>
          </g>
        </g>
      </g>
    </svg>
  );
};
