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
          <g id="8" transform="translate(0.000000, 9.000000)" >
            <path d="M51.9269916,0.18019726 C42.7421604,13.2952321 32.9145105,20.8424636 32.7512423,31.0743901 C32.6964877,34.3876581 34.4855686,40.0191072 40.0894505,41.0970083 C43.7251544,41.7931046 48.7308177,38.8467492 48.8353491,32.8609173 C48.8194205,31.6691915 50.0956004,31.7001621 50.0836539,33.333122 C49.9124214,38.0546909 48.4197121,43.5518908 45.910957,48.0266616 L57.9430261,48.0266616 C55.434271,43.5518908 53.9415618,38.0546909 53.7703293,33.333122 C53.7583828,31.7001621 55.0345626,31.6691915 55.018634,32.8609173 C55.1231655,38.8467492 60.1288288,41.7931046 63.7645326,41.0970083 C69.3684146,40.0191072 71.1574954,34.3876581 71.1027409,31.0743901 C70.9394727,20.8424636 61.1118228,13.2952321 51.9269916,0.18019726 L51.9269916,0.18019726 Z" id="path7155-4-0"></path>
            <path d="M9.48671996,17.4033295 C5.19535497,22.867934 0.60373581,26.012603 0.52747762,30.2759124 C0.501593638,31.6564324 1.33774579,34.0028729 3.95601004,34.4520016 C5.65469609,34.7420409 7.99341335,33.5143904 8.04229425,31.0202937 C8.03233887,30.5237371 8.63105527,30.5366457 8.62548026,31.2170424 C8.54583724,33.1843694 7.84806484,35.4748693 6.6759187,37.3393563 L12.2975212,37.3393563 C11.1253751,35.4748693 10.4279013,33.1843694 10.3479597,31.2170424 C10.3380043,30.5366457 10.9386122,30.5237371 10.9311457,31.0202937 C10.979927,33.5143904 13.3187438,34.7420409 15.0174299,34.4520016 C17.6356941,34.0028729 18.4715476,31.6564324 18.4459623,30.2759124 C18.3693059,26.012603 13.7779854,22.867934 9.48671996,17.4033295 L9.48671996,17.4033295 Z" id="path7157-2-9"></path>
            <path d="M197.43877,228.590287 C193.147405,223.125682 188.555786,219.981013 188.479527,215.717704 C188.453643,214.337184 189.289796,211.990743 191.90806,211.541614 C193.606746,211.251575 195.945463,212.479226 195.994344,214.973322 C195.984389,215.469879 196.583105,215.45697 196.57753,214.776574 C196.497887,212.809247 195.800115,210.518747 194.627969,208.65426 L200.249571,208.65426 C199.077425,210.518747 198.379951,212.809247 198.30001,214.776574 C198.290054,215.45697 198.890662,215.469879 198.883196,214.973322 C198.931977,212.479226 201.270794,211.251575 202.96948,211.541614 C205.587744,211.990743 206.423597,214.337184 206.398012,215.717704 C206.321356,219.981013 201.730035,223.125682 197.43877,228.590287 L197.43877,228.590287 Z" id="path7162-7-0"></path>
            <path d="M154.997801,0.18019726 C145.81297,13.2952321 135.98532,20.8424636 135.822052,31.0743901 C135.767297,34.3876581 137.556378,40.0191072 143.16026,41.0970083 C146.795964,41.7931046 151.801627,38.8467492 151.906159,32.8609173 C151.89023,31.6691915 153.16641,31.7001621 153.154464,33.333122 C152.983231,38.0546909 151.490522,43.5518908 148.981767,48.0266616 L161.013836,48.0266616 C158.505081,43.5518908 157.012371,38.0546909 156.841139,33.333122 C156.829193,31.7001621 158.105372,31.6691915 158.089444,32.8609173 C158.193975,38.8467492 163.199639,41.7931046 166.835342,41.0970083 C172.439224,40.0191072 174.228305,34.3876581 174.173551,31.0743901 C174.010282,20.8424636 164.182632,13.2952321 154.997801,0.18019726 L154.997801,0.18019726 Z" id="path7164-8-3"></path>
            <path d="M103.462396,49.6267969 C94.2775653,62.7418317 84.4499153,70.2890632 84.2866472,80.5209897 C84.2318926,83.8342577 86.0209735,89.4657068 91.6248554,90.5436079 C95.2605592,91.2397042 100.266223,88.2933488 100.370754,82.3075169 C100.354825,81.1157911 101.631005,81.1467617 101.619059,82.7797216 C101.447826,87.5012905 99.955117,92.9984904 97.4463619,97.4732612 L109.478431,97.4732612 C106.969676,92.9984904 105.476967,87.5012905 105.305734,82.7797216 C105.293788,81.1467617 106.569968,81.1157911 106.554039,82.3075169 C106.65857,88.2933488 111.664234,91.2397042 115.299937,90.5436079 C120.903819,89.4657068 122.6929,83.8342577 122.638146,80.5209897 C122.474878,70.2890632 112.647228,62.7418317 103.462396,49.6267969 L103.462396,49.6267969 Z" id="path7168-3-2"></path>
            <path d="M51.9269916,99.0735061 C42.7421604,112.188541 32.9145105,119.735772 32.7512423,129.967699 C32.6964877,133.280967 34.4855686,138.912416 40.0894505,139.990317 C43.7251544,140.686413 48.7308177,137.740058 48.8353491,131.754226 C48.8194205,130.5625 50.0956004,130.593471 50.0836539,132.226431 C49.9124214,136.948 48.4197121,142.4452 45.910957,146.91997 L57.9430261,146.91997 C55.434271,142.4452 53.9415618,136.948 53.7703293,132.226431 C53.7583828,130.593471 55.0345626,130.5625 55.018634,131.754226 C55.1231655,137.740058 60.1288288,140.686413 63.7645326,139.990317 C69.3684146,138.912416 71.1574954,133.280967 71.1027409,129.967699 C70.9394727,119.735772 61.1118228,112.188541 51.9269916,99.0735061 L51.9269916,99.0735061 Z" id="path7174-5-0"></path>
            <path d="M51.9269916,245.813289 C42.7421604,232.698254 32.9145105,225.151023 32.7512423,214.919096 C32.6964877,211.605828 34.4855686,205.974379 40.0894505,204.896478 C43.7251544,204.200382 48.7308177,207.146737 48.8353491,213.132569 C48.8194205,214.324295 50.0956004,214.293324 50.0836539,212.660364 C49.9124214,207.938796 48.4197121,202.441596 45.910957,197.966825 L57.9430261,197.966825 C55.434271,202.441596 53.9415618,207.938796 53.7703293,212.660364 C53.7583828,214.293324 55.0345626,214.324295 55.018634,213.132569 C55.1231655,207.146737 60.1288288,204.200382 63.7645326,204.896478 C69.3684146,205.974379 71.1574954,211.605828 71.1027409,214.919096 C70.9394727,225.151023 61.1118228,232.698254 51.9269916,245.813289 L51.9269916,245.813289 Z" id="path7176-7-0"></path>
            <path d="M154.997801,245.813289 C145.81297,232.698254 135.98532,225.151023 135.822052,214.919096 C135.767297,211.605828 137.556378,205.974379 143.16026,204.896478 C146.795964,204.200382 151.801627,207.146737 151.906159,213.132569 C151.89023,214.324295 153.16641,214.293324 153.154464,212.660364 C152.983231,207.938796 151.490522,202.441596 148.981767,197.966825 L161.013836,197.966825 C158.505081,202.441596 157.012371,207.938796 156.841139,212.660364 C156.829193,214.293324 158.105372,214.324295 158.089444,213.132569 C158.193975,207.146737 163.199639,204.200382 166.835342,204.896478 C172.439224,205.974379 174.228305,211.605828 174.173551,214.919096 C174.010282,225.151023 164.182632,232.698254 154.997801,245.813289 L154.997801,245.813289 Z" id="path7178-9-4"></path>
            <path d="M103.462396,196.36669 C94.2775653,183.251655 84.4499153,175.704423 84.2866472,165.472497 C84.2318926,162.159229 86.0209735,156.52778 91.6248554,155.449879 C95.2605592,154.753782 100.266223,157.700138 100.370754,163.68597 C100.354825,164.877695 101.631005,164.846725 101.619059,163.213765 C101.447826,158.492196 99.955117,152.994996 97.4463619,148.520215 L109.478431,148.520215 C106.969676,152.994996 105.476967,158.492196 105.305734,163.213765 C105.293788,164.846725 106.569968,164.877695 106.554039,163.68597 C106.65857,157.700138 111.664234,154.753782 115.299937,155.449879 C120.903819,156.52778 122.6929,162.159229 122.638146,165.472497 C122.474878,175.704423 112.647228,183.251655 103.462396,196.36669 L103.462396,196.36669 Z" id="path7180-5-1"></path>
            <path d="M154.997801,99.0735061 C145.81297,112.188541 135.98532,119.735772 135.822052,129.967699 C135.767297,133.280967 137.556378,138.912416 143.16026,139.990317 C146.795964,140.686413 151.801627,137.740058 151.906159,131.754226 C151.89023,130.5625 153.16641,130.593471 153.154464,132.226431 C152.983231,136.948 151.490522,142.4452 148.981767,146.91997 L161.013836,146.91997 C158.505081,142.4452 157.012371,136.948 156.841139,132.226431 C156.829193,130.593471 158.105372,130.5625 158.089444,131.754226 C158.193975,137.740058 163.199639,140.686413 166.835342,139.990317 C172.439224,138.912416 174.228305,133.280967 174.173551,129.967699 C174.010282,119.735772 164.182632,112.188541 154.997801,99.0735061 L154.997801,99.0735061 Z" id="path7189-7-7"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};