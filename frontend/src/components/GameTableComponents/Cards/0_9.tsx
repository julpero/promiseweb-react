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
        <g id="Spades" transform="translate(10.000000, 26.000000)" fill="#000000">
          <g id="9" transform="translate(0.000000, 9.000000)" >
            <path d="M52.0321204,0.18019726 C42.8472892,13.2952321 33.0196393,20.8424636 32.8563711,31.0743901 C32.8016165,34.3876581 34.5906974,40.0191072 40.1945793,41.0970083 C43.8302831,41.7931046 48.8359465,38.8467492 48.9404779,32.8609173 C48.9245493,31.6691915 50.2007291,31.7001621 50.1887827,33.333122 C50.0175502,38.0546909 48.5248409,43.5518908 46.0160858,48.0266616 L58.0481549,48.0266616 C55.5393998,43.5518908 54.0466905,38.0546909 53.875458,33.333122 C53.8635116,31.7001621 55.1396914,31.6691915 55.1237628,32.8609173 C55.2282943,38.8467492 60.2339576,41.7931046 63.8696614,41.0970083 C69.4735434,40.0191072 71.2626242,34.3876581 71.2078697,31.0743901 C71.0446015,20.8424636 61.2169516,13.2952321 52.0321204,0.18019726 L52.0321204,0.18019726 Z" id="path7225-5-2"></path>
            <path d="M9.59184874,17.4033295 C5.30048376,22.867934 0.708864596,26.012603 0.632606405,30.2759124 C0.606722424,31.6564324 1.44287457,34.0028729 4.06113883,34.4520016 C5.75982487,34.7420409 8.09854213,33.5143904 8.14742304,31.0202937 C8.13746766,30.5237371 8.73618405,30.5366457 8.73060904,31.2170424 C8.65096602,33.1843694 7.95319362,35.4748693 6.78104749,37.3393563 L12.40265,37.3393563 C11.2305039,35.4748693 10.5330301,33.1843694 10.4530884,31.2170424 C10.4431331,30.5366457 11.043741,30.5237371 11.0362744,31.0202937 C11.0850558,33.5143904 13.4238726,34.7420409 15.1225587,34.4520016 C17.7408229,34.0028729 18.5766764,31.6564324 18.5510911,30.2759124 C18.4744347,26.012603 13.8831142,22.867934 9.59184874,17.4033295 L9.59184874,17.4033295 Z" id="path7227-2-8"></path>
            <path d="M52.0321204,179.88441 C42.8472892,166.769375 33.0196393,159.222144 32.8563711,148.990217 C32.8016165,145.676949 34.5906974,140.0455 40.1945793,138.967599 C43.8302831,138.271503 48.8359465,141.217858 48.9404779,147.20369 C48.9245493,148.395416 50.2007291,148.364445 50.1887827,146.731485 C50.0175502,142.009916 48.5248409,136.512717 46.0160858,132.037946 L58.0481549,132.037946 C55.5393998,136.512717 54.0466905,142.009916 53.875458,146.731485 C53.8635116,148.364445 55.1396914,148.395416 55.1237628,147.20369 C55.2282943,141.217858 60.2339576,138.271503 63.8696614,138.967599 C69.4735434,140.0455 71.2626242,145.676949 71.2078697,148.990217 C71.0446015,159.222144 61.2169516,166.769375 52.0321204,179.88441 L52.0321204,179.88441 Z" id="path7229-4-8"></path>
            <path d="M197.543899,228.590287 C193.252534,223.125682 188.660914,219.981013 188.584656,215.717704 C188.558772,214.337184 189.394924,211.990743 192.013189,211.541614 C193.711875,211.251575 196.050592,212.479226 196.099473,214.973322 C196.089518,215.469879 196.688234,215.45697 196.682659,214.776574 C196.603016,212.809247 195.905243,210.518747 194.733097,208.65426 L200.3547,208.65426 C199.182554,210.518747 198.48508,212.809247 198.405138,214.776574 C198.395183,215.45697 198.995791,215.469879 198.988324,214.973322 C199.037106,212.479226 201.375922,211.251575 203.074609,211.541614 C205.692873,211.990743 206.528726,214.337184 206.503141,215.717704 C206.426485,219.981013 201.835164,223.125682 197.543899,228.590287 L197.543899,228.590287 Z" id="path7231-7-8"></path>
            <path d="M155.10293,0.18019726 C145.918099,13.2952321 136.090449,20.8424636 135.927181,31.0743901 C135.872426,34.3876581 137.661507,40.0191072 143.265389,41.0970083 C146.901093,41.7931046 151.906756,38.8467492 152.011288,32.8609173 C151.995359,31.6691915 153.271539,31.7001621 153.259592,33.333122 C153.08836,38.0546909 151.595651,43.5518908 149.086896,48.0266616 L161.118965,48.0266616 C158.61021,43.5518908 157.1175,38.0546909 156.946268,33.333122 C156.934321,31.7001621 158.210501,31.6691915 158.194573,32.8609173 C158.299104,38.8467492 163.304767,41.7931046 166.940471,41.0970083 C172.544353,40.0191072 174.333434,34.3876581 174.278679,31.0743901 C174.115411,20.8424636 164.287761,13.2952321 155.10293,0.18019726 L155.10293,0.18019726 Z" id="path7233-8-9"></path>
            <path d="M52.0321204,66.1090665 C42.8472892,79.2241014 33.0196393,86.7713329 32.8563711,97.0032594 C32.8016165,100.316527 34.5906974,105.947976 40.1945793,107.025878 C43.8302831,107.721974 48.8359465,104.775618 48.9404779,98.7897866 C48.9245493,97.5980607 50.2007291,97.6290313 50.1887827,99.2619913 C50.0175502,103.98356 48.5248409,109.48076 46.0160858,113.955531 L58.0481549,113.955531 C55.5393998,109.48076 54.0466905,103.98356 53.875458,99.2619913 C53.8635116,97.6290313 55.1396914,97.5980607 55.1237628,98.7897866 C55.2282943,104.775618 60.2339576,107.721974 63.8696614,107.025878 C69.4735434,105.947976 71.2626242,100.316527 71.2078697,97.0032594 C71.0446015,86.7713329 61.2169516,79.2241014 52.0321204,66.1090665 L52.0321204,66.1090665 Z" id="path7235-9-4"></path>
            <path d="M155.10293,66.1090665 C145.918099,79.2241014 136.090449,86.7713329 135.927181,97.0032594 C135.872426,100.316527 137.661507,105.947976 143.265389,107.025878 C146.901093,107.721974 151.906756,104.775618 152.011288,98.7897866 C151.995359,97.5980607 153.271539,97.6290313 153.259592,99.2619913 C153.08836,103.98356 151.595651,109.48076 149.086896,113.955531 L161.118965,113.955531 C158.61021,109.48076 157.1175,103.98356 156.946268,99.2619913 C156.934321,97.6290313 158.210501,97.5980607 158.194573,98.7897866 C158.299104,104.775618 163.304767,107.721974 166.940471,107.025878 C172.544353,105.947976 174.333434,100.316527 174.278679,97.0032594 C174.115411,86.7713329 164.287761,79.2241014 155.10293,66.1090665 L155.10293,66.1090665 Z" id="path7241-7-2"></path>
            <path d="M52.0321204,245.813289 C42.8472892,232.698254 33.0196393,225.151023 32.8563711,214.919096 C32.8016165,211.605828 34.5906974,205.974379 40.1945793,204.896478 C43.8302831,204.200382 48.8359465,207.146737 48.9404779,213.132569 C48.9245493,214.324295 50.2007291,214.293324 50.1887827,212.660364 C50.0175502,207.938796 48.5248409,202.441596 46.0160858,197.966825 L58.0481549,197.966825 C55.5393998,202.441596 54.0466905,207.938796 53.875458,212.660364 C53.8635116,214.293324 55.1396914,214.324295 55.1237628,213.132569 C55.2282943,207.146737 60.2339576,204.200382 63.8696614,204.896478 C69.4735434,205.974379 71.2626242,211.605828 71.2078697,214.919096 C71.0446015,225.151023 61.2169516,232.698254 52.0321204,245.813289 L52.0321204,245.813289 Z" id="path7245-1-6"></path>
            <path d="M155.10293,245.813289 C145.918099,232.698254 136.090449,225.151023 135.927181,214.919096 C135.872426,211.605828 137.661507,205.974379 143.265389,204.896478 C146.901093,204.200382 151.906756,207.146737 152.011288,213.132569 C151.995359,214.324295 153.271539,214.293324 153.259592,212.660364 C153.08836,207.938796 151.595651,202.441596 149.086896,197.966825 L161.118965,197.966825 C158.61021,202.441596 157.1175,207.938796 156.946268,212.660364 C156.934321,214.293324 158.210501,214.324295 158.194573,213.132569 C158.299104,207.146737 163.304767,204.200382 166.940471,204.896478 C172.544353,205.974379 174.333434,211.605828 174.278679,214.919096 C174.115411,225.151023 164.287761,232.698254 155.10293,245.813289 L155.10293,245.813289 Z" id="path7247-0-6"></path>
            <path d="M155.10293,179.88441 C145.918099,166.769385 136.090449,159.222154 135.927181,148.990227 C135.872426,145.676959 137.661507,140.04551 143.265389,138.967609 C146.901093,138.271513 151.906756,141.217868 152.011288,147.2037 C151.995359,148.395426 153.271539,148.364455 153.259592,146.731495 C153.08836,142.009926 151.595651,136.512717 149.086896,132.037946 L161.118965,132.037946 C158.61021,136.512717 157.1175,142.009926 156.946268,146.731495 C156.934321,148.364455 158.210501,148.395426 158.194573,147.2037 C158.299104,141.217868 163.304767,138.271513 166.940471,138.967609 C172.544353,140.04551 174.333434,145.676959 174.278679,148.990227 C174.115411,159.222154 164.287761,166.769385 155.10293,179.88441 L155.10293,179.88441 Z" id="path7251-3-6"></path>
            <path d="M103.567525,99.0735061 C94.382694,112.188541 84.5550441,119.735772 84.3917759,129.967699 C84.3370214,133.280967 86.1261022,138.912416 91.7299842,139.990317 C95.365688,140.686413 100.371351,137.740058 100.475883,131.754226 C100.459954,130.5625 101.736134,130.593471 101.724188,132.226431 C101.552955,136.948 100.060246,142.4452 97.5514907,146.91997 L109.58356,146.91997 C107.074805,142.4452 105.582095,136.948 105.410863,132.226431 C105.398916,130.593471 106.675096,130.5625 106.659168,131.754226 C106.763699,137.740058 111.769362,140.686413 115.405066,139.990317 C121.008948,138.912416 122.798029,133.280967 122.743275,129.967699 C122.580006,119.735772 112.752356,112.188541 103.567525,99.0735061 L103.567525,99.0735061 Z" id="path7255-7-8"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};