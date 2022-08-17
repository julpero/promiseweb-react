import React from "react";
import "./card.css";

interface IProps {
	title: string,
	text: string,
  suite: string,
}

export const xxx = ({title, text, suite}: IProps) => {
  return (
    <svg className="svgBody" width="100%" height="100%" viewBox="0 0 227 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>{title}</title>
      <text className={`noHover ${suite}`} transform="translate(5.000000, 46.000000)" fontSize={30}>{text}</text>
      <text className={`noHover ${suite}`} transform="translate(221.000000, 268.000000)" fontSize={30} rotate={180}>{text}</text>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Clubs" transform="translate(10.000000, 23.000000)" fill="#006400">
          <g id="5" transform="translate(0.000000, 11.000000)" >
            <path d="M155.0812,0.6352 C145.3067,0.8475 140.9238,11.8525 148.1628,20.3985 C149.2127,21.645 149.321,22.3604 147.3982,21.163 C142.5244,17.9038 133.179,20.0464 132.7004,30.0103 C132.1093,42.2872 149.2633,45.8246 152.4841,32.77 C152.6542,31.3926 153.7736,31.424 153.5037,33.3791 C153.21,38.6855 151.5528,43.6452 149.275,48.4816 L160.8952,48.4816 C158.6175,43.6452 156.9603,38.6855 156.6666,33.3791 C156.3967,31.424 157.5161,31.3926 157.6861,32.77 C160.907,45.8246 178.061,42.2872 177.4698,30.0103 C176.9914,20.0464 167.6459,17.9038 162.772,21.163 C160.8492,22.3604 160.9576,21.645 162.0075,20.3985 C169.2465,11.8525 164.8636,0.8475 155.0892,0.6352 C155.0892,0.6351 155.0892,0.6352 155.0792,0.6352 L155.0812,0.6352 Z" id="path147-0-8-1-6-13-2-8-2-5"></path>
            <path d="M52.0104,0.6352 C42.2359,0.8475 37.8529,11.8525 45.092,20.3985 C46.1419,21.645 46.2502,22.3604 44.3274,21.163 C39.4536,17.9038 30.1082,20.0464 29.6296,30.0103 C29.0385,42.2872 46.1925,45.8246 49.4133,32.77 C49.5834,31.3926 50.7027,31.424 50.4329,33.3791 C50.1392,38.6855 48.482,43.6452 46.2042,48.4816 L57.8244,48.4816 C55.5467,43.6452 53.8895,38.6855 53.5958,33.3791 C53.3259,31.424 54.4453,31.3926 54.6153,32.77 C57.8362,45.8246 74.9902,42.2872 74.399,30.0103 C73.9206,20.0464 64.5751,17.9038 59.7012,21.163 C57.7784,22.3604 57.8867,21.645 58.9366,20.3985 C66.1757,11.8525 61.7927,0.8475 52.0184,0.6352 C52.0184,0.6351 52.0184,0.6352 52.0084,0.6352 L52.0104,0.6352 Z" id="path147-0-8-1-6-75-2-83-7-6-4"></path>
            <path d="M155.0812,246.26825 C145.3067,246.05599 140.9238,235.05098 148.1628,226.50497 C149.2127,225.25844 149.321,224.54309 147.3982,225.74044 C142.5244,228.99963 133.179,226.85707 132.7004,216.89316 C132.1093,204.61621 149.2633,201.0789 152.4841,214.13349 C152.6542,215.51085 153.7736,215.47943 153.5037,213.52433 C153.21,208.21792 151.5528,203.25827 149.275,198.4218 L160.8952,198.4218 C158.6175,203.25827 156.9603,208.21792 156.6666,213.52433 C156.3967,215.47943 157.5161,215.51085 157.6861,214.13349 C160.907,201.0789 178.061,204.61621 177.4698,216.89316 C176.9914,226.85707 167.6459,228.99963 162.772,225.74044 C160.8492,224.54309 160.9576,225.25844 162.0075,226.50497 C169.2465,235.05098 164.8636,246.05598 155.0892,246.26825 C155.0892,246.26831 155.0892,246.2682 155.0792,246.26825 L155.0812,246.26825 Z" id="path147-0-8-1-6-7-5-5-7-6-8-5"></path>
            <path d="M52.0104,246.26825 C42.2359,246.05599 37.8529,235.05098 45.092,226.50497 C46.1419,225.25844 46.2502,224.54309 44.3274,225.74044 C39.4536,228.99963 30.1082,226.85707 29.6296,216.89316 C29.0385,204.61621 46.1925,201.0789 49.4133,214.13349 C49.5834,215.51085 50.7027,215.47943 50.4329,213.52433 C50.1392,208.21792 48.482,203.25827 46.2042,198.4218 L57.8244,198.4218 C55.5467,203.25827 53.8895,208.21792 53.5958,213.52433 C53.3259,215.47943 54.4453,215.51085 54.6153,214.13349 C57.8362,201.0789 74.9902,204.61621 74.399,216.89316 C73.9206,226.85707 64.5751,228.99963 59.7012,225.74044 C57.7784,224.54309 57.8867,225.25844 58.9366,226.50497 C66.1757,235.05098 61.7927,246.05598 52.0184,246.26825 C52.0184,246.26831 52.0184,246.2682 52.0084,246.26825 L52.0104,246.26825 Z" id="path147-0-8-1-6-75-6-1-2-4-9-5"></path>
            <path d="M103.5458,99.5285 C93.7713,99.74076 89.3884,110.74577 96.6274,119.29178 C97.6773,120.53831 97.7856,121.25366 95.8628,120.05631 C90.989,116.79712 81.6436,118.93968 81.165,128.90359 C80.5739,141.18053 97.7279,144.71785 100.9487,131.66326 C101.1188,130.2859 102.2381,130.31732 101.9683,132.27242 C101.6746,137.57883 100.0174,142.53848 97.7396,147.37495 L109.3598,147.37495 C107.0821,142.53848 105.4249,137.57883 105.1312,132.27242 C104.8613,130.31732 105.9807,130.2859 106.1507,131.66326 C109.3716,144.71785 126.5256,141.18053 125.9344,128.90359 C125.456,118.93968 116.1105,116.79712 111.2366,120.05631 C109.3138,121.25366 109.4222,120.53831 110.472,119.29178 C117.7111,110.74577 113.3281,99.74077 103.5538,99.5285 C103.5538,99.52844 103.5538,99.52855 103.5438,99.5285 L103.5458,99.5285 Z" id="path147-0-8-1-6-1-1-0-5-6-4-0"></path>
            <path d="M197.5278,228.63076 C201.4375,228.54236 203.1908,223.9569 200.2951,220.39607 C199.8751,219.87668 199.8318,219.57861 200.601,220.07751 C202.5505,221.43551 206.2887,220.54277 206.4801,216.39114 C206.7166,211.27574 199.8549,209.80186 198.5666,215.24128 C198.4986,215.81519 198.0508,215.80209 198.1588,214.98746 C198.2763,212.77646 198.9391,210.70994 199.8502,208.69475 L195.2024,208.69475 C196.1135,210.70994 196.7763,212.77646 196.8938,214.98746 C197.0018,215.80209 196.554,215.81519 196.486,215.24128 C195.1977,209.80186 188.3361,211.27574 188.5725,216.39114 C188.7639,220.54277 192.5021,221.43551 194.4516,220.07751 C195.2208,219.57861 195.1775,219.87668 194.7575,220.39607 C191.8618,223.9569 193.6151,228.54231 197.5248,228.63076 C197.5258,228.63078 197.5248,228.63074 197.5248,228.63076 L197.5278,228.63076 Z" id="path147-6-9-8-7-0-5-6-7-4-6"></path>
            <path d="M9.5728,17.4438 C5.663,17.5318 3.9098,22.1177 6.8054,25.6785 C7.2254,26.1979 7.2687,26.496 6.4996,25.9971 C4.55,24.6391 0.8119,25.5318 0.6205,29.6835 C0.384,34.7988 7.2456,36.2727 8.534,30.8333 C8.602,30.2594 9.0498,30.2725 8.9417,31.0871 C8.8243,33.2981 8.1614,35.3647 7.2503,37.3798 L11.8982,37.3798 C10.9871,35.3647 10.3242,33.2981 10.2068,31.0871 C10.0988,30.2725 10.5465,30.2594 10.6145,30.8333 C11.9029,36.2727 18.7645,34.7988 18.5281,29.6835 C18.3366,25.5318 14.5985,24.6391 12.6489,25.9971 C11.8798,26.496 11.9231,26.1979 12.3431,25.6785 C15.2387,22.1177 13.4855,17.5323 9.5758,17.4438 C9.5748,17.4438 9.5758,17.4438 9.5758,17.4438 L9.5728,17.4438 Z" id="path147-6-9-8-7-4-5-62-2-3-8"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
