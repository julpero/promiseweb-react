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
          <g id="8" transform="translate(1.000000, 10.000000)" >
            <path d="M9.44353924,37.6854661 C9.44353924,37.6854661 7.22876643,34.5058892 4.24115967,30.7675652 C2.24241855,28.2659028 0.644580473,25.5570653 0.495946688,23.2238225 C0.325610181,20.5584953 1.93848087,17.8845458 4.85849262,17.7549417 C7.77680996,17.6254273 8.96130076,19.8100271 9.44353924,21.6111574 C9.92577772,19.8100271 11.1103681,17.6254273 14.0285879,17.7549417 C16.9485996,17.8845458 18.5615698,20.5584953 18.3911338,23.2238225 C18.2425996,25.5570653 16.6446619,28.2659028 14.6460204,30.7675652 C11.6583121,34.5058892 9.44353924,37.6854661 9.44353924,37.6854661 L9.44353924,37.6854661 Z" id="path10174-9-0"></path>
            <path d="M197.395585,209.000371 C197.395585,209.003361 195.180812,212.179948 192.193204,215.918272 C190.194462,218.419934 188.596624,221.128771 188.447991,223.462014 C188.277654,226.127341 189.890525,228.801291 192.810537,228.930895 C195.728856,229.060409 196.913347,226.87581 197.395585,225.074679 C197.877824,226.87581 199.062414,229.060409 201.980634,228.930895 C204.900641,228.801291 206.513612,226.127341 206.343176,223.462014 C206.194641,221.128771 204.596704,218.419934 202.598066,215.918272 C199.610358,212.179948 197.397477,209.002962 197.395585,209.000371 L197.395585,209.000371 Z" id="path10176-9-9"></path>
            <path d="M103.419108,97.819371 C103.419108,97.819371 98.7736305,90.1883882 92.5071186,81.2163887 C88.3149092,75.2123951 84.9633318,68.7111869 84.6517285,63.1113962 C84.2943305,56.714613 87.6773668,50.2971362 93.8021141,49.9861043 C99.9231779,49.6752518 102.407741,54.9183073 103.419108,59.241016 C104.430575,54.9183073 106.915138,49.6752518 113.036202,49.9861043 C119.160949,50.2971362 122.543986,56.714613 122.186587,63.1113962 C121.874984,68.7111869 118.523407,75.2123951 114.331197,81.2163887 C108.064686,90.1883882 103.419108,97.819371 103.419108,97.819371 L103.419108,97.819371 Z" id="path10178-8-4"></path>
            <path d="M51.8837591,48.3727714 C51.8837591,48.3727714 47.2382813,40.7417886 40.9717695,31.7697891 C36.7795601,25.7657955 33.4279827,19.2645873 33.1163794,13.6647966 C32.7589813,7.26801343 36.1420177,0.850536631 42.266765,0.539504709 C48.3878288,0.228652211 50.8723923,5.47170764 51.8837591,9.7944164 C52.8952254,5.47170764 55.379789,0.228652211 61.5008528,0.539504709 C67.6256001,0.850536631 71.0086364,7.26801343 70.6512384,13.6647966 C70.339635,19.2645873 66.9880577,25.7657955 62.7958483,31.7697891 C56.5293364,40.7417886 51.8837591,48.3727714 51.8837591,48.3727714 L51.8837591,48.3727714 Z" id="path10182-1-9"></path>
            <path d="M154.954567,147.266081 C154.954567,147.266081 150.309089,139.635098 144.042577,130.663099 C139.850368,124.659105 136.49879,118.157897 136.187187,112.558107 C135.829789,106.161323 139.212825,99.7438465 145.337573,99.4328146 C151.458637,99.1219621 153.9432,104.365018 154.954567,108.687726 C155.966033,104.365018 158.450597,99.1219621 164.571661,99.4328146 C170.696408,99.7438465 174.079444,106.161323 173.722046,112.558107 C173.410443,118.157897 170.058865,124.659105 165.866656,130.663099 C159.600144,139.635098 154.954567,147.266081 154.954567,147.266081 L154.954567,147.266081 Z" id="path10184-9-1"></path>
            <path d="M154.954567,48.3727714 C154.954567,48.3727714 150.309089,40.7417886 144.042577,31.7697891 C139.850368,25.7657955 136.49879,19.2645873 136.187187,13.6647966 C135.829789,7.26801343 139.212825,0.850536631 145.337573,0.539504709 C151.458637,0.228652211 153.9432,5.47170764 154.954567,9.7944164 C155.966033,5.47170764 158.450597,0.228652211 164.571661,0.539504709 C170.696408,0.850536631 174.079444,7.26801343 173.722046,13.6647966 C173.410443,19.2645873 170.058865,25.7657955 165.866656,31.7697891 C159.600144,40.7417886 154.954567,48.3727714 154.954567,48.3727714 L154.954567,48.3727714 Z" id="path10188-5-4"></path>
            <path d="M51.8837591,147.266081 C51.8837591,147.266081 47.2382813,139.635098 40.9717695,130.663109 C36.7795601,124.659115 33.4279827,118.157907 33.1163794,112.558116 C32.7589813,106.161333 36.1420177,99.7438565 42.266765,99.4328245 C48.3878288,99.121972 50.8723923,104.365027 51.8837591,108.687736 C52.8952254,104.365027 55.379789,99.121972 61.5008528,99.4328245 C67.6256001,99.7438565 71.0086364,106.161333 70.6512384,112.558116 C70.339635,118.157907 66.9880577,124.659115 62.7958483,130.663109 C56.5293364,139.635098 51.8837591,147.266081 51.8837591,147.266081 L51.8837591,147.266081 Z" id="path10192-3-6"></path>
            <path d="M103.419108,148.866325 C103.419108,148.866325 98.77373,156.497308 92.5071186,165.469317 C88.3150087,171.473311 84.9633318,177.974519 84.6518281,183.5743 C84.29443,189.971083 87.6773668,196.38856 93.8021141,196.699592 C99.9232774,197.010444 102.407841,191.767389 103.419108,187.44468 C104.430674,191.767389 106.915138,197.010444 113.036301,196.699592 C119.161049,196.38856 122.543986,189.971083 122.186587,183.5743 C121.875084,177.974519 118.523506,171.473311 114.331297,165.469317 C108.064785,156.497308 103.419108,148.866325 103.419108,148.866325 L103.419108,148.866325 Z" id="path10196-7-3"></path>
            <path d="M154.954567,198.312936 C154.954567,198.312936 150.309089,205.943919 144.042577,214.915918 C139.850368,220.919912 136.49879,227.42112 136.187187,233.02091 C135.829789,239.417694 139.212825,245.83517 145.337573,246.146202 C151.458637,246.457055 153.9432,241.213999 154.954567,236.891291 C155.966033,241.213999 158.450597,246.457055 164.571661,246.146202 C170.696408,245.83517 174.079444,239.417694 173.722046,233.02091 C173.410443,227.42112 170.058865,220.919912 165.866656,214.915918 C159.600144,205.943919 154.954567,198.312936 154.954567,198.312936 L154.954567,198.312936 Z" id="path10202-2-8"></path>
            <path d="M51.8837591,198.312936 C51.8837591,198.312936 47.2382813,205.943919 40.9717695,214.915918 C36.7795601,220.919912 33.4279827,227.42112 33.1163794,233.02091 C32.7589813,239.417694 36.1420177,245.83517 42.266765,246.146202 C48.3878288,246.457055 50.8723923,241.213999 51.8837591,236.891291 C52.8952254,241.213999 55.379789,246.457055 61.5008528,246.146202 C67.6256001,245.83517 71.0086364,239.417694 70.6512384,233.02091 C70.339635,227.42112 66.9880577,220.919912 62.7958483,214.915918 C56.5293364,205.943919 51.8837591,198.312936 51.8837591,198.312936 L51.8837591,198.312936 Z" id="path10204-9-4"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
