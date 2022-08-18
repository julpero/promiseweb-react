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
          <g id="6" transform="translate(0.000000, 10.000000)" >
            <path d="M9.75432847,37.6854661 C9.75432847,37.6854661 7.53955566,34.5058892 4.55194889,30.7675652 C2.55320777,28.2659028 0.955369696,25.5570653 0.806735911,23.2238225 C0.636399404,20.5584953 2.2492701,17.8845458 5.16928184,17.7549417 C8.08759918,17.6254273 9.27208998,19.8100271 9.75432847,21.6111574 C10.2365669,19.8100271 11.4211573,17.6254273 14.3393771,17.7549417 C17.2593888,17.8845458 18.8723591,20.5584953 18.701923,23.2238225 C18.5533888,25.5570653 16.9554512,28.2659028 14.9568096,30.7675652 C11.9691013,34.5058892 9.75432847,37.6854661 9.75432847,37.6854661 L9.75432847,37.6854661 Z" id="path10038-5-0"></path>
            <path d="M197.706374,209.000371 C197.706374,209.000371 195.491602,212.179948 192.503993,215.918272 C190.505252,218.419934 188.907414,221.128771 188.75878,223.462014 C188.588443,226.127341 190.201314,228.801291 193.121326,228.930895 C196.039645,229.060409 197.224136,226.87581 197.706374,225.074679 C198.188613,226.87581 199.373203,229.060409 202.291423,228.930895 C205.211431,228.801291 206.824401,226.127341 206.653965,223.462014 C206.505431,221.128771 204.907493,218.419934 202.908855,215.918272 C199.921147,212.179948 197.706374,209.000371 197.706374,209.000371 L197.706374,209.000371 Z" id="path10040-7-6"></path>
            <path d="M52.1945483,48.3727714 C52.1945483,48.3727714 47.5490706,40.7417886 41.2825587,31.7697891 C37.0903493,25.7657955 33.7387719,19.2645873 33.4271686,13.6647966 C33.0697706,7.26801343 36.4528069,0.850536631 42.5775542,0.539504709 C48.698618,0.228652211 51.1831815,5.47170764 52.1945483,9.7944164 C53.2060147,5.47170764 55.6905782,0.228652211 61.811642,0.539504709 C67.9363893,0.850536631 71.3194256,7.26801343 70.9620276,13.6647966 C70.6504243,19.2645873 67.2988469,25.7657955 63.1066375,31.7697891 C56.8401256,40.7417886 52.1945483,48.3727714 52.1945483,48.3727714 L52.1945483,48.3727714 Z" id="path10046-1-1"></path>
            <path d="M155.265356,147.266081 C155.265356,147.266081 150.619878,139.635098 144.353366,130.663099 C140.161157,124.659105 136.80958,118.157897 136.497976,112.558107 C136.140578,106.161323 139.523615,99.7438465 145.648362,99.4328146 C151.769426,99.1219621 154.253989,104.365018 155.265356,108.687726 C156.276822,104.365018 158.761386,99.1219621 164.88245,99.4328146 C171.007197,99.7438465 174.390233,106.161323 174.032835,112.558107 C173.721232,118.157897 170.369655,124.659105 166.177445,130.663099 C159.910933,139.635098 155.265356,147.266081 155.265356,147.266081 L155.265356,147.266081 Z" id="path10048-2-0"></path>
            <path d="M155.265356,48.3727714 C155.265356,48.3727714 150.619878,40.7417886 144.353366,31.7697891 C140.161157,25.7657955 136.80958,19.2645873 136.497976,13.6647966 C136.140578,7.26801343 139.523615,0.850536631 145.648362,0.539504709 C151.769426,0.228652211 154.253989,5.47170764 155.265356,9.7944164 C156.276822,5.47170764 158.761386,0.228652211 164.88245,0.539504709 C171.007197,0.850536631 174.390233,7.26801343 174.032835,13.6647966 C173.721232,19.2645873 170.369655,25.7657955 166.177445,31.7697891 C159.910933,40.7417886 155.265356,48.3727714 155.265356,48.3727714 L155.265356,48.3727714 Z" id="path10052-3-1"></path>
            <path d="M52.1945483,147.266081 C52.1945483,147.266081 47.5490706,139.635098 41.2825587,130.663109 C37.0903493,124.659115 33.7387719,118.157907 33.4271686,112.558116 C33.0697706,106.161333 36.4528069,99.7438565 42.5775542,99.4328245 C48.698618,99.121972 51.1831815,104.365027 52.1945483,108.687736 C53.2060147,104.365027 55.6905782,99.121972 61.811642,99.4328245 C67.9363893,99.7438565 71.3194256,106.161333 70.9620276,112.558116 C70.6504243,118.157907 67.2988469,124.659115 63.1066375,130.663109 C56.8401256,139.635098 52.1945483,147.266081 52.1945483,147.266081 L52.1945483,147.266081 Z" id="path10056-4-2"></path>
            <path d="M155.265356,198.312936 C155.265356,198.312936 150.619878,205.943919 144.353366,214.915918 C140.161157,220.919912 136.80958,227.42112 136.497976,233.02091 C136.140578,239.417694 139.523615,245.83517 145.648362,246.146202 C151.769426,246.457055 154.253989,241.213999 155.265356,236.891291 C156.276822,241.213999 158.761386,246.457055 164.88245,246.146202 C171.007197,245.83517 174.390233,239.417694 174.032835,233.02091 C173.721232,227.42112 170.369655,220.919912 166.177445,214.915918 C159.910933,205.943919 155.265356,198.312936 155.265356,198.312936 L155.265356,198.312936 Z" id="path10066-9-2"></path>
            <path d="M52.1945483,198.312936 C52.1945483,198.312936 47.5490706,205.943919 41.2825587,214.915918 C37.0903493,220.919912 33.7387719,227.42112 33.4271686,233.02091 C33.0697706,239.417694 36.4528069,245.83517 42.5775542,246.146202 C48.698618,246.457055 51.1831815,241.213999 52.1945483,236.891291 C53.2060147,241.213999 55.6905782,246.457055 61.811642,246.146202 C67.9363893,245.83517 71.3194256,239.417694 70.9620276,233.02091 C70.6504243,227.42112 67.2988469,220.919912 63.1066375,214.915918 C56.8401256,205.943919 52.1945483,198.312936 52.1945483,198.312936 L52.1945483,198.312936 Z" id="path10068-1-2"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
