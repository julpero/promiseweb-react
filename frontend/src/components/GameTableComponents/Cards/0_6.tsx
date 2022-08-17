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
        <g id="Spades" transform="translate(10.000000, 26.000000)" fill="#000000">
          <g id="6" transform="translate(0.000000, 9.000000)" >
            <path d="M51.7166345,0.18019726 C42.5318033,13.2952321 32.7041534,20.8424636 32.5408852,31.0743901 C32.4861306,34.3876581 34.2752115,40.0191072 39.8790934,41.0970083 C43.5147972,41.7931046 48.5204605,38.8467492 48.624992,32.8609173 C48.6090634,31.6691915 49.8852432,31.7001621 49.8732968,33.333122 C49.7020643,38.0546909 48.209355,43.5518908 45.7005999,48.0266616 L57.732669,48.0266616 C55.2239139,43.5518908 53.7312046,38.0546909 53.5599721,33.333122 C53.5480257,31.7001621 54.8242055,31.6691915 54.8082769,32.8609173 C54.9128084,38.8467492 59.9184717,41.7931046 63.5541755,41.0970083 C69.1580574,40.0191072 70.9471383,34.3876581 70.8923837,31.0743901 C70.7291156,20.8424636 60.9014656,13.2952321 51.7166345,0.18019726 L51.7166345,0.18019726 Z" id="path7018-7-4"></path>
            <path d="M9.27636283,17.4033295 C4.98499785,22.867934 0.393378686,26.012603 0.317120495,30.2759124 C0.291236514,31.6564324 1.12738866,34.0028729 3.74565292,34.4520016 C5.44433896,34.7420409 7.78305622,33.5143904 7.83193713,31.0202937 C7.82198175,30.5237371 8.42069814,30.5366457 8.41512313,31.2170424 C8.33548011,33.1843694 7.63770771,35.4748693 6.46556158,37.3393563 L12.0871641,37.3393563 C10.915018,35.4748693 10.2175442,33.1843694 10.1376025,31.2170424 C10.1276472,30.5366457 10.7282551,30.5237371 10.7207885,31.0202937 C10.7695699,33.5143904 13.1083867,34.7420409 14.8070727,34.4520016 C17.425337,34.0028729 18.2611905,31.6564324 18.2356052,30.2759124 C18.1589488,26.012603 13.5676283,22.867934 9.27636283,17.4033295 L9.27636283,17.4033295 Z" id="path7020-0-8"></path>
            <path d="M197.228413,228.590287 C192.937048,223.125682 188.345429,219.981013 188.26917,215.717704 C188.243286,214.337184 189.079439,211.990743 191.697703,211.541614 C193.396389,211.251575 195.735106,212.479226 195.783987,214.973322 C195.774032,215.469879 196.372748,215.45697 196.367173,214.776574 C196.28753,212.809247 195.589758,210.518747 194.417611,208.65426 L200.039214,208.65426 C198.867068,210.518747 198.169594,212.809247 198.089652,214.776574 C198.079697,215.45697 198.680305,215.469879 198.672838,214.973322 C198.72162,212.479226 201.060437,211.251575 202.759123,211.541614 C205.377387,211.990743 206.21324,214.337184 206.187655,215.717704 C206.110999,219.981013 201.519678,223.125682 197.228413,228.590287 L197.228413,228.590287 Z" id="path7024-7-1"></path>
            <path d="M154.787444,0.18019726 C145.602613,13.2952321 135.774963,20.8424636 135.611695,31.0743901 C135.55694,34.3876581 137.346021,40.0191072 142.949903,41.0970083 C146.585607,41.7931046 151.59127,38.8467492 151.695802,32.8609173 C151.679873,31.6691915 152.956053,31.7001621 152.944107,33.333122 C152.772874,38.0546909 151.280165,43.5518908 148.77141,48.0266616 L160.803479,48.0266616 C158.294724,43.5518908 156.802014,38.0546909 156.630782,33.333122 C156.618835,31.7001621 157.895015,31.6691915 157.879087,32.8609173 C157.983618,38.8467492 162.989281,41.7931046 166.624985,41.0970083 C172.228867,40.0191072 174.017948,34.3876581 173.963193,31.0743901 C173.799925,20.8424636 163.972275,13.2952321 154.787444,0.18019726 L154.787444,0.18019726 Z" id="path7026-2-6"></path>
            <path d="M51.7166345,99.0735061 C42.5318033,112.188541 32.7041534,119.735772 32.5408852,129.967699 C32.4861306,133.280967 34.2752115,138.912416 39.8790934,139.990317 C43.5147972,140.686413 48.5204605,137.740058 48.624992,131.754226 C48.6090634,130.5625 49.8852432,130.593471 49.8732968,132.226431 C49.7020643,136.948 48.209355,142.4452 45.7005999,146.91997 L57.732669,146.91997 C55.2239139,142.4452 53.7312046,136.948 53.5599721,132.226431 C53.5480257,130.593471 54.8242055,130.5625 54.8082769,131.754226 C54.9128084,137.740058 59.9184717,140.686413 63.5541755,139.990317 C69.1580574,138.912416 70.9471383,133.280967 70.8923837,129.967699 C70.7291156,119.735772 60.9014656,112.188541 51.7166345,99.0735061 L51.7166345,99.0735061 Z" id="path7036-9-6"></path>
            <path d="M51.7166345,245.813289 C42.5318033,232.698254 32.7041534,225.151023 32.5408852,214.919096 C32.4861306,211.605828 34.2752115,205.974379 39.8790934,204.896478 C43.5147972,204.200382 48.5204605,207.146737 48.624992,213.132569 C48.6090634,214.324295 49.8852432,214.293324 49.8732968,212.660364 C49.7020643,207.938796 48.209355,202.441596 45.7005999,197.966825 L57.732669,197.966825 C55.2239139,202.441596 53.7312046,207.938796 53.5599721,212.660364 C53.5480257,214.293324 54.8242055,214.324295 54.8082769,213.132569 C54.9128084,207.146737 59.9184717,204.200382 63.5541755,204.896478 C69.1580574,205.974379 70.9471383,211.605828 70.8923837,214.919096 C70.7291156,225.151023 60.9014656,232.698254 51.7166345,245.813289 L51.7166345,245.813289 Z" id="path7038-9-6"></path>
            <path d="M154.787444,245.813289 C145.602613,232.698254 135.774963,225.151023 135.611695,214.919096 C135.55694,211.605828 137.346021,205.974379 142.949903,204.896478 C146.585607,204.200382 151.59127,207.146737 151.695802,213.132569 C151.679873,214.324295 152.956053,214.293324 152.944107,212.660364 C152.772874,207.938796 151.280165,202.441596 148.77141,197.966825 L160.803479,197.966825 C158.294724,202.441596 156.802014,207.938796 156.630782,212.660364 C156.618835,214.293324 157.895015,214.324295 157.879087,213.132569 C157.983618,207.146737 162.989281,204.200382 166.624985,204.896478 C172.228867,205.974379 174.017948,211.605828 173.963193,214.919096 C173.799925,225.151023 163.972275,232.698254 154.787444,245.813289 L154.787444,245.813289 Z" id="path7040-0-9"></path>
            <path d="M154.787444,99.0735061 C145.602613,112.188541 135.774963,119.735772 135.611695,129.967699 C135.55694,133.280967 137.346021,138.912416 142.949903,139.990317 C146.585607,140.686413 151.59127,137.740058 151.695802,131.754226 C151.679873,130.5625 152.956053,130.593471 152.944107,132.226431 C152.772874,136.948 151.280165,142.4452 148.77141,146.91997 L160.803479,146.91997 C158.294724,142.4452 156.802014,136.948 156.630782,132.226431 C156.618835,130.593471 157.895015,130.5625 157.879087,131.754226 C157.983618,137.740058 162.989281,140.686413 166.624985,139.990317 C172.228867,138.912416 174.017948,133.280967 173.963193,129.967699 C173.799925,119.735772 163.972275,112.188541 154.787444,99.0735061 L154.787444,99.0735061 Z" id="path7050-2-9"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
