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
          <g id="4" transform="translate(1.000000, 10.000000)" >
            <path d="M9.06065543,37.6854661 C9.06065543,37.6824757 6.84588262,34.5058892 3.85827585,30.7675652 C1.85953473,28.2659028 0.261696658,25.5570653 0.113062874,23.2238225 C-0.0572736338,20.5584953 1.55559706,17.8845458 4.4756088,17.7549417 C7.39392614,17.6254273 8.57841695,19.8100271 9.06065543,21.6111574 C9.54289391,19.8100271 10.7274843,17.6254273 13.645704,17.7549417 C16.5657158,17.8845458 18.178686,20.5584953 18.00825,23.2238225 C17.8597157,25.5570653 16.2617781,28.2659028 14.2631365,30.7675652 C11.2754282,34.5058892 9.06254695,37.6828744 9.06065543,37.6854661 L9.06065543,37.6854661 Z" id="path9902-6-7"></path>
            <path d="M197.012701,209.000371 C197.012701,209.003361 194.797928,212.179948 191.81032,215.918272 C189.811579,218.419934 188.213741,221.128771 188.065107,223.462014 C187.89477,226.127341 189.507641,228.801291 192.427653,228.930895 C195.345972,229.060409 196.530463,226.87581 197.012701,225.074679 C197.49494,226.87581 198.67953,229.060409 201.59775,228.930895 C204.517758,228.801291 206.130728,226.127341 205.960292,223.462014 C205.811758,221.128771 204.21382,218.419934 202.215182,215.918272 C199.227474,212.179948 197.014593,209.002962 197.012701,209.000371 L197.012701,209.000371 Z" id="path9904-6-0"></path>
            <path d="M51.5008753,48.3727714 C51.5008753,48.3667906 46.8553975,40.7417886 40.5888857,31.7697891 C36.3966762,25.7657955 33.0450989,19.2645873 32.7334956,13.6647966 C32.3760975,7.26801343 35.7591339,0.850536631 41.8838812,0.539504709 C48.004945,0.228652211 50.4895085,5.47170764 51.5008753,9.7944164 C52.5123416,5.47170764 54.9969052,0.228652211 61.117969,0.539504709 C67.2427162,0.850536631 70.6257526,7.26801343 70.2683545,13.6647966 C69.9567512,19.2645873 66.6051739,25.7657955 62.4129645,31.7697891 C56.1464526,40.7417886 51.5048574,48.3665513 51.5008753,48.3727714 L51.5008753,48.3727714 Z" id="path9910-2-6"></path>
            <path d="M154.571683,48.3727714 C154.571683,48.3667906 149.926205,40.7417886 143.659693,31.7697891 C139.467484,25.7657955 136.115907,19.2645873 135.804303,13.6647966 C135.446905,7.26801343 138.829942,0.850536631 144.954689,0.539504709 C151.075753,0.228652211 153.560316,5.47170764 154.571683,9.7944164 C155.583149,5.47170764 158.067713,0.228652211 164.188777,0.539504709 C170.313524,0.850536631 173.69656,7.26801343 173.339162,13.6647966 C173.027559,19.2645873 169.675982,25.7657955 165.483772,31.7697891 C159.21726,40.7417886 154.575665,48.3665513 154.571683,48.3727714 L154.571683,48.3727714 Z" id="path9916-8-0"></path>
            <path d="M154.571683,198.312936 C154.571683,198.318917 149.926205,205.943919 143.659693,214.915918 C139.467484,220.919912 136.115907,227.42112 135.804303,233.02091 C135.446905,239.417694 138.829942,245.83517 144.954689,246.146202 C151.075753,246.457055 153.560316,241.213999 154.571683,236.891291 C155.583149,241.213999 158.067713,246.457055 164.188777,246.146202 C170.313524,245.83517 173.69656,239.417694 173.339162,233.02091 C173.027559,227.42112 169.675982,220.919912 165.483772,214.915918 C159.21726,205.943919 154.575665,198.319156 154.571683,198.312936 L154.571683,198.312936 Z" id="path9930-7-9"></path>
            <path d="M51.5008753,198.312936 C51.5008753,198.318917 46.8553975,205.943919 40.5888857,214.915918 C36.3966762,220.919912 33.0450989,227.42112 32.7334956,233.02091 C32.3760975,239.417694 35.7591339,245.83517 41.8838812,246.146202 C48.004945,246.457055 50.4895085,241.213999 51.5008753,236.891291 C52.5123416,241.213999 54.9969052,246.457055 61.117969,246.146202 C67.2427162,245.83517 70.6257526,239.417694 70.2683545,233.02091 C69.9567512,227.42112 66.6051739,220.919912 62.4129645,214.915918 C56.1464526,205.943919 51.5048574,198.319156 51.5008753,198.312936 L51.5008753,198.312936 Z" id="path9932-9-8"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};