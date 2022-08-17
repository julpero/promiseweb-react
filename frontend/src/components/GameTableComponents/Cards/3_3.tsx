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
      <text className={`noHover ${suite}`} transform="translate(221.000000, 268.000000)" fontSize={30} rotate={180}>{text}</text>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Diamonds" transform="translate(11.000000, 25.000000)" fill="#0000CD">
          <g id="3" transform="translate(1.000000, 9.000000)" >
            <path d="M101.599264,47.9902339 C96.4362212,39.4528124 91.004284,31.1551221 84.2162292,24.0669531 C91.004284,16.9788837 96.4362212,8.68119336 101.599264,0.14367218 C106.762307,8.68119336 112.194145,16.9788837 118.9822,24.0669531 C112.194145,31.1551221 106.762307,39.4528124 101.599264,47.9902339 L101.599264,47.9902339 Z" id="path6584-3"></path>
            <path d="M7.62385496,37.3029049 C5.47260357,33.7457154 3.20925495,30.2883019 0.380940274,27.3348742 C3.20925495,24.3815442 5.47260357,20.9241327 7.62385496,17.3668405 C9.77510635,20.9241327 12.0383554,24.3815442 14.8667696,27.3348742 C12.0383554,30.2883019 9.77510635,33.7457154 7.62385496,37.3029049 L7.62385496,37.3029049 Z" id="path6586-2"></path>
            <path d="M195.575371,228.554227 C193.424119,224.997034 191.160771,221.539622 188.332456,218.586193 C191.160771,215.632864 193.424119,212.175451 195.575371,208.618159 C197.726622,212.175451 199.989871,215.632864 202.818285,218.586193 C199.989871,221.539622 197.726622,224.997034 195.575371,228.554227 L195.575371,228.554227 Z" id="path6590-7"></path>
            <path d="M101.599264,146.883744 C96.4362212,138.346323 91.004284,130.048632 84.2162292,122.960463 C91.004284,115.872394 96.4362212,107.574704 101.599264,99.0371824 C106.762307,107.574704 112.194145,115.872394 118.9822,122.960463 C112.194145,130.048632 106.762307,138.346323 101.599264,146.883744 L101.599264,146.883744 Z" id="path6600-5"></path>
            <path d="M101.599264,245.777264 C96.4362212,237.239843 91.004284,228.942153 84.2162292,221.853984 C91.004284,214.765914 96.4362212,206.468224 101.599264,197.930703 C106.762307,206.468224 112.194145,214.765914 118.9822,221.853984 C112.194145,228.942153 106.762307,237.239843 101.599264,245.777264 L101.599264,245.777264 Z" id="path6606-3"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
