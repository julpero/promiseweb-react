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
          <g id="10" transform="translate(1.000000, 9.000000)" >
            <path d="M52.1327456,0.180226792 C42.9479144,13.2952616 33.1202645,20.8424931 32.9569963,31.0744197 C32.9022417,34.3876876 34.6913226,40.0191367 40.2952046,41.0970378 C43.9309084,41.7931341 48.9365717,38.8467788 49.0411032,32.8609468 C49.0251746,31.669221 50.3013544,31.7001916 50.2894079,33.3331516 C50.1181754,38.0547204 48.6254662,43.5519203 46.116711,48.0266911 L58.1487802,48.0266911 C55.6400251,43.5519203 54.1473158,38.0547204 53.9760833,33.3331516 C53.9641368,31.7001916 55.2403167,31.669221 55.2243881,32.8609468 C55.3289195,38.8467788 60.3345828,41.7931341 63.9702867,41.0970378 C69.5741686,40.0191367 71.3632495,34.3876876 71.3084949,31.0744197 C71.1452267,20.8424931 61.3175768,13.2952616 52.1327456,0.180226792 L52.1327456,0.180226792 Z" id="path7293-3-2"></path>
            <path d="M9.69247399,17.4033591 C5.401109,22.8679636 0.809489839,26.0126326 0.733231648,30.2759419 C0.707347667,31.6564619 1.54349981,34.0029024 4.16176407,34.4520312 C5.86045012,34.7420705 8.19916738,33.5144199 8.24804828,31.0203233 C8.2380929,30.5237667 8.8368093,30.5366752 8.83123429,31.2170719 C8.75159127,33.1843989 8.05381887,35.4748989 6.88167273,37.3393859 L12.5032752,37.3393859 C11.3311291,35.4748989 10.6336554,33.1843989 10.5537137,31.2170719 C10.5437583,30.5366752 11.1443662,30.5237667 11.1368997,31.0203233 C11.185681,33.5144199 13.5244979,34.7420705 15.2231839,34.4520312 C17.8414482,34.0029024 18.6773016,31.6564619 18.6517163,30.2759419 C18.5750599,26.0126326 13.9837394,22.8679636 9.69247399,17.4033591 L9.69247399,17.4033591 Z" id="path7295-4-8"></path>
            <path d="M52.1327456,179.88444 C42.9479144,166.769405 33.1202645,159.222173 32.9569963,148.990247 C32.9022417,145.676979 34.6913226,140.04553 40.2952046,138.967629 C43.9309084,138.271532 48.9365717,141.217888 49.0411032,147.20372 C49.0251746,148.395445 50.3013544,148.364475 50.2894079,146.731515 C50.1181754,142.009946 48.6254662,136.512746 46.116711,132.037975 L58.1487802,132.037975 C55.6400251,136.512746 54.1473158,142.009946 53.9760833,146.731515 C53.9641368,148.364475 55.2403167,148.395445 55.2243881,147.20372 C55.3289195,141.217888 60.3345828,138.271532 63.9702867,138.967629 C69.5741686,140.04553 71.3632495,145.676979 71.3084949,148.990247 C71.1452267,159.222173 61.3175768,166.769405 52.1327456,179.88444 L52.1327456,179.88444 Z" id="path7297-5-1"></path>
            <path d="M197.644524,228.590316 C193.353159,223.125712 188.76154,219.981043 188.685282,215.717733 C188.659398,214.337213 189.49555,211.990773 192.113814,211.541644 C193.8125,211.251605 196.151217,212.479255 196.200098,214.973352 C196.190143,215.469909 196.788859,215.457 196.783284,214.776603 C196.703641,212.809276 196.005869,210.518776 194.833723,208.654289 L200.455325,208.654289 C199.283179,210.518776 198.585705,212.809276 198.505764,214.776603 C198.495808,215.457 199.096416,215.469909 199.08895,214.973352 C199.137731,212.479255 201.476548,211.251605 203.175234,211.541644 C205.793498,211.990773 206.629351,214.337213 206.603766,215.717733 C206.52711,219.981043 201.935789,223.125712 197.644524,228.590316 L197.644524,228.590316 Z" id="path7299-3-5"></path>
            <path d="M155.203555,0.180226792 C146.018724,13.2952616 136.191074,20.8424931 136.027806,31.0744197 C135.973051,34.3876876 137.762132,40.0191367 143.366014,41.0970378 C147.001718,41.7931341 152.007381,38.8467788 152.111913,32.8609468 C152.095984,31.669221 153.372164,31.7001916 153.360218,33.3331516 C153.188985,38.0547204 151.696276,43.5519203 149.187521,48.0266911 L161.21959,48.0266911 C158.710835,43.5519203 157.218126,38.0547204 157.046893,33.3331516 C157.034947,31.7001916 158.311126,31.669221 158.295198,32.8609468 C158.399729,38.8467788 163.405393,41.7931341 167.041096,41.0970378 C172.644978,40.0191367 174.434059,34.3876876 174.379305,31.0744197 C174.216036,20.8424931 164.388387,13.2952616 155.203555,0.180226792 L155.203555,0.180226792 Z" id="path7301-4-0"></path>
            <path d="M52.1327456,66.109096 C42.9479144,79.2241309 33.1202645,86.7713624 32.9569963,97.0032889 C32.9022417,100.316557 34.6913226,105.948006 40.2952046,107.025907 C43.9309084,107.722003 48.9365717,104.775648 49.0411032,98.7898161 C49.0251746,97.5980902 50.3013544,97.6290609 50.2894079,99.2620208 C50.1181754,103.98359 48.6254662,109.48079 46.116711,113.95556 L58.1487802,113.95556 C55.6400251,109.48079 54.1473158,103.98359 53.9760833,99.2620208 C53.9641368,97.6290609 55.2403167,97.5980902 55.2243881,98.7898161 C55.3289195,104.775648 60.3345828,107.722003 63.9702867,107.025907 C69.5741686,105.948006 71.3632495,100.316557 71.3084949,97.0032889 C71.1452267,86.7713624 61.3175768,79.2241309 52.1327456,66.109096 L52.1327456,66.109096 Z" id="path7303-7-8"></path>
            <path d="M103.66815,42.6842646 C94.4833193,55.7992994 84.6556694,63.3465309 84.4924012,73.5784574 C84.4376466,76.8917254 86.2267275,82.5231745 91.8306094,83.6010756 C95.4663132,84.2971719 100.471977,81.3508165 100.576508,75.3649846 C100.560579,74.1732588 101.836759,74.2042294 101.824813,75.8371893 C101.65358,80.5587582 100.160871,86.0559581 97.6521159,90.5307289 L109.684185,90.5307289 C107.17543,86.0559581 105.682721,80.5587582 105.511488,75.8371893 C105.499542,74.2042294 106.775722,74.1732588 106.759793,75.3649846 C106.864324,81.3508165 111.869988,84.2971719 115.505692,83.6010756 C121.109573,82.5231745 122.898654,76.8917254 122.8439,73.5784574 C122.680632,63.3465309 112.852982,55.7992994 103.66815,42.6842646 L103.66815,42.6842646 Z" id="path7305-6-7"></path>
            <path d="M155.203555,66.109096 C146.018724,79.2241309 136.191074,86.7713624 136.027806,97.0032889 C135.973051,100.316557 137.762132,105.948006 143.366014,107.025907 C147.001718,107.722003 152.007381,104.775648 152.111913,98.7898161 C152.095984,97.5980902 153.372164,97.6290609 153.360218,99.2620208 C153.188985,103.98359 151.696276,109.48079 149.187521,113.95556 L161.21959,113.95556 C158.710835,109.48079 157.218126,103.98359 157.046893,99.2620208 C157.034947,97.6290609 158.311126,97.5980902 158.295198,98.7898161 C158.399729,104.775648 163.405393,107.722003 167.041096,107.025907 C172.644978,105.948006 174.434059,100.316557 174.379305,97.0032889 C174.216036,86.7713624 164.388387,79.2241309 155.203555,66.109096 L155.203555,66.109096 Z" id="path7309-8-5"></path>
            <path d="M52.1327456,245.813319 C42.9479144,232.698284 33.1202645,225.151052 32.9569963,214.919126 C32.9022417,211.605858 34.6913226,205.974409 40.2952046,204.896508 C43.9309084,204.200411 48.9365717,207.146767 49.0411032,213.132599 C49.0251746,214.324325 50.3013544,214.293354 50.2894079,212.660394 C50.1181754,207.938825 48.6254662,202.441625 46.116711,197.966854 L58.1487802,197.966854 C55.6400251,202.441625 54.1473158,207.938825 53.9760833,212.660394 C53.9641368,214.293354 55.2403167,214.324325 55.2243881,213.132599 C55.3289195,207.146767 60.3345828,204.200411 63.9702867,204.896508 C69.5741686,205.974409 71.3632495,211.605858 71.3084949,214.919126 C71.1452267,225.151052 61.3175768,232.698284 52.1327456,245.813319 L52.1327456,245.813319 Z" id="path7313-6-8"></path>
            <path d="M155.203555,245.813319 C146.018724,232.698284 136.191074,225.151052 136.027806,214.919126 C135.973051,211.605858 137.762132,205.974409 143.366014,204.896508 C147.001718,204.200411 152.007381,207.146767 152.111913,213.132599 C152.095984,214.324325 153.372164,214.293354 153.360218,212.660394 C153.188985,207.938825 151.696276,202.441625 149.187521,197.966854 L161.21959,197.966854 C158.710835,202.441625 157.218126,207.938825 157.046893,212.660394 C157.034947,214.293354 158.311126,214.324325 158.295198,213.132599 C158.399729,207.146767 163.405393,204.200411 167.041096,204.896508 C172.644978,205.974409 174.434059,211.605858 174.379305,214.919126 C174.216036,225.151052 164.388387,232.698284 155.203555,245.813319 L155.203555,245.813319 Z" id="path7315-7-3"></path>
            <path d="M103.66815,203.309281 C94.4833193,190.194246 84.6556694,182.647015 84.4924012,172.415088 C84.4376466,169.10182 86.2267275,163.470371 91.8306094,162.39247 C95.4663132,161.696374 100.471977,164.642729 100.576508,170.628561 C100.560579,171.820287 101.836759,171.789316 101.824813,170.156356 C101.65358,165.434787 100.160871,159.937588 97.6521159,155.462807 L109.684185,155.462807 C107.17543,159.937588 105.682721,165.434787 105.511488,170.156356 C105.499542,171.789316 106.775722,171.820287 106.759793,170.628561 C106.864324,164.642729 111.869988,161.696374 115.505692,162.39247 C121.109573,163.470371 122.898654,169.10182 122.8439,172.415088 C122.680632,182.647015 112.852982,190.194246 103.66815,203.309281 L103.66815,203.309281 Z" id="path7317-0-2"></path>
            <path d="M155.203555,179.88444 C146.018724,166.769415 136.191074,159.222183 136.027806,148.990257 C135.973051,145.676989 137.762132,140.04554 143.366014,138.967638 C147.001718,138.271542 152.007381,141.217898 152.111913,147.20373 C152.095984,148.395455 153.372164,148.364485 153.360218,146.731525 C153.188985,142.009956 151.696276,136.512746 149.187521,132.037975 L161.21959,132.037975 C158.710835,136.512746 157.218126,142.009956 157.046893,146.731525 C157.034947,148.364485 158.311126,148.395455 158.295198,147.20373 C158.399729,141.217898 163.405393,138.271542 167.041096,138.967638 C172.644978,140.04554 174.434059,145.676989 174.379305,148.990257 C174.216036,159.222183 164.388387,166.769415 155.203555,179.88444 L155.203555,179.88444 Z" id="path7319-5-6"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
