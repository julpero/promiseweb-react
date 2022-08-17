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
          <g id="7" transform="translate(1.000000, 11.000000)" >
            <path d="M154.530739,0.635367271 C144.756266,0.847567695 140.373379,11.8525897 147.612358,20.3987068 C148.662255,21.6452093 148.770555,22.3605107 146.847861,21.1632083 C141.973974,17.9040018 132.628601,20.0466061 132.150002,30.010526 C131.558904,42.2874506 148.712855,45.8247576 151.933746,32.7701315 C152.103746,31.3928288 153.223243,31.4242288 152.953243,33.3793328 C152.659544,38.6857434 151.002349,43.6454533 148.724555,48.481863 L160.344822,48.481863 C158.067129,43.6454533 156.409834,38.6857434 156.116134,33.3793328 C155.846235,31.4242288 156.965632,31.3928288 157.135631,32.7701315 C160.356522,45.8247576 177.510474,42.2874506 176.919376,30.010526 C176.440877,20.0466061 167.095403,17.9040018 162.221517,21.1632083 C160.298823,22.3605107 160.407122,21.6452093 161.457019,20.3987068 C168.695999,11.8525897 164.313111,0.847567695 154.538739,0.635367271 C154.538739,0.63526727 154.538739,0.635367271 154.528739,0.635367271 L154.530739,0.635367271 Z" id="path147-0-8-1-6-13-2-0-1-5"></path>
            <path d="M51.4602295,0.635367271 C41.6857571,0.847567695 37.3028694,11.8525897 44.541849,20.3987068 C45.5917461,21.6452093 45.7000457,22.3605107 43.7772512,21.1632083 C38.9034649,17.9040018 29.5581913,20.0466061 29.0794926,30.010526 C28.4884943,42.2874506 45.6423459,45.8247576 48.8632368,32.7701315 C49.0332363,31.3928288 50.1526332,31.4242288 49.882734,33.3793328 C49.5890348,38.6857434 47.9318395,43.6454533 45.6540459,48.481863 L57.2743131,48.481863 C54.9966195,43.6454533 53.3393242,38.6857434 53.045625,33.3793328 C52.7757258,31.4242288 53.8951226,31.3928288 54.0651222,32.7701315 C57.2860131,45.8247576 74.4399647,42.2874506 73.8488664,30.010526 C73.3703677,20.0466061 64.0248941,17.9040018 59.1510078,21.1632083 C57.2283132,22.3605107 57.3366129,21.6452093 58.38651,20.3987068 C65.6254896,11.8525897 61.2426019,0.847567695 51.4682295,0.635367271 C51.4682295,0.63526727 51.4682295,0.635367271 51.4582295,0.635367271 L51.4602295,0.635367271 Z" id="path147-0-8-1-6-75-2-83-2-0-7"></path>
            <path d="M154.530739,246.268879 C144.756266,246.056618 140.373379,235.051586 147.612358,226.505559 C148.662255,225.259027 148.770555,224.543675 146.847861,225.741027 C141.973974,229.000224 132.628701,226.85766 132.150002,216.89373 C131.559004,204.616765 148.712855,201.079438 151.933746,214.134064 C152.103746,215.511427 153.223243,215.479997 152.953243,213.524893 C152.659544,208.218472 151.002349,203.258823 148.724555,198.422333 L160.344822,198.422333 C158.067129,203.258823 156.409834,208.218472 156.116134,213.524893 C155.846235,215.479997 156.965632,215.511427 157.135631,214.134064 C160.356522,201.079438 177.510474,204.616765 176.919376,216.89373 C176.440877,226.85766 167.095403,229.000224 162.221517,225.741027 C160.298823,224.543675 160.407122,225.259027 161.457019,226.505559 C168.695999,235.051586 164.313111,246.056608 154.538739,246.268879 C154.538739,246.268939 154.538739,246.268829 154.528739,246.268879 L154.530739,246.268879 Z" id="path147-0-8-1-6-7-5-5-7-7-7-6"></path>
            <path d="M51.4602295,246.268879 C41.6857571,246.056618 37.3028694,235.051586 44.541849,226.505559 C45.5917461,225.259027 45.7000457,224.543675 43.7772512,225.741027 C38.9034649,229.000224 29.5581913,226.85766 29.0794926,216.89373 C28.4884943,204.616765 45.6423459,201.079438 48.8632368,214.134064 C49.0332363,215.511427 50.1526332,215.479997 49.882734,213.524893 C49.5890348,208.218472 47.9318395,203.258823 45.6540459,198.422333 L57.2743131,198.422333 C54.9966195,203.258823 53.3393242,208.218472 53.045625,213.524893 C52.7757258,215.479997 53.8951226,215.511427 54.0651222,214.134064 C57.2860131,201.079438 74.4399647,204.616765 73.8488664,216.89373 C73.3703677,226.85766 64.0248941,229.000224 59.1510078,225.741027 C57.2283132,224.543675 57.3366129,225.259027 58.38651,226.505559 C65.6254896,235.051586 61.2426019,246.056608 51.4682295,246.268879 C51.4682295,246.268939 51.4682295,246.268829 51.4582295,246.268879 L51.4602295,246.268879 Z" id="path147-0-8-1-6-75-6-1-2-9-1-9"></path>
            <path d="M102.995684,50.0822662 C93.2212117,50.2944666 88.8384241,61.2995286 96.0773037,69.8455657 C97.1272007,71.0920982 97.2356004,71.8074396 95.3127058,70.6100872 C90.4390196,67.3508907 81.0936459,69.493465 80.6150473,79.4573749 C80.023949,91.7343495 97.1778006,95.2716765 100.398591,82.2170504 C100.568691,80.8396877 101.688088,80.8711177 101.418189,82.8262117 C101.124489,88.1326423 99.4672941,93.0922922 97.1895005,97.9287719 L108.809668,97.9287719 C106.532074,93.0922922 104.874779,88.1326423 104.58108,82.8262117 C104.31118,80.8711177 105.430577,80.8396877 105.600577,82.2170504 C108.821468,95.2716765 125.975419,91.7343495 125.384321,79.4573749 C124.905822,69.493465 115.560349,67.3508907 110.686462,70.6100872 C108.763768,71.8074396 108.872068,71.0920982 109.921965,69.8455657 C117.160944,61.2995286 112.778057,50.2944666 103.003684,50.0822662 C103.003684,50.0821662 103.003684,50.0822662 102.993684,50.0822662 L102.995684,50.0822662 Z" id="path147-0-8-1-6-2-00-7-2-3-4"></path>
            <path d="M154.530739,99.5288451 C144.756266,99.7410955 140.373379,110.746127 147.612358,119.292165 C148.662255,120.538697 148.770555,121.254039 146.847861,120.056686 C141.973974,116.79749 132.628601,118.940064 132.150002,128.903984 C131.559004,141.180958 148.712855,144.718285 151.933746,131.663659 C152.103746,130.286297 153.223143,130.317727 152.953243,132.272821 C152.659544,137.579251 151.002349,142.538901 148.724555,147.375381 L160.344822,147.375381 C158.067129,142.538901 156.409834,137.579251 156.116134,132.272821 C155.846235,130.317727 156.965632,130.286297 157.135631,131.663659 C160.356522,144.718285 177.510474,141.180958 176.919376,128.903984 C176.440877,118.940064 167.095403,116.79749 162.221517,120.056686 C160.298823,121.254039 160.407122,120.538697 161.457019,119.292165 C168.695999,110.746127 164.313111,99.7411055 154.538739,99.5288451 C154.538739,99.5287851 154.538739,99.5288951 154.528739,99.5288451 L154.530739,99.5288451 Z" id="path147-0-8-1-6-7-5-7-3-0-1-7-4"></path>
            <path d="M51.4602295,99.5288451 C41.6857571,99.7410955 37.3028694,110.746127 44.541849,119.292165 C45.5917461,120.538697 45.7000457,121.254039 43.7772512,120.056686 C38.9034649,116.79749 29.5581913,118.940064 29.0795926,128.903984 C28.4884943,141.180958 45.6423459,144.718285 48.8632368,131.663659 C49.0332363,130.286297 50.1526332,130.317727 49.882734,132.272821 C49.5890348,137.579251 47.9318395,142.538901 45.6540459,147.375381 L57.2743131,147.375381 C54.9966195,142.538901 53.3393242,137.579251 53.045625,132.272821 C52.7757258,130.317727 53.8951226,130.286297 54.0651222,131.663659 C57.2860131,144.718285 74.4399647,141.180958 73.8488664,128.903984 C73.3703677,118.940064 64.0248941,116.79749 59.1510078,120.056686 C57.2283132,121.254039 57.3366129,120.538697 58.38651,119.292165 C65.6254896,110.746127 61.2426019,99.7411055 51.4682295,99.5288451 C51.4682295,99.5287851 51.4682295,99.5288951 51.4582295,99.5288451 L51.4602295,99.5288451 Z" id="path147-0-8-1-6-75-6-6-5-3-9-6-0"></path>
            <path d="M196.977319,228.631363 C200.887008,228.542963 202.640303,223.957484 199.744711,220.396647 C199.324613,219.877256 199.281313,219.579185 200.05051,220.078086 C202.000105,221.436099 205.738194,220.543347 205.929594,216.391709 C206.166093,211.276309 199.304413,209.802426 198.016116,215.241846 C197.948116,215.815758 197.500318,215.802658 197.608317,214.988036 C197.725817,212.777022 198.388615,210.710497 199.299813,208.695303 L194.651926,208.695303 C195.563023,210.710497 196.225821,212.777022 196.343321,214.988036 C196.451321,215.802658 196.003522,215.815758 195.935522,215.241846 C194.647226,209.802426 187.785645,211.276309 188.022044,216.391709 C188.213444,220.543347 191.951633,221.436099 193.901228,220.078086 C194.670326,219.579185 194.627026,219.877256 194.207027,220.396647 C191.311435,223.957484 193.06463,228.542903 196.974319,228.631363 C196.975319,228.631383 196.974319,228.631343 196.974319,228.631363 L196.977319,228.631363 Z" id="path147-6-9-8-7-0-5-6-8-4-3"></path>
            <path d="M9.02284918,17.4440009 C5.1131602,17.5320011 3.35986515,22.1179102 6.25545698,25.6787174 C6.6754558,26.1981184 6.71875567,26.496219 5.94965784,25.997318 C3.99996334,24.6393153 0.261973881,25.5320171 0.0705744209,29.6836254 C-0.165924912,34.7990356 6.69575574,36.2729385 7.98395211,30.8335277 C8.05195191,30.2596265 8.49985065,30.2727265 8.39185095,31.0873282 C8.27425129,33.2983326 7.61155316,35.3648367 6.70035572,37.3800408 L11.3482426,37.3800408 C10.4371452,35.3648367 9.77434706,33.2983326 9.65674739,31.0873282 C9.54884769,30.2727265 9.99654643,30.2596265 10.0646462,30.8335277 C11.3528426,36.2729385 18.2145233,34.7990356 17.9780239,29.6836254 C17.7866245,25.5320171 14.048535,24.6393153 12.0989405,25.997318 C11.3298427,26.496219 11.3731425,26.1981184 11.7930414,25.6787174 C14.6887332,22.1179102 12.9354381,17.5325011 9.02584917,17.4440009 L9.02584917,17.4440009 L9.02284918,17.4440009 Z" id="path147-6-9-8-7-4-5-62-5-2-9"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
