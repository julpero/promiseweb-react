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
        <g id="Clubs" transform="translate(10.000000, 23.000000)">
          <g id="K" >
            <path d="M197.3 239.6c4 0 5.7-4.6 2.8-8.2-.4-.5-.5-.8.3-.3 2 1.3 5.7.4 5.9-3.7.2-5.1-6.7-6.6-8-1.2 0 .6-.5.6-.3-.2 0-2.2.7-4.3 1.6-6.3H195c1 2 1.6 4 1.7 6.3.1.8-.4.8-.4.2-1.3-5.4-8.2-4-8 1.2.3 4.1 4 5 6 3.7.7-.5.7-.2.3.3-3 3.6-1.2 8.1 2.7 8.2Z" id="path147-6-9-8-7-0-5-6-9-6-3" fill="#006400"/>
            <path d="M9.4 28.4c-4 .1-5.7 4.7-2.8 8.3.4.5.5.8-.3.3-2-1.4-5.7-.5-5.9 3.7-.2 5.1 6.6 6.6 8 1.1 0-.5.4-.5.3.3 0 2.2-.7 4.3-1.7 6.3h4.7c-1-2-1.6-4.1-1.7-6.3-.1-.8.3-.8.4-.3 1.3 5.5 8.2 4 8-1.1-.3-4.2-4-5-6-3.7-.7.5-.7.2-.3-.3 3-3.6 1.2-8.2-2.7-8.3Z" id="path147-6-9-8-7-4-5-62-08-0-2" fill="#006400"/>
            <path d="m152.5 4.5-81.7.4L81 24.7c21.3-1.9 39.9-.2 59.3.5l12-20.7ZM96.7 74.3c-.1 0-3.4 1-3 1.7 8.6 18.7 12.4 33.9 16 53.1 1.9-1.5 4.8-1.4 4.8-1.4-1.4-7.2 7.5-8 7.5-.6 1.7.4 3.5.4 5 2.2A120 120 0 0 1 145 71.5c-11 4.4-27.2 15.3-27.2 15.3s-13.4-5.6-21-12.5Zm66.8 2.2c-14.7 14-20.4 52.9-19.3 53.4-18.9-.6-24.6 20.4-8.3 31.7-.6 2.2-2.2 4-3.4 5.9 1.6 1 3.5 1.2 5.3 1.4 1.4 1.6 2.8 3.6 4.3 3.7 1.6-1 2.8-2.6 4.2-3.9 1.7-.4 3.4-1 5-1.7-1.4-2-3.1-4-3.2-6 14.2-10 12.3-23.8-.5-30.8 3.8-23.1 9.4-38 15.8-48.4v-5.3ZM62.7 94.4c-1.8.9-2.8 2.8-4.2 4.3a15 15 0 0 0-5.4 1.5s4.3 6 4 6.3c-13.7 9-13.6 22.3-.4 31 2.2 19-13.7 48.8-14.5 48v6.2c11.3-12.5 17.8-35 18.4-53.3C83.2 137 84 115 68.4 106.6c-1.2-1.1 4-6.3 4-6.3C71 99 68.9 99 67 98.7c-1.2-1.4-2.3-2.8-4.3-4.3Zm95.7 15.2c3.2 7.2 14.8-1.5 16.9 2.3 1.6 2.1 5.2 2.4 5-1.3-.7-3.6-3-4.4-12.4-2.8-3.5.6-5 1-5-.7-2.4-3-4.5 1-4.5 2.5Zm10.8 10.5c-2.6 0-3 10.3-3 13.4-7.6 12.1 15.6 10.8 5.5-2.4.4-1.7-1.2-4.5-1.2-5.8-.8-.1-1.2-4.8-1.3-5.2ZM33.7 135.7c-.3 3.1 2 12.6 2.8 12.3 3-4.8 2.6-9 2.3-13.7 7.1-13.7-17-8-5.1 1.4Zm44 2.2c-1 20.2-6 40-17 57.2 9.5-4.5 18.8-10.3 27.8-15.3l21 13.1c1.2-.5 2-.7 2.8-1.6-9.6-14.2-12.6-34.8-16.8-53.4-1.6 1.2-4.7 1.7-4.7 1.7-.2 6.5-6.9 8.6-8.3.2l-4.8-1.9ZM27 153.7c-2.2.1-3.9 5.7 2.5 6.5 4.4.7 10.2-1.6 13-.5 3.3 5.3 6.3-2.5 1.9-3.8-4.8-1.4-14.4 2.2-15.5-.9-.6-1-1.2-1.4-1.9-1.3Zm38.1 87.5-12.6 22.5 81-.5-10.6-21.5c.1-.2-35.4 4.3-57.8-.5Z" id="path3450-5-0-3" fill="#E2CF00"/>
            <path d="m84 26.6 1.5 3c19-3 34-3.2 53.5 1l1.9-3.1a139.7 139.7 0 0 0-57-.9Zm17.2 44.5 16.4 11 11.4-7.8-2-3c-7.2 15.4-19.3 2.9-23.8-4.5l-2 4.3Zm44.4 5.9c1.1 0 1.8.4 2.3 1.6.7 1.4.9 1 .5-.6-.6-2.6 2.2-4.3 4.7-2.5 1.9 1.3 1.8 4.3-.3 4.8-1.7.5-1.7 1-.2.9 2.6-.1 3.2 3.4 1.3 5-2.1 2-4.8.6-5-1.9-.1-.7-.3-.7-.5-.3a6.8 6.8 0 0 0-.7 4l-3.8-2.5c1.4-.7 2.2-1 3.2-2l.3-.4-1.3.1c-2.3.2-4-1.3-3.5-3.5.4-1.9 1.4-2.7 3-2.7Zm-17.9 60.7c4.3-4.8 9.5-7.8 16.8-7.3 1.2-20.2 8.4-38.1 19.8-54.2L152 68.6l-5 3a111.6 111.6 0 0 0-19.4 66.1ZM36.5 89l-12.3 9.2-.6 55.8 1 .4c.1.1 0-.8.5-1.3.4-.3 1-.7 1.4-.8 1-.4 1.1-1.1.2-1.8-.8-.5-1-1.2-1-2.4.1-1 0-1.1-.3-1.7a3 3 0 0 1 0-2.6c.1-.5.1-.6-.2-1.2a3 3 0 0 1-.1-2.5l.2-1.7c0-2.2 1.8-3.7 5.2-4 1.3-.2 1.4-.3.8-1.4-3.3-6.3 4.3-9.5 5-8.5l.2-35.5Zm104.7 4.7c3 0 5.6 2.5 5.6 5.7 0 3-2.5 5.6-5.6 5.6a5.7 5.7 0 0 1-5.6-5.6c0-3.2 2.5-5.7 5.6-5.7Zm0 1a4.5 4.5 0 0 0 0 9 4.5 4.5 0 0 0 0-9Zm.1 1.4a3 3 0 0 1 3 3.1 3 3 0 0 1-3 3.1 3 3 0 0 1-3-3 3 3 0 0 1 3-3.2Zm-111.7.7c.3 0 .5 0 .8.2 1.4.4 1.8 1.7 1 2.8-.6 1-.5 1 .6.7.8-.3 1.2-.2 1.8.4 2 2-1 5.2-2.9 3.2-.9-1-1-.7-.3 1l.5 1.4h-2.8l.7-1.7c.5-1.3.5-1.5-.5-.7-2.3 1.8-4.9-1.3-2.7-3.3.4-.4 1-.5 2 0 .7.2.8 0 .3-.6a2 2 0 0 1 1.5-3.4Zm57.7 5.9c-1.2 7.4-.4 18-.5 23.6 3 .6 3 2.7 3.4 5.3 1.5-.5 4.7 1.7 5.1 1.5.5-7.6-3.1-29.7-8-30.4Zm50 8.2c4.3.4 3.4 3.8 2.1 5.1-.6.7-.5 1 .2.6 1.8-1 3.2-.2 3.8 1.7 1 3.2-3.3 6-5.2 3-.6-1-1-.7-.9.3.1 1 1 3 1 3l-4.2-.4s1.4-2.1 1.6-2.7c.5-1.2.2-1.5-.7-.6-2.6 2.4-6.2-.7-4.5-4 .9-1.5 2.4-2 4-.7 1.2.8 1.4.4.4-.5-1.8-1.7-.1-5 2.4-4.8Zm-107.7 1h.2l1 .4c1.1.6 1.4 1.8.7 2.8-.4.6-.3 1 .2.6.6-.5 1.9-.1 2.4.7 1.2 2-1.3 4.7-3 3-.6-.8-1-.9-.8-.4.2 1 .8 2.6.8 2.6h-3l.9-2.5c0-.7-.2-.6-.9.2-.7.7-1.3.8-2.2.2-2-1.4-.3-5 1.9-3.8.7.4.9.2.3-.6-1-1.4 0-3 1.5-3.1Zm151.3 1c-4.8 4.9-3.3 2-1.2 5.7 0 2.5 1.4 4.5.2 8.4-.3.7-.4 1-.2 1.8-.4 4.4-3.8 4.2-7.2 4.9.6 0 5.2 8.8-3.6 9.4l-.4 35.7 14-10 .7-55.9h-2.3ZM77 130.3c-4 2.5-9.6 8.7-16.5 7.3a98.4 98.4 0 0 1-19.2 54.1c3.5 2.2 7.4 4.8 11 6.5 3.2-1.6 5-2.2 8-4.7 12.7-19.2 17-40.3 16.7-63.2Zm32.4 4.5a61 61 0 0 0 8 31.2l.7-24.4c-2-.5-3.8-2-4.3-5.8l-4.4-1ZM66.7 141l4 .1-1.4 2.8c-.5 1.2-.2 1.5.7.6 1.2-1 3-1.1 4-.1 2.6 2.6-.2 6.9-3.3 5-1.3-.9-1.5-.6-.5.6 2 2-.1 4.6-2.5 4.6-1.8 0-2.8-1.4-3-3 0-1 .5-1.9 1.3-2.3.9-.5.3-.9-.7-.4-3 1.7-5-2.6-2.7-5 1.3-1.4 2.8-1.3 4 0 1 1 1.4 1 1.1-.1-.2-1.3-1-2.8-1-2.8Zm106.5 4.9h2.8l-.9 2.1c-.2.8 0 .9.7.2 2-1.3 4 0 3.6 2.1-.3 1.4-1.6 2.1-3 1.5-1.1-.6-.8-.3 0 .5.7 1 .5 2.2-.6 3-2 1.3-4.5-1-3.2-3 .8-1.2.5-1-.2-.5-1 .8-2.6-.3-2.6-1.8-.1-2.2 2-3.3 3.6-1.8.7.6.8.6.5-.3-.3-.7-.3-1.4-.7-2Zm-.1 15.6h3s0 .2-.6 1c-.5 1-.4 2.1.1 1.4 1-1.2 3-.8 3.6.7.8 1.7-.7 3.6-2.3 2.8-1-.4-1-.3-.4.6.6 1 .3 2.2-.7 2.8-2.1 1.3-4.6-1.4-2.8-3 .4-.5.3-.7-.3-.4-2.3 1.2-4-2-2-3.8 1-.7 1.6-.7 3 .3.4.3.5 0 .2-.8a9 9 0 0 0-.8-1.6Zm-110 .2a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6Zm0 1.1a5 5 0 0 0-4.9 5 5 5 0 0 0 5 5 5 5 0 0 0 4.8-5 5 5 0 0 0-4.9-5Zm0 2a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3Zm-7.7 14.4L59 181s-1.7 1.3-2.3 2c-.9.8-.8 1.2.3.8 2.1-.7 4.3.5 4.3 2.7 0 3-3.5 4.4-5.2 2.1-.5-.7-1-1-.9-.4.6 1.4.2 3-.8 3.7-.8.6-2.2.7-3 .3-2.5-1.4-2.5-4.3-.1-5.4 1.2-.6 1.3-1.1 0-.8-2.4.6-3.8-2.5-2-4.5 2-2.2 5-1.7 5.3 1.6 0 .5.4.1.6-.8.3-.6.3-3 .3-3Zm32.1 5.4s-12.7 7-12.3 7.4l2.7 4c6.5-14.3 21.3-2.2 23.6 5.1l1.2.5 1.1-5.6-16.3-11.4ZM66 237.2l-2 2.9c-.7.3 31.4 6.2 56.8 1l-1.7-3.4c-20.7 5-53.4-.2-53-.5Z" id="path3446-6-3-4" fill="#D40000" transform="rotate(-.8 103.4 133.7)"/>
            <path d="m23.6 1.3-3.8 263.1 163.3 2.4 3.8-263.1L23.6 1.3Zm49 2.7 81.9 1L139 30.8c.1-1.4-29.4-6-53.7-1.3L72.5 4ZM25.8 4l44.6.6L85 32s.8 1.7.3 3.5c-.6 1.9-1.1 2.8-1.6 3.7 0-.5-4.4-1.2-4 2.6.2 2.6 3.4 4.1 5.8 2.1.4 0 .4.4.3 1-.3 1.5-1.9 6.1-3 6.4-5.3-4.5-7.3 3.6-3.7 5.3 2 1 5.3.2 6.9-2.3 1.2-2 1-1.6 1.4.7 0 1 .3 2 .4 2.4.2 1.4 0 1.7-2.5 2.3-2 .8-3.9 1.2-5.9 1.6-3.6.5-5.5 3.2-5.7 6.6l-.1 1.3a170.6 170.6 0 0 0-49.2 27.5L26 4Zm101.4 66c-.6-1-2.4-6-2.9-8-1.2-10.1-1.2-22.1-2.5-31.6l1.8.3s.7 2.7 1.4 10l.8 14.8c.4 5.2 2.6 13.5 4 15.6 2.3 3.5 7 1.3 5.6-2.7-.8-2.2-4-1.9-3.6.3 0 .4.3-.3.8-.7 1.4-.5 2.9 1 2 2.7-1 2.2-4 1.2-4.9-1.6-1-3.4 2.9-5.8 5.8-3.7 3.3 2.3 3.2 8 .5 9.8-4.5 1.5-7.4-1.8-8.8-5.1Zm10.9 4.4c-.2 0 0-.4.2-1.3 1-3 .4-5.4-1.5-7.8-1.1-1.2-1.5-1.5-1-1.7 1.3-.5 4 1.6 4.7 3.5.7 2 .9 4-.2 6-.7.5-1.9 1.5-2.2 1.3Zm3.4-2 .3-2c.3-2.2-.7-4.4-2.5-6.1-1.4-1.5-1.6-1.6-.1-1.6 3.6 0 5.8 5.9 4 8.8-.4.4-1.7 1.4-1.7 1Zm3-2c1.2-5-3.6-8.4-3.7-8.2.3-1.2 2.2-.5 2.9 0 2.4 1.7 3.7 6 2.2 8.4l-.7.7c-.5.3-.8.5-.9.3l.3-1.1Zm-42.1-16.9c.5-.5.6-.5 1.6-.1 3 1.2 5.5-1 4.8-3.3-.3-.8-1.4-1.8-2.1-1.9-1.1 0-1.2.5 0 1 1.6.6 1.7 2.2.3 3-1.5 1-4-1.8-6-1.6-.8.3-1.4 1.1-1 2.2.5.7 1.8 1.2 2.4.7Zm-3.4-.4c-1-.5-1.5-.5-1.2-1.6l1.8-7.9c1.6-6 .2-9.2-4.1-10.6-3-1-5.5-.6-8.5 1l-.5-1.7c12.6-3.1 34-2 34-2 .4 1.8.5 3.5.7 5.2 0 0-4-2-6.1-2.7-3.2-1.1-8.4 0-9.3 1.8-.5 1-.3 1.8 2 .6 3.5-1.9 10.8-.3 13.3 1.8.6.5.5.6.5 1.1 0 .9.1 1-1 .3-6.1-3.3-11.3-3-13.2 1.1l-2-.4 1.7 2.6.3 2.6s2.7 1.6 4.2 2.3c1.5.7.7 0-1.2-1.4-1.3-1-.2-1.2.7-.8 1.8.4 4.5 1 7.6-1 1-.6 3.2 0 3.3.3l.4 7.2.5 6.5c.5 3.7.6 4-1.3 2.1L120 58c-.3 1.1 2.5 3.2 3.2 3.9 1 1 1.7 3.7 1.3 3.9-.2.1-2.9-2.3-5-4.4l-2-1.8c-.4.3 1.3 2.4 3 3.9 2 1.8 2.1 2 1.5 2.2-1.3.5-2.3-.1-5.3-2.6-.2-.3-1.4-1-1.4-1-.3.3 2.4 3 3 3.2 1.2.4 1.5 1.6.6 2-.6.3-2.9-1-4.7-2.6-.3-.3-1.2-.8-1.2-.7-.4.2 1.6 2 3.5 3.2 1.9 1.2 2.2 1.5 1.7 2.4-.5 1-4.6-1.4-6.6-3.7l-.7-.6c.8 2.5 3.8 4.4 6 5.2.4 0 1 .3 1.2.5.6.5.5 1-.2 1.3-2.4.6-6-2.3-8.7-5.4-.3-.1 0 .3 0 .4 2.2 3.6 6.4 6.4 9 6 1.4-.3 2.6.1 2.6.6s-.8 1.1-2.4 1.2c-3.7.2-9.3-3.9-12.5-9-.1-.2-.3-.3-.3-.2 0 1.1 2 3.8 3.5 5.3 4.7 4.6 9.1 6.2 12.6 3.7 2-1.5 4-4.8 1-6-1.5-.6-2.5 1.6-1.2 1 1.8-.2 2.1.7 1.9 1.6-.5 1.5-2 1.7-3.1 1-2.1-1.1-1.6-5 1.1-5.7 2.4-.5 4.5 1.6 4.8 3.6.4 3-3.1 6.3-5.9 7-9.4 2.8-16.5-10.5-16.5-10.8-.5-.9-1-1.4-1.4-.3-.4 1.5-2.6 6-3.7 6 .3-1.6 1.9-4.3 1.5-6.7-.6 2-2 6-4.6 8.2-.6.6-2.5 1.3-1.2-.2 1.6-2.3 3.8-5.3 3.4-8.3-.5.7-.7 2.3-1.2 3.4-1.3 2.7-4 6-5.7 6.4-1.3.4-1.2 0 .2-1.4 1.4-1.5 4-5.9 3.8-7.8 0-.8-2.7 7.3-7.5 9.4-1.3.5-2-.1-2-.1 2-1.1 7.1-6.2 6.7-12l-.7 2.1c-1.8 5.6-5.6 9.2-8.6 9.5-2.3.2-4-.8-3.3-1.2 3 0 5.5-1 7.5-4s2.8-7.8 1.7-13c-1-4.6-1.2-8.8-1.5-13.3 3.3 1.2 6.6 2 9.9.8-.3 1.3-.9 1.4-1.8 2.4-.6.8-.4 1 2-.7.8-.5 1-1 1.2-.8.2.2-.2 1.6-1 4.3-1 4-.8 4.4 3.1 6 .7.3 1 .6 1.2.9.2.1.8 1.3.8 1.3.2.1.2-1.1.1-1.5a3 3 0 0 0-1-1.7c-.8-.8-2-.8-2.6-1.2Zm72.7 54.4.1-4.2 4 3v1.4l-4.1-.2Zm-7 .8 1-78.5 4.7-3c1 3 .9 9.7.5 12.7-.7 2-1 10.6-.5 15 .6 3.5.4 9.2-.2 12-.2 1-.1 6.1.2 10.8.2 3.6 0 6.9-.4 8.7-.3 1.5-.3 6.8 0 8.8.6 3 .6 12.5.3 13-.7.8-6 .8-5.6.5Zm7.4-82 4.6 3.2v3.4l-4.5-3.1-.1-3.5ZM125 31l2 .2c.6 4 1 8.7 1.2 13.4 0 7.2.7 14.8 2.3 19.8l-1.4 1.5c-2.4-5.8-2.5-14.7-3-20.8 0-6.9-1-14-1.1-14Zm47.5 0 4.2 3v3.7l-4.2-3V31Zm-44.7.4 1.7.2c.4 4.8 1.2 8.1 1.4 13.5.3 7 1.4 12.6 2 18l-1.2.4c-.9.4-2.2-6-2.6-19-.2-3.9-.8-8.3-1.3-13.1Zm2.6.2 2 .4c.7 12.3 2 23.8 3.4 30.5H134c-2-9.4-2-20.4-3.6-31Zm3 .5 1.8.3c1.9 28.1 3.3 27.8 3.7 29l-2 .7c-2.1-8-2.4-19.5-3.6-30Zm8 27.7c-.3 1-1 .8-1.9 1-.8-2.7-1.3-5.8-1.7-8.8-.8-6.6-1-12.8-1.8-19.4l2.3.3c-.1 0 1.2 23 3.2 26.9ZM93.6 34.4c3 .2 5.4 1.5 5.6 3.5 0 .4-.3.2-.7 0a8.8 8.8 0 0 0-8.9-1.5c-.8.2-1.4.7-1.7.6-.3-.2-.4-.7-.2-1 .8-1.4 4.4-1.7 6-1.6Zm-7 3.8c.1 3.1-.7 4.8-2.3 5.5-2 .8-4.4-1-3.2-3.1 1-1.6 2.5-1 2.8.6l2.6-5.5.2 2.5Zm90.2.8v3.2l-4.6-3.1.4-3 4.2 3ZM96 37.4c2.2 1 3 2 3 2.6 0 .3-.3 0-2-.8a7.8 7.8 0 0 0-8.6 0c-.7.1-.8-.3 0-1a7.8 7.8 0 0 1 7.6-.8Zm17-.3c2 0 4.3.5 6.3 1.5.9.5 1.7.8 2.2 1.3.5.3.5 1.3.2 1.4-.3 0-.8-.2-1.5-.8-4.7-3.1-8.1-2.8-11-1 0 .2-.5.3-.7.3-.5 0-.6-.3-.3-.6a6.8 6.8 0 0 1 4.8-2.1Zm59.1 3 4.6 3.4v3.1l-4.9-3.4.3-3Zm-82.3.2h.6c1.5 3.8 3.5 1.9 4.3.4l.8.1c-1.3 5-6.4 2.4-5.7-.5Zm-1.2.5c.8 0 .7 1 1 1.6.5 1.4-1.5.1-1.9-.2-.5-.6.3-1.4 1-1.4Zm22.6.1c2 3 3 1.3 4.2 0l.6.2c-.2 2.2-3.9 4.4-5.5-.1h.7Zm6 .5c.3 0 .7.1 1 .3 1.1.5 1 .8-.1 1.3-2 .8-2.6 1-2-.3.3-.5.5-1.3 1.1-1.3Zm-7.4.3c.4.4.7.8.8 1.4 0 .5-1.5 0-1.4-.8 0-.4.3-.8.6-.6Zm-13.2 0c1 .4.8.8.1 1.3-1.2.6-1.7.5-1-.6.5-.5.5-.7.9-.7Zm75.2 2.7 4.9 3.6-.1 3.2-5-3.5c-.1-1.4.1-2.3.2-3.3Zm-85.5 3.7c.2 0 .3.8.4 2 0 1.9-2 4.5-3.9 5.4-2.3 1-4.8-.5-4.4-2.8.5-2.1 3.4-2.2 3.5-.2-.3.5.1 1 .3.9.7-.2 2.6-1.8 3.3-3.6.3-.7.5-1.5.7-1.6h.1Zm85.3.7 4.9 3.7v3.2l-5-3.5v-3.4Zm-60 4.2c-.4.6-.1 1.7.7.8 2-2.3 4.8.6 3.2 2.4-1.4 1.7-3 1.1-6.6-.3-2.7-1-3-.7-3.7 0-.6.6-.3 1.8.4 1.8l6.1 1.5c4.6 1 7.6-5 3.4-7.2-1-.6-3.2 0-3.5 1Zm-20.5.4c-1.9 1.6-.4 5.9 2.2 6.3.6.1 1.4.1 2.4-.2 1.8-.5 4-1.6 4-2.2.4-3-4-.4-4.5 0-1.4.8-2.9.7-3.6-.3-1.6-2.3 1.4-4.9 3.1-2 .5.6.3-.6-.1-1.4-.7-1.1-2.5-1-3.5-.2Zm80.7.2 4.6 3.4v3l-4.5-3.3v-3Zm.3 4.5 4.4 3.3v3.2l-4.6-3.1.2-3.4Zm-24.7 1.5c4 .1 6 6 4 8.3-.7.7-1.2.9-1.4.6v-1.4c.2-2.3-.2-4-2-5.7-1.2-1.4-1.6-1.8-.6-1.8Zm-47.6.2c-.7.3-1.5.8-2 .7-.7-.2-1 .1-1.2.6-.9 1.8-.6 2.3 1.1 1.3.9-.4 1.2-.2 3.4.2 1.6.3 2.7.3 4 0 1.8-.5 2.9-.5 3.7 0 .9.5 1.5 1.2 1.5.7 0-.7-.6-2.3-.7-2.9 0-.2-.5 0-1 0-1.4.1-3-1.2-4.2-.6-.9.6-1 .7-2.2 0-1-.6-1.6-.2-2.4 0Zm46.6 1.1c2.6 2.3 3.2 4.2 3 5.8-.2 1.2-.3 2.5-1.5 3.2a3 3 0 0 1-.8.2c1-3.3 0-6.3-3.7-9.6 1-.5 2.2-.3 3 .4Zm-59-.9.3.1c.5.2.5 1.4.2 1.7-.4.4-.7 0-1-.9-.4-.5 0-.9.5-.9Zm-2.5 1c1 0 1.3.8 1.5 1.5.1.6 0 2.4-.6 1.8 0-.4-.6-1.6-1-2-1-.7-.8-1.4.1-1.4Zm-2.7.8h.6c1.5.3 2.6 2.7 2.2 4-.8 1.5-1 .5-1.3-.8l-1.2-1.9c-.8-.9-.9-1.3-.3-1.3Zm89.7.6 4.5 3.4v3.5l-4.7-3.3.2-3.6Zm-92.6 0c2.2 0 4 2.8 3.3 5.3-.9 2.6-5.2 2-4.5-.7.3-.7 1-1.3 1.8-.8 1.1.7 1-.4.3-.8-1-.6-2.5-.3-2.9 1-1.2 4.2 4.2 5.8 7.3 1.4 1-1.6 2.3-3.3 3-4 .5-.7.7-.6.6.2-.5 4-3.3 9-8.5 8.6-5-.6-6.4-6-2.6-9.3.7-.5 1.4-.8 2.2-.8Zm26.5.7c-1.8.9-3.5 1.2-5.3.3-1.3-.6-1.3 0-.7.6 1.6 1.5 4.7.9 6 0 .4-.2.6-1 0-1Zm70.6 7.4v3.2l-5-3.5c-.2-.8 0-2 .1-3.2l4.9 3.5Zm-5 1 4.8 3.3.1 3.1-4.6-3-.2-3.4Zm.3 4.4 4.6 3.3v3.5l-4.5-3.1v-3.7ZM59.2 78l-3 8.6 2 .1 1.1 2.3 1.3-2.3 2-.1-3.4-8.6ZM172 80.7l4.4 3.2V87l-4.6-3.3.2-3Zm-.3 4 4.5 3.3v3.4l-5-3.5.5-3.3Zm-102 .3-2.9 9.2 1.6-.2 1.4 2.5 1.6-2.2 1.4.1-3-9.4Zm-21 .4-2.8 9.1h1.8L49 97l1.3-2.2h2l-3.8-9.3ZM171 89l5.3 3.9v3.6l-5.2-3.6-.1-3.9Zm5.1 8.6v3.2l-4.4-3.3-.4-3.5 4.8 3.6Zm-95.4-.8-3.4 9.3h2.1l1.3 2.3 1.1-2.3h1.8l-3-9.3ZM172 99l4.1 3v3.1l-4.1-2.8V99Zm-79.7 36.5L90 133c0-.2 2-1.1 3.1-.5 1.6.9 2.4 3.8.6 5.3-1.5 1.2-3.6.2-3.7 0l2.3-2.4Zm-2-3.9c0-3.5-1.8-4.5-3.3-5.2V103l-.3-2.6h-.4l-.2 25.8c-2.9.3-3.7 2.3-4 5-2.3-.3-3.7 1-3.8 1.3-.8-1.2-.1-2.9-.8-4-2 7 1.7 11.2 5.1 10.8.5 6.8 7.8 8.1 7.7 0 8.9-.5 6-8.8 0-7.8Zm-41.5-29-3.3 9.1 2.2-.2.8 1.7c3.7-3.2 5.5 1.8 3.7-2.5l-3.4-8Zm122.3 18c.4 0 1 .4 1 1 .1 1.5-2 1.1-2 .2 0-.7.6-1 1-1.1Zm1.2 10.1c.9-.7 2.3-.3 2.3.8 0 1-1.1 1.3-2 .8-.6-.5-.7-1.2-.3-1.6Zm0 2.7c5 .5 8.6-2.8 7-5.2 1.4-1.6.3-2.6.7-3.5 1-1 .2-3.4 0-3.4-.2-3-1-3.5-2.4-5.1-.4-.5 1-1 1.5-1.8-1.6.4-2.4-.4-3.2-1.4-9 .2-17 .8-17 13-1.3 5.2.8 10 7.1 8.6 1.4-1.2.5-3 .4-4-.5-2.3.1-3.8.3-5 .6-3.4 3.1-6.5 3.3-1.1.5-.7.2-.8 1-1 1.7-.7 1.7 1 1.3 1.8-.2.4-.6.3-1 .3s-1-.3-1-.5c-.2.6.8 1.6.7 2.2-.1.5-.2.4.2 0 2.2-1.4 3.5 2 .4 1.6 1.5.9-.8 3.3.8 4.5Zm-2.8-18.8c1.7 0 2 0 2 .9.3 1.6.7 2.4 2.8 2.3 2.2-.3 2.9-.4.7.9-1.1.5-1.5.5-2.8.4-1.3-.1-1.2-.3-2 .2l-1.2.6c-.5 0-1.4.3-1.4.3a9.9 9.9 0 0 1-2.4 5c-1.5 1.7-2.3 2-.4 2 .6 0 .3-.4.6 2.4 0 1 .2 2.1.3 2.5.5 1.3.6 2-1.3 2-4.5.3-5.5-4.2-4.9-6.5l.4-2.5v-1.4c.1-4.3 1.1-5.4 4.9-8.1 1.1-.8 3.2-1 4.7-1Zm4 .3c2 0 4 1 3 1.7-.6.4-3 .2-3.6-.3-.9-.6-.5-1.4.5-1.4ZM80 117.2l-.9 1.4c.4 3.3.4 5-.8 8.3l1.7 2.3 1.4-2.3h2l-3.4-9.7Zm98 .7c1.3.3 1.3 1.6 1 2.3-.8 1.7-6 2.4-6 2.4 0-.7.2-1.4-.3-2.2 0 0 3.3-.8 4-1.5.6-.4.9-1 1.2-1Zm.9 3.9c.5 0 .7.4.8 1 .1.5 0 .8-.4 1.2-1.3 1.4-5 2.4-6.2 2-.1-.1.1-1.6.2-2.3 1.8 0 4.7-1.4 5.6-2Zm-51.8 8c-1.7-2.6-5.5-2.3-5.1-2.1 0-2.2-.3-5.2-3.5-5.5-3.3-.3-5 4-3.8 5.9-2-.9-5 1.2-5 1.4-.3 0-2.7 6.1 4.3 6.5.6 3 1.6 4.4 3.9 5.6l-.3 23.8.7 1.1.5-25c3.6 0 4-4.2 3.8-5.1 1.6 0 3-.2 4.3-1.1l.3 4s.9-1.4.7-2.2a111 111 0 0 1 18.8-64.7c.6-.7.8-1.5 1-1.5l4.5-2.4c4.3 2.2 12.2 7.5 12.2 7.5l-.4 33.3a98 98 0 0 1 14.5-1s-1.3-.6-1.3-1.5L178 29l-6.5-4.3s-5.4 3.4-6.9 4.6l-.5 45.8-11.4-7 .3-2c-.1-6.3-3.1-8.5-9-6.7-.7.2-1.3.4-1.7.1-2.3-7.2-3.1-26.2-3.1-26.2l16.7-27.7 27.8.3-1 106.8.1 56-14.3 10.3.3-36s-2-1-2.5-1c-.2 0-.5.4-.1.7l1.8.8-.2 35.6-8 5.1a185 185 0 0 1-14 7l-15.2 6c-.8-3-9.6-10-19.6-5.2-1 .3-2 .6-2.8 1-3.8.7-5.1 4.8-5.8 8.8l.3.1s1-3.8 1.4-4.5c.7-1.6 1.6-2.5 2.1-2.6.3 0 .4.3.1.8a17 17 0 0 0-1.3 4.5v1.8l1.4-4c1-2.7 1.6-3.8 2.6-4.4 1-.6 1.2-.5 1 .1-1.5 2.9-2.1 5-2.4 8.1-.1.6.2.7.5-.3.8-3.3 2-7.6 4.6-8.9 1.1-.5 1.6-.4 1.5 0-3.2 3.8-4 8.2-4 9.6 0 .5.2.4.6-.6 1.1-3.9 2.7-7.2 4.6-8.8.7-.6 1.6-.7 2.3-.8 2.2-.3 2.3.6.3 1.6-2.1 1.3-4.7 5.9-5 9.4-.2 1.2.3 1.3.6-.3 1.4-6.9 7.3-11.4 12-9.2 2.1 1 2.5 2.3.6 1.7-3.7-1.2-7.9 1.4-9.6 5-1.6 3.4-1.6 5.2-.6 9.7.7 4.2 2 9.6 1.5 13.6-.5.8-2.1-.3-4-.6a7.1 7.1 0 0 0-3.8.1c-1 .4-1.7.5-1.9 0 0-.2.9-1.1 1.3-1.6.6-.8.2-1-.6 0-.5.3-1.4 1.3-1.7 1.4-.5 0-.5-.6 0-2.2 1.6-6.2 1.2-6.3-1.5-7.6-2.7-1-1.8-1.6-3-2.6-.8.7 1 3.7 3.2 4.4 1.8.6 1.6 1.5.8 4-.9 3.4-2.3 8-1.6 11 1.6 6.5 8 6.4 13 3.9l.6 1.6c-4.2 1.7-26.3 2.8-33.8 1.9a21 21 0 0 1-.7-5s4.5 2.2 6.8 2.6c2.9.5 7.3.5 8.5-2.1.3-.8 0-1.5-1-1-1.8.8-5 1.4-7.5 1.2-2-.2-5-1-6.4-1.9-.6-.4-1-1.1-.6-2 .4-.1 1 .4 1.3.5 3.8 2 5.9 2.4 8.4 1.7 1.9-.5 4.4-2.5 3.8-3.1-.6.2-2.8 2-4.2 2.3-3 .8-6.2-.5-9.3-2.6-1-.8-.5-1.4.7-.7 4.6 2.4 6.5 4 11 .7 1-.7 1.6-.6 2.2-.1 2.3 2 2.3 1 .6-1.3-.4-.5-.7-1.2-1-2 0-.5-.1-1-.4-1.4-.5-.6-1.5-.9-2.6-1.4-1.5-.7-2-.4-.9.2 2 1 3 2.1.5 1.5-2.3-1-6-.6-8.3 1-1.7.7-2.4 1.6-2.8-.3-.8-4 .1-9.2-.9-16-.2-1.4-.4-2.2-.2-2.4.4-.2 1.2.6 2.3 2.2.5.7 1.4 2 1.4 1.7 0-1.4-2.1-4.2-4-5.3-1-.6-1.6-3.3-.5-2.7 1 .5 5.5 4.7 6.4 6.2.4.6.8.2.3-.6a18 18 0 0 0-2.3-3c-2-1.9-2.1-1.8-1.8-2.2.8-.7 2.3.3 5 2.8.7 1 1.6 1.8 1.5 1.3.3-.7-2.4-3.7-4-4.5-.3-.2-.4-.4-.3-.8.1-1.4 3.2.7 5.8 3.2 1 .9.2-.8-1-2-.8-1-2.2-2-3.2-2.5-1-.4-1-1.2-.2-1.6 2.6 0 5.3 2.7 6.8 4.8.5.6.9 1 .4 0a9.9 9.9 0 0 0-6.6-5.7c-1.8-.3-1.7-2 0-1.7 1.7.2 4.7 1.9 7.1 4.5.7.7 2 2.4 1.7 1.4a15 15 0 0 0-8.5-6.9c-1.2-.3-4.7.3-4.7-.3 0-.4.4-.7 1.5-1 4.3-1.4 10.6 2.4 14 8.2.2.4.7.6.7.5-1.6-4.7-6.7-9-10.8-9.8-2.8-.5-5.7.1-7 2-1.6 2.2-1 5 1.2 4.9 1.2-.1 1.1-.8 1.1-.8 0-.1-.8.2-1.2.1-1.5-.3-1.3-3.2 1-2.9 2.6.4 2.9 4.6 0 5.4-2.8.8-3.8-.5-4.5-2-1-2.1.2-5.6 2.1-7 5.4-3.6 12.1-.4 15.9 3.4 1.9 1.9 3.2 4 4 6.5.3.5.7.5.5-.1-5.2-14-21.2-15.8-23.7-5-3.8-6.3-7.2-6.8-12.4-4.2-5.4 2.2-8 4-13 6.2l-11-6.2c-.5-11.2 0-22.4.2-33.6 0-.2-2.4.2-6.5.8-10.9 2-9.8-3.9-11.3-4.2-.7-.1-.7.2-.6-20.4a10488.9 10488.9 0 0 0 .2-36.2l1.4-1.1 10-7.4 1.7-1.1c.5 12.4-.3 25.4-.1 36h.4l.4-35.7c-1-.3 23-14 36-18.3.3-.1 1 .2 1 .2 7.3 9.3 27 6.8 28.7-4.4 3.2 6.9 17.3 20.4 24 4.4 0 0 2.4 4.7 4.4 5 4.6.7 5.1 0 15.2-4.8a110.9 110.9 0 0 0-19.5 58.6Zm-6-4.6c.2.8.3 1.8 0 2.6-.2.6-.7.6-.7.6l-2.2-2-2.2 2s-1.3-1.3-.6-3.2c1.5-2.6 4.7-2 5.7 0Zm57.6.6c1.4-.1.6 1.5-1.5 2.6-1.3.7-2.4 1-2.9.6-.2-.7 0-1.4.2-1.8l4.2-1.4Zm-92.2 1.7c1.6 0 3 1.2 3 3.2 0 .8-.5 1.6-.5 1.6l-2.6-2-2 2.2c-.4 0-1.6-1.5-.7-3.2a3.2 3.2 0 0 1 2.8-1.8Zm38.3 1.5c2.2 1 2.5 4.2.3 5.4-1 .6-2.6.9-3.4-.3l2.3-2.4-2.5-2.2c-.1 0 2-1.1 3.3-.5Zm53.4 0c.4 0 .5.1.6.5.3 1-.5 2-1.9 2.4-1.2.3-1.1.4-1.7-.7-.5-1-.6-1 .2-1.2l2.8-1Zm-63.3.6-2.3 2.3 2.3 2.5c.1.3-2.8 1.6-4.2-.4-1-1.3-.4-3.7 1-4.5 1.4-.9 3.4-.1 3.2.1Zm3.4-.2c1.4 0 2.5 1.1 2.5 2.5 0 1.5-1.1 2.6-2.5 2.6a2.6 2.6 0 0 1-2.6-2.6c0-1.4 1.2-2.5 2.6-2.5Zm-34.8 3.8-2.3 2.4 2.4 2.7s-2 .3-2.7.2c-3.3-.7-3-4.7-.3-5.7a3 3 0 0 1 2.9.4Zm-44.8.1s.4 5.2.8 6.9c-.3 2-1.6 3.3-2.2 5.4-.4.9-1.5 2-1.7.8-.8-1.6 0-3.6-.7-4.7-.5-1-.2-1.7-.4-2.8-.6-.9-1-1.3-.8-2.1-.1-3.6-1-3-2.6-2.6-6.2.4-6.2 4-5.9 8.5-1 4.3.7 3.3.6 4 0 1.3 0 3 .5 3.2 2.1 2.5 2.2 4.3 5 4 4.9.4 12.6-.3 14.3-6.2 1.2-8.3 1.6-16.3-6.9-14.4Zm48 0c1.4 0 2.5 1 2.5 2.4s-1 2.5-2.4 2.5a2.5 2.5 0 0 1-2.5-2.5c0-1.4 1.1-2.5 2.5-2.5Zm-45.9.6c1 0 2 .2 2.9 1 1.8 1.9 1.9 3.6 1 10.6-.3 2-1 3.7-2 4.4a16.6 16.6 0 0 1-6 2.8c-1 .3-1.8.3-2.5.2-.7 0-1.1-.3-1.2-1 .2-1.6-1.4-1.8-2.4-1.7-1.7 0-1.9.2-.8-.6 1.2-1 4-.9 4.6-.3 1-1.1 2.2-1.2 3.6-1.4-.2-.3-.6-1.5-.3-2.3.7-1.3 2-3.5 3.3-4.4 1.3-1.6.2-.9-.6-.9-.4 0-.4-.1-.5-.4-.3-1.3-.7-3.8-.7-5.2 0-.7.7-.9 1.6-.8Zm-8.1 1.6c.5.5.5 1.1 0 1.6-.7.5-1.8.2-1.9-.8.1-1 1.3-1.3 1.9-.8Zm85.6 4.8c-2 .1-3.7-2.1-3-4.3.5-.6.7-.6.7-.6l2.3 2.2 2.3-2.3c1.8 2.2.2 4.9-2.3 5Zm-88.1-4.7c-.2.6 0 1.3 0 1.6-.4.3-2.1.8-3 1.2-.7.2-1.2-.4-1-1 .2-1 1.7-1.6 2.8-2 .4 0 1 0 1.2.2Zm.3 3c.7 0 .4 1.3.2 2-.2.5-1 .5-1.5.5-1.1 0-2.5 1.3-3.1 1-.2 0-.4-.5-.4-.9.2-1.8 3.2-2.4 4.8-2.6Zm3.3 2c-.2.3-.9.4-1.4.2-1-.2-1-1.6-.3-2 1.5-.5 2.3.9 1.7 1.8Zm91-1.7-1.2 1.9-1.9-.1 3 9.5 1.4-3.7.7-5-2-2.6Zm-40.3.2 2.4 2 2-2.1c1.6 3.5-.2 5-2.1 5-2.1 0-4.3-2.1-2.3-5ZM31 141.9c.8-.2.4 2 .3 2-.5.2-2.6.4-3.5 1.2-2 1.4-2.7.5-1.8-1.3.8-1 3.9-2 5-2Zm2.4.1c.9 0 1.4 1 .9 1.8-.7.6-2 .1-2-.8 0-.6.6-1 1.1-1Zm-1.3 5.3c0 .5 0 .4-1 .6l-2 .9c-1.2.6-1.6.9-2 .8-.3 0-.7-.2-.8-.6-.4-1.3.7-2.7 3.3-3.6a10 10 0 0 1 1.8-.4c.9 0 0 1.4.7 2.3Zm1.5-2c1.2 0 1.5 1.7.5 2-2.1.5-2-2-.5-2Zm-1.6 6c.3.4.4 1 0 1.2-.7.4-3.4 0-3.5-.7 0-.5 1-.7 1.8-.7.9 0 1.4 0 1.7.3Zm123.4 2.7-2.3 3 3 7.7 2.8-9.2-2.1.8-1.4-2.3ZM28 160c.1 23.5-.7 77.4-.7 77.4l6.5 4.7 7.1-5 .4-44.4 10.2 5.9s.3.4.2 2.5c-.8 5.9 4.8 9.8 8.5 7.5 1.5-.6 1.6-.7 2-.2.7 1.3 1.6 6.7 1.7 10.1.2 5.2 1.4 15.8 1.7 15.9l-17 28.1-26.4-.4 1.5-105.7c1.3 1.7 2 2.7 4.3 3.6Zm96.6-.8-1.2 1.9h-1.6l2.6 9.8 3.3-9.6-1.8-.2-1.3-2Zm-84.5 77.2-4.3 3c-.6.2-.8.2-1-.3l.4-3.9c.3-1.8.3-2 0-4.6-.3-2.8-.3-3 0-6.6.3-4 .5-8 .2-10.5-.3-2.4-.2-7.7 0-10.7a38 38 0 0 0 0-9.5c-.9-4.7-1-6.3 0-9.8.3-1.4.5-2 .4-4.3 0-2.5 0-3.3-.8-8.8-.5-3.1-.5-3.6 0-8.5.1-1 .2-1.7.6-2 .4-.4 5-.6 5-.6l-.5 77.1Zm-11-76.3h5c-.4 1.6-.5 2.8-.6 4l-4.4-3v-1Zm0 2 4.4 3v3.7l-4.4-3.1V162Zm0 4.7 4.6 3.3c.2 1.3.6 2.6.7 3.7l-5.3-3.7v-3.3Zm153.1 3.5-1 94.1-47.2-.7-14.6-29.2s.2-2.6.6-4c.5-1.6.6-2 1.2-2 1.7.9 3.6-.3 4.2-1.5.7-1.6-.7-4-2.9-4.6-1-.2-2 .2-3 1-.7.5-.8.6-1 .1-.2-1 .7-3.8 2.4-6.1.9-1.4 1.1-1.7 1.4-1.2 1.2 2 3.7 1.6 4.6.5 1.2-1.4 1-4.6-1.6-5.4-5-1.8-7.5 3.4-7.4 3.4l-1-6.3c6.1-1.4 9.7-1.9 11.7-3.7 1.5-1.5 2.3-4 2.2-6.3 0 0 17.2-6.8 25.2-11 13.9-7.3 26.2-17 26.2-17Zm-26 .3-1.3 2.2h-1.8l3.5 9.5 3-9.8-1.8.1-1.6-2Zm-127 .9 5.4 3.8c0 1.3.2 2.3 0 3.7l-5.6-3.9.2-3.6Zm106 .4-1.4 1.7-1.6-.1 3 9.4c.9-2.7 1.8-6.4 2.7-9h-1.4l-1.4-2ZM29 176.3l5.6 3.8c0 1.2 0 2.3-.4 3l-5.2-3.4v-3.4Zm116.6 2.2-1.4 2.7-1.9-.3 3.2 9 3.6-8.8H147l-1.3-2.6ZM29 180.7l4.8 3.6c0 .1-.3 1.7-.2 2.6l-4.6-3v-3.2Zm0 4.4 4.5 3.2c0 1.2.1 2.4.3 3.4l-5-3.3.2-3.3Zm-.1 4.6 5.2 3.8.2 3-5.5-3.5.1-3.3Zm43.2 1.9c5 2 9.6 11.7 9.3 24.2-.2 8.7 2.2 21.1 2.1 21 0 0-1.4.2-1.8-.2A81.9 81.9 0 0 1 79 218c-.2-4.6-.4-9.2-.7-10.3-.7-3.7-1.6-8-3.9-11-1.8-2.1-4-2.5-5.2-.2-1 2 1 5.3 2.9 4.2.4-.2.7-.6.1-.6-1.9.2-3-2.4-1.9-3.6 2.1-2.2 5.7 2.8 4 5.4-.8 1.2-2.7 1.4-4.3.9a6.8 6.8 0 0 1-3-8.6c.9-2 2.8-3.3 5-2.5Zm-6.1 1.1c.4 0 .1.8-.3 2-1 2.8.7 7.3 3 8.2.7.5.6.7.2 1-1.6.8-4.3-1.9-5-4.7-.4-2.1-.3-4.6.7-5.6l1.3-.9ZM28.8 194l5.5 3.7c.3 1.2.1 2.4 0 3.7l-5.6-4v-3.4Zm33.8.4c.4 0 .3.7.1 2-.3 3 .6 5.1 2.7 7 .8.7 1 1 .7 1.4-.6.5-2-.3-3.3-1.5-2.2-2.4-2.8-6.8-1-8.4.3-.3.6-.5.8-.5Zm62.4 1.4c2.4 0 4.4 1 4.6 4 .2 4.2-3.8 6.5-6.6 4-2.4-2.5.2-6.4 3-4.5 1.5 1-.3 3-1.4 2-.6-.6-.8-.3-.4.3 1 1.7 3.3.3 3.2-1.2-.3-3-3.9-3-5.3-1.8-1.9 1.5-3.5 3.9-4.8 5.6-1 1.4-1.2 1.4-1-.4.4-4.9 5-7.9 8.7-8Zm-65.3 0c.4 0 .2.6.2 2 .1 3.7 1.6 6 3.6 7.3.6.7-.2 1.2-1.5.8-2.7-.9-5.5-7-3-9.5.3-.4.5-.6.7-.6ZM57 197c.4 0 .1.8.2 2.3 0 3.2 1 4.8 3.3 6.8.8.6.8.5.5.9-.8 1-3.5-.5-4.6-2.4-1.4-2.3-1.6-5.8-.2-7 .3-.4.6-.6.8-.6Zm-2.7 1.5c.3 0 .1.6.1 2 .1 3.3.8 5 3 6.6 1.3 1 1.6.7 1.2 1-.8.7-2.7.1-4.1-1.1-2.2-2-2.7-6.5-1-8 .4-.4.6-.5.8-.5Zm-25.5.1 5.3 3.8-.2 3.2-5.3-3.7.2-3.3Zm94.1 7.3c-2.2-.4-3-2-2.7-3.9.1-.6.5-.9.8-.1.4 1.3 1.2 3 2.3 3.4.4.1 0 .7-.4.6Zm-47-4.4c2.3 6.3 2.2 13.2 2.5 19.7.4 8.6 1.8 14.4 2.3 15.4 0 0-2.4 0-2.5-.3 0 0-2.1-11.5-1.7-17.2 0-6.3-1-11.9-1.8-14.4-.7-2.2-.8-.7 1.1-3.2Zm-47.2 1.8 5.1 3.5v3.5l-5.1-3.7v-3.3Zm69.7.7c0 .2.8.4 2 0 1.2-.2 2.5-.1 3.5.2 1 .3 1.2 0 .2-.5-.4-.2-1.2-.7-2.3-.7-1 0-3.4.6-3.4 1Zm21 .2.9 1.2c.6.7.8.8.5 1-.7.8-2.2-.3-2.3-1.7-.1-1 .4-1.6 1-.5Zm-46.4-.4c2.4 3.5 2.6 11.6 2.6 17.5 0 5.2 1.6 14.8 1.7 14.7-.5.3-1.2.2-1.8 0-.6-.9-1-3.2-1.6-9.4-.2-1.6-.4-6.7-.5-10.8 0-3.6-1.9-11.5-1.9-11.5s.8-.5 1.5-.5Zm-2.7.8a39 39 0 0 1 2.4 16c0 5.6 1.2 12.2 1.6 15.2-.7 0-1.5 0-1.8-.3-.2-.2-.4-.7-.5-1.2-.9-5-1-10.3-1.3-14.8-.3-7-.4-8.7-1.3-12.2-.5-2-.7-2-.3-2.3.3-.3 1-.4 1.2-.4ZM95 206c0 2.3.3 1.4 1.1 1 .6 0 1.1.3 2.3.7 1.4.6 1.3.8 2.3.3.6-.3 1.1-.4 1.4-.2 1.2 1 2.7.5 3.6-.3.7-.3 1.4-.1 2 0 .8 0 .6-.5.7-1.5.1-1-.3-1-1.2-.7-1 .3-2 .3-2.8 0-2.1-.7-3.7-.3-4.8-.1-2.5.3-2.7 0-3.2-.3l-1.4-.8c-.3 0-.2.9 0 1.9Zm22.4-.7c.3-.2.4.2.7.6.6.8.7 1.1.3 1.2-1.3.1-1.6 0-1.5-.8 0-.6.1-.8.5-1Zm-49.8.3c1.8 2 2 12.3 2.3 14.6.4 12.1 1.6 13.9 1 14.8-.7 0-1 .2-1.4-.4-1.5-4.5-1.4-9-1.5-13.7-.3-6.1-.9-9.5-1.7-12.5-.5-2-.5-2.1.5-2.6l.8-.2Zm-2.5 1.5c.6 1.4 1.8 8.2 2 14 0 4.5 1 13.5 1.1 13.6-.6 0-1.4-.1-1.7-.6-1.9-8.9-1.1-17.5-3.3-26.4.1-.4.9-1.1 1.9-.6Zm-36.5.5 5.3 4 .1 3.3-5.4-4v-3.3Zm80 .8c-3.1 1.1-4 2-3.5 3 .4.7 1.6.4 4.9-.9 2.4-1 3.2-.5 3.6 1 0 2.3-2.2 2.5-3.4 2.2-.5 0-.5 0 0 .7 2.6 2 5.7-1.8 4.2-4.2-1.2-2.3-3.2-3-5.9-1.8Zm-19.1.6c-2.6 2-1.7 5.5.4 6.1a2 2 0 0 0 1.7 0c.4-.2.4-.6-.3-.7-2-.4-3-1.8-2-3.2.9-1.4 2.6-1.1 5.8.3 2.8 1.3 4 1 4.3-.5.2-.7 0-1.3-1.3-1.4-3.7-.2-6.2-2.5-8.6-.6Zm33.4 6c-.2-1-1.8 0-3 1.8-1 1.7-1.2 2-1.4.1-.2-2.7 2.6-4.9 4.4-5 2.2-.1 3.6 1.1 3.6 2.5 0 2.7-3.2 2.7-3.6.6Zm-94.5-3 5.7 4s.1 2 0 3.2l-5.7-3.8V212Zm68.4 2.3c-2.5 1.6-1.1 4.7.6 5.1 1.8.4 2-.9.2-1.3-1-.4-1.2-1.3-.8-2 .8-1.4 2.4-.5 3.4 0 2 1 3 1.4 3.7.7 1.2-1.2.2-3.4-1.3-2.7-.4.2-.8.4-1.6.2-1.4-.3-3-.6-4.2 0Zm-68.4 2.3 5.6 4-.3 3.4-5.2-4v-3.4Zm0 4.7 5.3 3.9v3l-5.3-3.6v-3.3Zm93.2 2.1c4.2.5 2.7 5.4-.2 4-.8-.6-1-.5-1.9 1.6-1.2 2.7-1.4 2.5-1.2-.7.1-3 1.6-4.9 3.3-4.9Zm-33.3.3h.2c.3.4-.6 1.6-1.3 2.4-.5.3-1.8-.6-1.5-1.1a6 6 0 0 1 2.6-1.3Zm5.6 2.6h-.7c-1.1-2.5-3.5-2-4.3.4l-1-.1c1-2.9 4.8-4.6 6-.3Zm21.3.9H114c-1.1-2.7-2.7-3.2-4.1-.5l-1-.3c1.7-3.4 4.6-3.7 6.4.8Zm-6.4-3.3c.7 0 .6.3-.1 1.2-.6.8-.7 1-1.3.5-1-.7.6-1.6 1.4-1.7Zm6 .2h.5c1.3.4 2 1 1.3 1.8-.4.5-.8.7-1.1.4-.9-1.5-1.3-2.3-.6-2.2Zm-19.8.6c.1.5-.3 1-.8.5-.2-.2-.4-.6-.3-.8.3-.3 1 0 1 .3Zm-66.6.9 5.3 4c.2 1.4.2 2.4.2 3.4l-5.5-3.8v-3.6Zm78.9 2.3c3 2.2 6.7 2.3 9 .4.6-.4 1-.4 1 0-.3 1.5-4.3 3.4-7.4 2.2-1.7-.6-3.1-1.2-4.2-2.8-.7-1.1.7-.4 1.6.2Zm-1.4 1c4.5 4.1 8.2 3 11 1.1.4-.1.4.3.4 1 .2.8-.6 1.3-2.6 1.8-3.8 1.1-8.3-.2-9-2.8-.1-.5-.3-1.2.2-1Zm-77.6 1.3 5.4 3.9-.2 2.9-5.3-3.7v-3Zm0 4.5 5.1 3.6v2.4l-5-3.7-.1-2.3Zm37.6 1.6c22 5.4 37.8 3.3 53.2.7l13.2 27.2-82-1c5.4-8.8 10-18.3 15.6-26.9Z" id="path3444-9-5-7" fill="#131F67" transform="rotate(-.8 103.3 134)"/>
            <path d="M69.6 3.6c2.3 4.1 4.2 8.3 6.3 12.5l.4.3.5 1v.4l1.3 2v.5l5.3 10c4.5-1.6 40.8-4.6 54.2.3l2-3.4h.4l3.5-6v-.6l1-1.3.3-.6 3.8-6v-1l4.7-8-83.7-.1Zm82.1 1.2s-2.4 4.8-3.7 6.7c-1-.8-4-.2-3.9 3-4.9-2-6 4-2.3 5.3-2 1.7-3.8-.2-5.2-1.5-1.5.3-4.5 1.4-6.2-1.7l1.4.8c4 1.2 4.4-4.3 1.4-5.2l-1-.1c1-4.2-5.5-5.7-5.6-.6h-1.4c-3.4.6-2.6 5.7.9 5.4h.9c0 .9-4.3 2.4-7.3-.4-1.5 1.1-3.7 2.5-6.7-.2 2-.1 3.8-.7 3.8-2.9 0-1.5-1.3-2.8-3.2-2.8-.1-1.7-1.3-3.2-2.9-3.3-1.9 0-2.8 1.6-2.8 3.3-1.7.1-3.2 1.6-2.8 3.2.4 2.3 2.2 2.6 4.1 2.1-2.4 4-6.2 1.9-7.4.7-1.5 1.3-4 3.1-7 .6 1.6-.3 3.4-1.2 3.1-3.5-.2-1.8-2.2-2.4-3.1-2.3 0-1.2-1-3.2-3-3-2.3.3-2.2 3.2-2.2 3.2-1.9-.1-3.3 2.1-2.7 3.6.6 1.8 2 2.3 4.6 1.8-3 2.8-4.9 1.7-6.5 1.2-1.4 1.5-3.4 2-5.3.6 4.4.2 3.7-7.6-1.5-4.8-3.7-4.4-3.7-2.4-7-8.9l80.5-.3Zm-40.9 7.7.7.1c.6.4.8 1 .4 2-.2.2-.4.6-.4 1 4.9 9 15.5 5 16.5.7.1-.2 0-.5-.2-.8-.4-.7-.3-1.3.2-1.7 1.2-1 2.8.1 2.1 1.5-.1.4-.3.7-.2 1.2 2.7 6.3 8.2 6.8 12.8 4.3-2.1 3.8-10.3 6.1-13.7-3-5.5 7.4-14.2 7.3-18.2-1.1-3.5 8.6-14.2 8.8-18.1 1.6-3.5 8.2-11.8 6.4-14 1.2 7.5 5.6 12.6-.2 13.5-2.7l-.4-.5c-1-1-1-2.1 0-2.6 1.3-.6 2.5.7 1.9 2-.2.3-.4.3-.3.6 2.4 5.6 14.1 7.3 16.5-.6 0-.4 0-.8-.2-1.2-.5-1 .2-2 1.1-2Zm-34.2 3.1c1.9.2 1.4 1.8 1 1.9l-1-1.9Zm68.6 1-1.1 2.1c-.7-1-.5-2.2 1.1-2ZM139 27s-1.2 2.6-1.6 2.8c-21.9-5.6-52.4-.7-53.2-.2L83 27.1c19.2-3.9 38.3-3 56-.1ZM102 66c-2.1 8.2-7.2 9-13.4 10-7.6 1.3-12.6-1.5-15-5.8 0 0-10.9 4.2-14.9 6.6a66.6 66.6 0 0 1 25.5 22c2.2 3 2.1 2.2 2.1 8.7v19.2c3.5.5 3.6 2.9 3.5 5.6 2.7-1.3 5.4.2 5.3 2.9 0 4.8-4.7 3.5-5.6 3 1.5 4.2-.3 6-2.1 6.1-2.3.3-4.9-.8-4.1-5.7-2.5 1-5.6-.7-6-3.7l-.1-5c6-11.4-1.6-20.8-8.7-23.9 0 0 2-4.2 4.6-5.4.3 0-1.6-2.8-4.7-2.2-1.4 0-1 0-2.4-1.8-2.7-3.5-4-3.7-6.5 0-1.2 1.7-1.5 1.7-2.8 1.8-1.5 0-3.8 1-4.3 2-.1.3.5.5 1.3 1.4 1 1.3 2.8 3.1 2.5 5-5.9 2.4-15.6 13-5.4 26.6h-7.4l-.3-48.3-5.2 3 .2 37.8-1.4-.5c0-12-.1-24.2-.5-36.2l-13.6 10 .6 56.8 1.4.3c1.1 7.7 16.3 2.3 17.2 3L42 191l-.7 1.5 12.1 6.7 11-5.8s1.6-.3 2.1-.6c4.6-2.4 8-1.9 10.6 1.7l1.8 2.6c1-6.4 6.5-8.8 12-7.1 4 1.2 9.4 5.2 11.1 10.2 0 0 .3.7.6 1l.2.1-.3-1c-5.6-13-21.5-15-23.9-4.4l-2.2-3.2 11.7-7.2 16.1 10.6s-.7 3.8-.8 5.4l.3.2c0-2 .7-4.3 1.6-6 .4-.6.8-1.2 1.3-1.6 1-.5 1.8-.5 2.8-1.4l-2.3-1.8v-5.7l4.6 6.7c1.5-.3 7.3-2 10.7-.2.4.2 5.5-1.3 8.6 5.8l15-6.3 1-.7c-15-5.6-30.2-25.4-28.7-25.8v-7c.2-5.5.1-11.2.2-16.8-5.1-1.7-3.8-5.8-3.8-5.8-3.1.7-3.6 0-4.4-.5l-.5-5.3c1.8-1.5 3-1.7 5.2-1.2 0 0-1-2.3 0-4.2.8-1.4 3-2.4 4.8-1.3 2.3 1.6 1.6 5 1.3 5.4 2.4-1.1 5.3.1 6 2.5.4-7.1 1-15.1 2.5-21.3 2.6-11.3 6.9-23 12.2-32.3l3-4.5 1.2-2.2s-1.2.7-2.4 1l-3.2 1.1c-1.3 1.1-3 2-4.4 2.5-4.8 2-8-.9-10-5.2-1.2 5.5-6.1 10.1-13.5 7.2-4.1-2.2-5.4-3.6-9.3-9.4A5.7 5.7 0 0 0 102 66Zm.2.9c2.7 5.5 6.8 9.4 10.8 11a10 10 0 0 0 13.2-6.6l1.4 2.4-10.8 7.7-16.3-10.4 1.7-4.1Zm49 .4-4.8 2.9-4.3 7.2a111.5 111.5 0 0 0-14.6 59.6l.4.4-1 2a12 12 0 0 0-1.4 6.5 17.3 17.3 0 0 0 10.2 15.4s-1 2.5-2.6 4.3c-1.2 1.2-1.4 1.3-1 1.9.6.8 2.4 1.5 4.6 1.5.8 0 .8 0 2.2 1.6 2.9 3.1 3.8 3 6.3-.5.8-1 1.3-1.3 2.4-1.3 1.6 0 4.7-1.4 4.7-2-2-1-4.4-5.7-4-5.7 11.1-6 13.5-18.4 5.3-27.5h7.8l.3 49.2 5-3.2-.2-38.4c.6.1 1.1.5 2.2.7l.3 36.5s10-7 14.7-10.8l-.2-56h-1.2l.2 56-13.2 9.7-.1-34.7 1.4-.2c3.9-.6 5.7-5.6 3.1-8.8-.9-1.2-.2-1 1.7-1.5 3.4-.3 5.3-2.9 4.3-4.8-.4-.8.2-.7.5-1.4.3-.6.2-1.4.1-2-.1-.7.2-1 .4-1.6.3-.8 0-1.6-.5-2.4-.5-.7-.4-1.5-.4-2 0-1.2-.4-1.3-1.6-2.4-1-.9-.2-1 1.1-1.7 2.1-1.1 2.3-5-.5-6.6-1.5-.9-4.2-.8-10 .1-2.3.4-4.9.6-4.9.6l-.1-33.1-12.6-7.5Zm0 .8s12 7 11.8 7.2a99 99 0 0 0-19 54c-10.9-1.4-15.3 7.2-15.9 7.2A109 109 0 0 1 146.5 71l4.7-2.7Zm-7.5 4.2v.8l-2.3 3.6-.1-3.6 2.4-.8Zm-3.6 1.3.1 5.7-4.8 3.7-.3-6 5-3.4ZM95.4 75l2.5 1.7v5.7L94 75.5l1.3-.5Zm67.8 1.9v4a93.6 93.6 0 0 0-16 48.7l-2.3-.1a93.2 93.2 0 0 1 18.3-52.6Zm-64.3.4 5.8 3.9-.2 6.4-5.4-3.4-.4-1.3.2-5.6Zm35.5.3v6l-4.6 3.4-.2-6 4.8-3.4Zm-55 1.6c.7 0 1.3.5 1.4 1.4.5 4 3.5 2.8 4.2 4 .3.5-.3.8-2.4.6C78.8 85 76 82 78 79.8c.5-.4 1-.6 1.5-.6Zm26.2 2.5 5 3.3v6.6l-5-3v-6.9Zm22.9 0 .3 6-5.4 3.6-.2-5.8 5.3-3.7Zm10.4 0-3.2 6.8-18.3 13.4-15.3-10-2.8-6.5L117.1 97l21.8-15.3Zm-49.5 2.8c4.8-.1 8.6 5.1 9.9 9.7.9 3 1 4.1 1.1 9 .1 4.8.3 5.7 1.2 6.4.6.4.7.3.8-.6.2-1.9 2.4-.7 2.5 1.3 0 2.3-2.4 3-4.3 1.3-1-1-1-1-1.2.9-.2 1.2-1.6 8.8 2 10.6.6.1.8-.4.3-1-1-1.3 1-2.8 2.6-2 2 1 1.8 4.2-.3 5.3-2.4 1.3-5.6-.1-7-3.3-1-2.3-1-5.5 0-10.3a31.2 31.2 0 0 0 1-6.6c0-.5-.2-.5-1 0-2.4 1.1-5 .3-5.6-2-.8-2.5 2.1-5.3 4-3.6.6.6.5 1.3-.3 1.7-1.4.7-1 2.5.6 2.1 5-1.5.4-15.4-5.1-16.4-3.7-.6-6.6 3.6-4 5.9 1.1.8 2.2.4 2-.9-.4-1.7 2-1.5 2.8.2 1.3 3-2.2 5.3-5.6 3.7-6-3.6-1.9-11.3 3.6-11.4Zm22 1 5 3.4v6.5l-4.8-3-.1-6.8Zm11 .6v6l-4.8 3.5v-6.4l4.7-3Zm12.7 4-2.4 6.8-15.3 10.6-12.7-8-2.2-6.4 15 9.8L135 90Zm-99.5.4v34.6c-5 .2-7.8 5.2-4 9.9l-1.5.2c-3.4.4-5.6 2.2-5.2 4.4.2.7 0 1.4-.1 1.7-.3.9-.3 1.6.1 2.3.3.6.3.9.1 1.3-.4 1-.3 1.8.2 2.5.5.5.4 1 .3 1.9 0 1.2.1 1.7 1 2.2.9.6 1.3 1.6.1 1.5-.5 0-2.5 2-2.5 2l-.2-55.6 11.7-8.9Zm27 4.5c.8 0 1.8 1.1 3 3 .9 1.4.9 1.2 2.7 1.1 1.9.1 3 .6 3.5 1.2.2.2-.3.3-1.5 1.5s-1.4 1.7-2.2 3.1c-.3.5-1 .6-1.2.1-.3-.4.4-1.6 1.5-3 1.6-1.6 1.3-1.7-1-1.5-1.7.2-2 .1-2.5-1-2-3.7-3-3.6-4.7.2-.5 1-.3 1-2.5.8-1.6-.1-2 .3-1.1 1.2 1.5 1.2 2 4.1 2 4l-1.2.2-.5-1a11 11 0 0 0-2-3.1c-1.3-1.4-.6-2.2 2.3-2.5 1.5-.2 1.6-.2 2.3-1.3 1.3-1.9 2.2-3 3-3Zm69.5 3.4-1.6 6-13.1 9.2-10.7-7.2-1.4-5.5 12.2 7.8 14.6-10.3Zm-45 4.7s3.7 7.4 5 12.2a85.6 85.6 0 0 1 2.5 17.1c-1-1.3-4-1-4-1 .2-1.4-1-4.3-3.6-4.8V103Zm43 2.7-1.4 5.8-11.1 8.1-9.2-6.3-1.2-5.6 10.2 6.8 12.6-8.8Zm-64.8.3 1.4.5.3 10.5 11.2 1.9.2 1.8-12.9-2.1-.2-12.6Zm-5.7.3.4 12.2c-.2 0-9.3 1.3-12.8 2.3l.2-1.7s6.3-1.4 11-2v-10.4l1.2-.4Zm103.7 2.3s1.5.1 4.8-.4c8.3-1.5 10.6-1 11.7 1.7 1.1 4-3.3 4.1-4 1.5-.5-1.6-2.3-1.2-8.3.2-5.2 1.2-8.4.2-8.3-2.7 0-3 3.4-3.3 4.1-.3Zm-68.7-2.2c1 0 1.9.8 1.9 1.8s-.8 2-1.9 2c-1 0-1.9-.9-1.9-1.9 0-1 .8-1.9 1.9-2Zm-27.2.3 1.3.4.3 8 8.8 1.7.3 1.6c-2.5-.6-10.5-1.9-10.5-1.9-.2-3.4-.2-9.8-.2-9.8Zm-9.6.2-.1 9.7-10.2 1.8.2-1.2 8.7-2v-7.9l1.4-.4Zm4.8 1.3a1.5 1.5 0 0 1 0 3c-.8 0-1.4-.6-1.5-1.4 0-.9.7-1.6 1.5-1.6Zm113.2 4c.9 1.4 1.7 1.3 2.6 1.2-.2 0-1.3.7-1.3 1 0 0-.4 1.8.3 1.9 2.8.2 1.4 3.1 1.7 3.6.8.8 1.3 1.4.8 2.5-.5 1-1.1.9-.6 1.7 1.1 1.7-.4 2-.3 3.2.1.7.3 1.6.1 2.1-.8 1.7-3.4 2.6-6.4 2.7-.5 0-.1-.7-.3-1.1-.8-.5-.4-1.3-.1-1.8.2-.7.2-.7-.2-1-1.3-.8-1.2-1.2-1.1-1.8.2-1.7 0-1.9-.5-2.1-.7-.3-.6-1-.3-2 .2-.6 0-.8-.2-1.3l-.3-.8c.1-.9-.7-.9-1.8 0-.9 1.6-1.2 3.7-1.8 5-.4 1-.5 2.2 0 4.5 1 3.7.3 4.3-3.8 3.5-3-.8-3.9-4-3-8v-1.8c-.3-2.8.4-5.4 2.3-7.2 3.2-3 4.7-3.5 11.3-3 2.6 0 2.8.3 2.8.3v-1.3Zm-47.4.8-.8 5.6-6.1 4.4c-3-2.3-5.2-1.5-7.2 1-1.7-.9-5-3.1-5-3.1l-.7-6.4 9 6.3 10.8-7.8Zm-65.6 1.4c.8 0 1.5.6 1.5 1.5a1.5 1.5 0 0 1-3 0c0-.8.6-1.5 1.5-1.5Zm64.6 5.7-.4 5.4-2.2 1.7-2.2-.2-.5-3.4 5.3-3.5Zm-64.7 0a1.5 1.5 0 0 1 0 3c-.8.1-1.4-.6-1.5-1.4 0-.8.7-1.5 1.5-1.5Zm6 .2c1 0 1.6.7 1.6 1.5 0 .9-.7 1.5-1.5 1.6-.8 0-1.5-.7-1.5-1.5 0-.9.6-1.6 1.5-1.6Zm-12 .3c.9 0 1.6.7 1.6 1.5s-.7 1.5-1.5 1.5a1.5 1.5 0 0 1 0-3Zm111.9.3c.4 0 1 .6.7 1.5-.4 1-.1 1.5.6 2.3.6.8.5.9.4 1.4-.2 3 1.8 1.7 1 4-.2.5 0 1.2.1 1.8-.2-.5-3.8-.5-4.2 0-.5 0-1.1-3.5-.6-4l.6 1c.5.8.6.8.5-.2-.6-3.9-.3-7.8.9-7.8Zm-93.8.2c.9 0 1.6.7 1.6 1.5 0 .9-.7 1.5-1.5 1.6-.8 0-1.5-.7-1.5-1.5 0-.9.6-1.6 1.4-1.6Zm-24.3.3c.8 0 1.5.7 1.5 1.5a1.5 1.5 0 1 1-3 0c0-.8.7-1.5 1.5-1.5Zm59 .4 4.5 3c0 1 0 2.3.2 2.7-3-.3-4.4 1.4-4.4 1.4l-.3-7Zm-32.1 4.8-.4 1.6a56 56 0 0 0-28.3 0l-.7-1.6c9.6-3 19.7-3 29.4 0Zm-42-.1c1.2 0 2.5.4 3.5 1.5 1.7 2 .9 5.6-1.6 6.8-3.7 1.7-7.5-2-6-5.8.7-1.6 2.4-2.5 4-2.5Zm91.4.4v1.6l-1.1-1 1.1-.6Zm-23.5.1a3 3 0 0 1 3 3 3 3 0 0 1-2.9 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3Zm-67.9.1c-.4 0-1 .2-1.4.4-.7.8 0 .8 1 1 2 .3 2.4 2 2.3 3.7-.2 1.6.3 1.5.8 1 1.7-2.4.2-6-2.7-6.1Zm85.7.8h-.1Zm-58.4 1c2.2-.1 2.5 3.5.5 7.6-.6 1.3-.9 1.1-1.5-.7-1.6-4.6-1.3-7 1-7Zm5.1 0c.5 0 .9.2 1.2.6 1.2 1.3.3 3.5-2.9 7-.7.8-1.1 1-1.4 1.1-.8 0-.8-.1 0-3l1-3.3c.2-1.4 1.2-2.3 2.1-2.4Zm-8 3.3a33.6 33.6 0 0 0 1.3 4.7c-.2.5-1.7-.2-2.7-1.4-2-2.4-2.8-4.5-2.4-5.6.6-.9 2.2-1.3 3-.5.7.8.8 2.5.9 2.8Zm14-2.4c2.2 1.3-.3 4.2-5 6.6-2.1 1-2 .6-.4-1.4.6-.8 1.4-2 1.7-2.9.9-1.7 1.8-3.4 3.7-2.3Zm-21.3 0c.7 0 1.4.8 2.6 2.7l2.1 2.6c.6.6 1 1.3 1 1.4-.2 1.3-6.9-2.9-7.4-4.6-.1-1.1.7-2 1.7-2Zm95.4 3.9c1.2 2.5 1.3 4 .3 4.6-1.4.8-3.2-.4-3.3-2.2 0-.6-.6-2.7-1.1-4-.5-1.1-.6-1.8-.2-1.9 1.5.2 3.7 2.3 4.3 3.5Zm-8-2c-.4 1.5-1 3.7-1 4.4 0 .2 0 .8-.3 1.2-1.2 2.5-4 .4-3-2.2 1-2.4 3.4-5 4.3-5 .7 0 0 1.5 0 1.7Zm2-1.3c.5 0 .9 1 1.5 2.8.8 2.4.8 4.3-.1 5.1-2 1.7-4-.8-3.2-3.9.6-2.5 1.2-4 1.8-4Zm-65.2.5c2.4 35.9-15.8 63.5-17.1 64.3l-6.2 3.4-11-6A94.7 94.7 0 0 0 61 138.4c10.5 1 15.8-7.4 15.7-7.4Zm59.8 0c.8-.1.2.5-.5 1.6-.8 1.2-1.9 4.4-2.7 5-1.8.8-4-1-2.8-2.4a15 15 0 0 1 6-4.1Zm11 .3c.4 0 1 .2 1.7.6 3.9 2 5.8 4.4 4.2 5.6-1.2.9-2.5.2-3.6-2l-1.6-2.5c-.9-1.1-1-1.7-.6-1.7Zm21.9 1.3c2.5 0 4.5 2 4.6 4.5a4.5 4.5 0 1 1-9 .1c-.1-2.5 1.9-4.6 4.4-4.6Zm-1.4 1.2c-3 1.3-2 6 .5 6.6 1 .3 2.4-.1 1.8-.7-3.3-1-3.3-3.5-2-5.3.2-.3 0-.7-.3-.6Zm-122 6.4c-.2 2.6.4 5.6-.9 8.5-1.8 4.4-7.9 6.4-11.1 6-.7-.3-1.5-.6-2.1-.3-.4.2-1 .2-1.4 0-.4-.2-.8 0-1.2-.1-.4-.3-1.2-1-1.1-1.6.1-.8 0-1.3-.8-1.6-1.2-.3-1.5-1-1.1-3 0-.4.1-.6-.1-.7-1-.6-1.3-1.8-.7-3 .4-.6.7-1.1 0-1.7-.3-.6-.2-.8.4-1.6.6-.8.7-.9.3-1.5-.9-1.5.1-2.5 1.4-3.1 1.6-.7 3-1 4.7-1.3.7 0 .6.6 1 1.2.6.9-.2 2.2.3 2.6.6.3 1 1 .9 1.5 0 1.2 0 1.6.4 2.2.3.5.5 1.6.1 2.3-.3.6-.2.6.2 1 .4.3.6 2.2.4 2.2l1.7-.2c-.2.2.6-3.5 2.5-6.3 0-2.2-1-4.3-.8-7.2 4.1-1.5 7 2 7 5.7Zm64.2-5c.6.4 3.6 1.3 3.7 1.2 0 1.4.8 4.2 3.9 5.1V164c-4.3-7.3-7-16.7-7.6-28.8Zm-72 .6.3 1.6c.3 2 0 2.4-.6 1-.6-1.8-.7-.4 0 3.4.2 1 .2 1.2 0 1.8l-.6 2c-.6 2.1-1 2.7-1.5 1-.3-.8-.6-1-.3-1.6.2-.9.2-1.5-.4-2.3 0-.1-.3-.4-.3-1.3.2-2-.7-2-.9-2.5 0-.7-.3-2.6.2-2.5.5 0 2 0 2.7-.2l1.4-.4Zm64.2.3a3 3 0 0 1 3 2.8 3 3 0 0 1-3 3 3 3 0 0 1 0-5.8Zm-44.7 1.7 2.2.5c.4.1 0 30.7-17.5 52.7l-.1-5a89.3 89.3 0 0 0 15.4-48.2Zm37.2.7.4 7.3c-1.2-1-4.4-3-4.4-3.1V140s2.8.2 4-1.5Zm-17 0c.6.3 1 .8 1.5 1.2l-1.4 1v-2.1Zm50.4.5a54.4 54.4 0 0 0 28 .6l.7 1.8c-10 2.8-20 2.6-30-.6l1.3-1.8Zm-46 1.3.6 3.2-5.4 3.5.3-4.8 2.8-1.8h1.8Zm47.4 2.6c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.5 1.6-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.5 1.5-1.6Zm24.4.2c.8 0 1.6.7 1.6 1.5 0 .9-.7 1.6-1.6 1.6-.8 0-1.5-.7-1.6-1.5 0-.9.7-1.6 1.6-1.6Zm-45.6 4.9c.7 2.5.5 8.1-.4 12-.3 1-.4 5.2-.4 5.2-.2.2 5.3-4.7 7.1 1.7.6 2.2-1.9 4.2-3.5 3.6-.3 0-.2-1.2 0-1.8 1-2-1.6-2.9-3.1-1.2-3.5 3.9 0 13.7 5.5 14.7 4.5.8 8.1-3.8 5.1-6.5-1.3-1.2-3.4.5-2.4 2 1 1.6-1 2.2-2.4.7-2.5-2.6.4-6.5 4.1-5.6 6 1.4 4.8 11-1.5 11.5a9.8 9.8 0 0 1-10.2-5.5c-1.9-3.6-2-6.5-1.1-12.9.5-3.8 0-7-1-7-.6 0-1 .4-1 1-.3 1.4-.4 1.7-1.3 1.2-1-.7-1.7-2.7.1-4.1 1.8-1.4 4.2.8 4 1.2.1-.1.3-.5.6-2 .8-5.3-1-11-3.2-10-.5.2-.4.4.2.7 1.5.9.2 3-1.7 2.8-2.5-.3-3.1-4-.9-5.6 3.7-2 6.6 1.1 7.4 3.9Zm-17.8-4.4s4.6 2.8 4.9 3.6l.3 4.5-8-5-11.4 7 1-5.5 6-4c.1.3 4.3 3.1 7.2-.6Zm57.3.3c.8 0 1.5.7 1.6 1.5 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.5 0-.9.7-1.6 1.6-1.6Zm-12.2 0c.8 0 1.5.7 1.6 1.5 0 1-.7 1.6-1.6 1.7-.9 0-1.6-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6Zm6.1.3a1.6 1.6 0 0 1 0 3.2c-.8 0-1.5-.7-1.5-1.6 0-.8.6-1.5 1.5-1.6Zm-15.4 2.3c4.2.9 8.4 1.8 12.3 2.2l.2 12.3h-1.2l-.1-11a60 60 0 0 1-11-2l-.2-1.5Zm30.9.4-.2 1.4s-7.2 1.3-11 1.8v10.8l-1.4.2v-12.5c4.2-.5 8.5-1 12.6-1.7Zm-69.5.7 8.5 5.6 1 6-9.9-6.6-12.3 8.3 1-5.6 11.7-7.7Zm39 1.1c3.4.7 6.9 1.5 10.3 1.8l.1 9.9-1.6-.4v-8c-2.7-.3-5.5-.8-8.2-1.4l-.6-1.9Zm30.1.3-.2 1.3-8.3 1.4c-.2 0-.2 8.7-.2 8.7l-1.3.2-.2-10.1L157 149Zm-15.2 1.1c.9 0 1.6.7 1.6 1.6 0 .8-.7 1.6-1.6 1.6-.8 0-1.5-.7-1.6-1.6 0-.9.7-1.6 1.6-1.6Zm-54 3.6 10 6.8s1.1 3.5 1.4 5.5l-11.5-7.5-14.4 9.6 1.7-6 12.8-8.4Zm-60.6.2c.6 0 1.2.4 1.5 1.3.5 1.3 1.3 1.7 3.4 1.7 4.2-.3 8.6-2.3 12.5-.8 2 .7 2.6 3.6 1 4.3-1.7.9-2.5.3-3.1-1-.6-.6-1.2-.5-5 .1l-5.2.7c-4.2.3-6.5-1-7-3.5-.4-1.6 1-2.8 2-2.8Zm114.5 2.3c.9 0 1.6.7 1.6 1.5 0 1-.7 1.6-1.5 1.7-1 0-1.6-.7-1.6-1.6 0-.9.6-1.6 1.5-1.6Zm-30.6 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2 2 2 0 0 1-2-2c0-1.1.9-2 2-2Zm-23.3 1.4 12 8 2.1 6.2-14-9.2-17.1 11.2 2-6.2 15-10Zm59.4 1.9c.7 2 2 3.5 3.5 5.1 0 0-.8 1.5-3.6 1.4-1.6 0-1.7.2-2.2 1.3l-2.1 2.7c-1 .7-2.9-.4-4.4-2.8-.6-.8-.8-1-2.5-1-2.6 0-3.6-.7-2.2-1.8 1.2-1.5 2-3 3-4.6l1.2.1c0 .2-.9 3.1-2.2 4.3-.7.8.3 1 2 .7 1-.3 1.3-.2 2 1.5 1.7 3 2.5 3 4.5-.2.6-1.4.6-1.6 2.5-1.2 2 .2 2.6 0 1.7-.7-1.6-1.4-2.5-4.8-2.5-4.8h1.3Zm-59.3 4.1s14.9 9.9 14.8 9.7l3 7-17.5-11.7-21.3 14 3.2-7 17.8-12Zm.6 6.5 5.1 3.4v6.2l-5.3-3.6.2-6Zm-1.4.2.1 6-4.6 2.9-.3-5.8 4.8-3.1Zm-5.9 4v.2h.1l.2 5.5-5.3 3.8v-6.3l5-3.3Zm13.7 0 4.9 3.3.2 6.5-5.3-3.5.2-6.3Zm6 4 5 3.4.1 6.6-5-3.4v-6.6Zm-25.8 0v6l-5 3.5-.2-6.2 5.2-3.3Zm51.4 7.8c-1 1-1.3 1-2.1-.8-.9-1.7-2.2-2.5-4-2.5-2.4 0-.9-1.5 1.6-1.7 4.4-.2 6.5 2.7 4.5 5ZM69 184.6v6l-4.8 2.6-.1-2.9 2.5-4.4 2.4-1.3Zm-6.3 8 .2 1.2-1 .3.8-1.4Zm58.3 43.8a138.9 138.9 0 0 1-54 .3l-6.4 11h-.4l-1.6 2.8.1.4s-5.3 10.3-7.5 13.5l83.6-.4-3.5-7 .2-.3-3.4-7.4-1.2-1.3s-.7-1.3-1.2-2.7c-.4-1.4-2.5-5-2.5-5h-.3l-2-3.9ZM67.7 238c.3.2 26 5.1 52.9 0l1.4 2.5c-23.4 5.5-57.3.3-56-.2l1.7-2.3Zm.4 4.8c2.4 0 4.8 1.2 6.4 3.4a19 19 0 0 1 1.4 2.7s1-2 2.2-2.9a9.8 9.8 0 0 1 7-2.5c2.9.1 6 1.7 9 6.3.7-2.7 10.2-11.6 18-.4 1-3 5.1-9 12-4.8l.9 2.1c-4-2.8-10.7-1-12.2 3.5-.2.5 0 .8.2 1.3 2.1 3-3.3 3-1.7.5.3-.5.3-1-.1-1.7-1.3-1.9-5.1-4.3-7.9-4.2-3.2 0-6.8 2.2-8 4.2-.4.7-.5 1.4-.1 2 .3.7.2 1.2-.3 1.6-1.1 1-2.5-.1-2-1.5.4-.6.3-1.3-.4-2.3-1.4-2-4.8-4.2-7.7-4.2-4.2.1-8.4 3.2-8.2 5.7.2 1-.1 1.5-1 1.4-1.1-.2-1.2-1.2-.5-2 .1-.3.3-1 0-1.5-4.4-6-11-4.2-12.6-2.9 1.5-2.5 3.5-3.7 5.6-3.8Zm-4 4.2c1.8 0 3.5 1.3 4.1 2.3.4-.4 4.2-2.2 6 .4-4.8-.4-4.8 4.7-1.3 5.2-1.6 5 5.6 5.2 5.1.6 5.4.8 4.8-6.1-.3-5.4 2.7-2 4.5-1.3 7.7 1 1-1.5 5.4-2.8 6.5-.3-5-.3-4.2 5.5-.4 5.6a2.8 2.8 0 0 0 5.1-.5c4.7.3 4-6-.5-5.5.4-1.2 5-1.7 7 .5 1.8-1.7 3.8-2.9 7.5-.4-5-.9-5 5.7-.4 5.3-.4 4.4 6.2 4.5 5-.6 5-1.4 2.3-6.8-1.4-5.3 1.7-2 4.5-1 5.6-.6 3.4-4 6.4-.7 6.4-.7-6-.6-4.7 8 1.1 4.9 0 1.7.8 3.2 3.1 3.5l2.8 5.9-79.8.5 4.4-7.8c.5.1 3 .4 3.6-2.6 5.2 1.6 5.5-4.5 1.6-5.5.5-.3 1-.5 1.6-.5Zm-3 2.3c.5.8 0 1.4-.8 1.4l.8-1.4Zm65.7 1 .5 1.2c-.6-.3-.6-.5-.5-1.1Z" id="path3442-2-7-0" fill="#006400"/>
            <path d="M154.9 256.9c9.8-.3 14.1-11.3 6.9-19.8-1-1.3-1.2-2 .8-.8 4.8 3.3 14.2 1.1 14.7-8.8.6-12.3-16.6-15.8-19.8-2.8-.2 1.4-1.3 1.4-1-.6.3-5.3 2-10.3 4.2-15H149c2.2 4.7 3.9 9.7 4.2 15 .3 2-.9 2-1 .6-3.2-13-20.4-9.5-19.8 2.8.5 10 9.8 12 14.7 8.8 2-1.2 1.8-.5.8.8-7.3 8.5-2.9 19.5 6.9 19.8Z" id="path147-0-8-1-3-6-2-4-7" fill="#006400"/>
            <path d="M51.8 11.2c9.8.2 14.2 11.2 7 19.8-1.1 1.2-1.2 2 .7.7 4.9-3.2 14.2-1 14.7 8.9.6 12.3-16.6 15.8-19.8 2.8-.2-1.4-1.3-1.4-1 .6.3 5.3 2 10.2 4.2 15H46c2.3-4.8 4-9.7 4.2-15 .3-2-.8-2-1-.6-3.2 13-20.4 9.5-19.8-2.8.5-10 9.8-12.1 14.7-8.9 2 1.2 1.8.5.8-.7-7.3-8.6-2.9-19.6 6.9-19.8Z" id="path147-0-8-1-0-3-83-7-5-7" fill="#006400"/>
          </g>
        </g>
      </g>
    </svg>
  );
};
