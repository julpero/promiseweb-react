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
            <path d="M7.84775076,37.3029049 C5.69649937,33.7457154 3.43325031,30.2883019 0.604836075,27.3348742 C3.43325031,24.3815442 5.69649937,20.9241327 7.84775076,17.3668405 C9.99900215,20.9241327 12.2623508,24.3815442 15.0906654,27.3348742 C12.2623508,30.2883019 9.99900215,33.7457154 7.84775076,37.3029049 L7.84775076,37.3029049 Z" id="path6654-0"></path>
            <path d="M153.358418,47.9902339 C148.195375,39.4528124 142.763538,31.1551221 135.975483,24.0669531 C142.763538,16.9788837 148.195375,8.68119336 153.358418,0.14367218 C158.521462,8.68119336 163.953399,16.9788837 170.741454,24.0669531 C163.953399,31.1551221 158.521462,39.4528124 153.358418,47.9902339 L153.358418,47.9902339 Z" id="path6656-6"></path>
            <path d="M195.799266,228.554227 C193.648015,224.997034 191.384766,221.539622 188.556352,218.586193 C191.384766,215.632864 193.648015,212.175451 195.799266,208.618159 C197.950518,212.175451 200.213866,215.632864 203.042181,218.586193 C200.213866,221.539622 197.950518,224.997034 195.799266,228.554227 L195.799266,228.554227 Z" id="path6658-8"></path>
            <path d="M50.2879017,47.9902339 C45.1248586,39.4528124 39.693021,31.1551221 32.9049662,24.0669531 C39.693021,16.9788837 45.1248586,8.68119336 50.2879017,0.14367218 C55.4509449,8.68119336 60.882882,16.9788837 67.6709368,24.0669531 C60.882882,31.1551221 55.4509449,39.4528124 50.2879017,47.9902339 L50.2879017,47.9902339 Z" id="path6660-7"></path>
            <path d="M50.2879017,245.782318 C45.1248586,237.244897 39.693021,228.947206 32.9049662,221.859037 C39.693021,214.770968 45.1248586,206.473278 50.2879017,197.935756 C55.4509449,206.473278 60.882882,214.770968 67.6709368,221.859037 C60.882882,228.947206 55.4509449,237.244897 50.2879017,245.782318 L50.2879017,245.782318 Z" id="path6676-4"></path>
            <path d="M153.358418,245.789236 C148.195375,237.251815 142.763538,228.954124 135.975483,221.865955 C142.763538,214.777886 148.195375,206.480195 153.358418,197.942674 C158.521462,206.480195 163.953399,214.777886 170.741454,221.865955 C163.953399,228.954124 158.521462,237.251815 153.358418,245.789236 L153.358418,245.789236 Z" id="path6678-8"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};