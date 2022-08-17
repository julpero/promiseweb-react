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
        <g id="Hearts" transform="translate(9.000000, 25.000000)" fill="#D40000">
          <g id="7" transform="translate(0.000000, 10.000000)" >
            <path d="M9.60111521,37.6854661 C9.60111521,37.6854661 7.3863424,34.5058892 4.39873563,30.7675652 C2.39999451,28.2659028 0.802156437,25.5570653 0.653522653,23.2238225 C0.483186145,20.5584953 2.09605684,17.8845458 5.01606858,17.7549417 C7.93438592,17.6254273 9.11887673,19.8100271 9.60111521,21.6111574 C10.0833537,19.8100271 11.267944,17.6254273 14.1861638,17.7549417 C17.1061756,17.8845458 18.7191458,20.5584953 18.5487098,23.2238225 C18.4001755,25.5570653 16.8022379,28.2659028 14.8035963,30.7675652 C11.815888,34.5058892 9.60111521,37.6854661 9.60111521,37.6854661 L9.60111521,37.6854661 Z" id="path10106-2-3"></path>
            <path d="M197.553161,209.000371 C197.553161,209.000371 195.338388,212.179948 192.35078,215.918272 C190.352038,218.419934 188.7542,221.128771 188.605567,223.462014 C188.43523,226.127341 190.048101,228.801291 192.968112,228.930895 C195.886432,229.060409 197.070923,226.87581 197.553161,225.074679 C198.0354,226.87581 199.21999,229.060409 202.13821,228.930895 C205.058217,228.801291 206.671188,226.127341 206.500752,223.462014 C206.352217,221.128771 204.75428,218.419934 202.755642,215.918272 C199.767934,212.179948 197.553161,209.000371 197.553161,209.000371 L197.553161,209.000371 Z" id="path10108-3-1"></path>
            <path d="M103.576733,97.819375 C103.576733,97.819375 98.9312552,90.1883912 92.6647433,81.2163927 C88.4725339,75.2123951 85.1209566,68.7111869 84.8093533,63.1113962 C84.4519552,56.714613 87.8349916,50.2971362 93.9597388,49.9861043 C100.080803,49.6752518 102.565366,54.9183073 103.576733,59.241016 C104.588199,54.9183073 107.072763,49.6752518 113.193827,49.9861043 C119.318574,50.2971362 122.70161,56.714613 122.344212,63.1113962 C122.032609,68.7111869 118.681032,75.2123951 114.488822,81.2163927 C108.22231,90.1883912 103.576733,97.819375 103.576733,97.819375 L103.576733,97.819375 Z" id="path10110-3-5"></path>
            <path d="M52.0413351,48.3727714 C52.0413351,48.3727714 47.3958573,40.7417886 41.1293455,31.7697891 C36.937136,25.7657955 33.5855587,19.2645873 33.2739554,13.6647966 C32.9165573,7.26801343 36.2995937,0.850536631 42.4243409,0.539504709 C48.5454047,0.228652211 51.0299683,5.47170764 52.0413351,9.7944164 C53.0528014,5.47170764 55.5373649,0.228652211 61.6584287,0.539504709 C67.783176,0.850536631 71.1662124,7.26801343 70.8088143,13.6647966 C70.497211,19.2645873 67.1456337,25.7657955 62.9534242,31.7697891 C56.6869124,40.7417886 52.0413351,48.3727714 52.0413351,48.3727714 L52.0413351,48.3727714 Z" id="path10114-8-3"></path>
            <path d="M155.112143,147.266081 C155.112143,147.266081 150.466665,139.635098 144.200153,130.663099 C140.007944,124.659105 136.656366,118.157897 136.344763,112.558107 C135.987365,106.161323 139.370401,99.7438465 145.495149,99.4328146 C151.616212,99.1219621 154.100776,104.365018 155.112143,108.687726 C156.123609,104.365018 158.608173,99.1219621 164.729236,99.4328146 C170.853984,99.7438465 174.23702,106.161323 173.879622,112.558107 C173.568019,118.157897 170.216441,124.659105 166.024232,130.663099 C159.75772,139.635098 155.112143,147.266081 155.112143,147.266081 L155.112143,147.266081 Z" id="path10116-2-5"></path>
            <path d="M155.112143,48.3727714 C155.112143,48.3727714 150.466665,40.7417886 144.200153,31.7697891 C140.007944,25.7657955 136.656366,19.2645873 136.344763,13.6647966 C135.987365,7.26801343 139.370401,0.850536631 145.495149,0.539504709 C151.616212,0.228652211 154.100776,5.47170764 155.112143,9.7944164 C156.123609,5.47170764 158.608173,0.228652211 164.729236,0.539504709 C170.853984,0.850536631 174.23702,7.26801343 173.879622,13.6647966 C173.568019,19.2645873 170.216441,25.7657955 166.024232,31.7697891 C159.75772,40.7417886 155.112143,48.3727714 155.112143,48.3727714 L155.112143,48.3727714 Z" id="path10120-6-5"></path>
            <path d="M52.0413351,147.266081 C52.0413351,147.266081 47.3958573,139.635098 41.1293455,130.663109 C36.937136,124.659115 33.5855587,118.157907 33.2739554,112.558116 C32.9165573,106.161333 36.2995937,99.7438565 42.4243409,99.4328245 C48.5454047,99.121972 51.0299683,104.365027 52.0413351,108.687736 C53.0528014,104.365027 55.5373649,99.121972 61.6584287,99.4328245 C67.783176,99.7438565 71.1662124,106.161333 70.8088143,112.558116 C70.497211,118.157907 67.1456337,124.659115 62.9534242,130.663109 C56.6869124,139.635098 52.0413351,147.266081 52.0413351,147.266081 L52.0413351,147.266081 Z" id="path10124-1-1"></path>
            <path d="M155.112143,198.312936 C155.112143,198.312936 150.466665,205.943919 144.200153,214.915918 C140.007944,220.919912 136.656366,227.42112 136.344763,233.02091 C135.987365,239.417694 139.370401,245.83517 145.495149,246.146202 C151.616212,246.457055 154.100776,241.213999 155.112143,236.891291 C156.123609,241.213999 158.608173,246.457055 164.729236,246.146202 C170.853984,245.83517 174.23702,239.417694 173.879622,233.02091 C173.568019,227.42112 170.216441,220.919912 166.024232,214.915918 C159.75772,205.943919 155.112143,198.312936 155.112143,198.312936 L155.112143,198.312936 Z" id="path10134-7-3"></path>
            <path d="M52.0413351,198.312936 C52.0413351,198.312936 47.3958573,205.943919 41.1293455,214.915918 C36.937136,220.919912 33.5855587,227.42112 33.2739554,233.02091 C32.9165573,239.417694 36.2995937,245.83517 42.4243409,246.146202 C48.5454047,246.457055 51.0299683,241.213999 52.0413351,236.891291 C53.0528014,241.213999 55.5373649,246.457055 61.6584287,246.146202 C67.783176,245.83517 71.1662124,239.417694 70.8088143,233.02091 C70.497211,227.42112 67.1456337,220.919912 62.9534242,214.915918 C56.6869124,205.943919 52.0413351,198.312936 52.0413351,198.312936 L52.0413351,198.312936 Z" id="path10136-5-7"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
