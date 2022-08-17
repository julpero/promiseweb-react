import React from "react";
import "./card.css";

interface IProps {
	title: string,
	text: string,
  suite: string,
}

export const xxx = ({title, text, suite}: IProps) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 227 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>{title}</title>
      <text className={`noHover ${suite}`} transform="translate(3.000000, 46.000000)" fontSize={35}>{text}</text>
      <text className={`noHover ${suite}`} transform="translate(221.000000, 268.000000)" fontSize={35} rotate={180}>{text}</text>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Clubs" transform="translate(9.000000, 23.000000)" fill="#006400">
          <g id="A" transform="translate(0.000000, 28.000000)" >
            <path d="M104.645078,82.5288151 C94.8706266,82.7410755 90.4876992,93.7461075 97.7267184,102.292145 C98.7766254,103.538677 98.8849351,104.254019 96.9621506,103.056666 C92.0883146,99.7974696 82.7429315,101.940044 82.2643829,111.903964 C81.6732346,124.180938 98.8271852,127.718265 102.048036,114.663639 C102.218075,113.286277 103.337442,113.317707 103.067553,115.272801 C102.773884,120.579221 101.116729,125.538881 98.8389452,130.375361 L110.459102,130.375361 C108.181428,125.538881 106.524163,120.579221 106.230484,115.272801 C105.960595,113.317707 107.079971,113.286277 107.250011,114.663639 C110.470862,127.718265 127.624812,124.180938 127.033664,111.903964 C126.555215,101.940044 117.209732,99.7974696 112.335896,103.056666 C110.413122,104.254019 110.521432,103.538677 111.571329,102.292145 C118.810358,93.7461075 114.42742,82.7410855 104.653058,82.5288151 C104.653058,82.5287551 104.653058,82.5288651 104.643058,82.5288151 L104.645078,82.5288151 Z" id="path147-0-8-1-6-1-1-0-9-1-8"></path>
            <path d="M197.626778,211.631343 C201.536547,211.542943 203.289781,206.957464 200.39417,203.396627 C199.974151,202.877236 199.930841,202.579165 200.699999,203.078066 C202.649553,204.436069 206.387683,203.543327 206.579122,199.391689 C206.815561,194.276289 199.953941,192.802406 198.665615,198.241826 C198.597915,198.815738 198.149836,198.802638 198.257846,197.988016 C198.375326,195.777002 199.038154,193.710477 199.949261,191.695283 L195.301404,191.695283 C196.212522,193.710477 196.87535,195.777002 196.99282,197.988016 C197.100839,198.802638 196.653051,198.815738 196.585051,198.241826 C195.296735,192.802406 188.435104,194.276289 188.671544,199.391689 C188.862983,203.543327 192.601122,204.436069 194.550677,203.078066 C195.319824,202.579165 195.276525,202.877236 194.856506,203.396627 C191.960894,206.957464 193.714129,211.542883 197.623788,211.631343 C197.624788,211.631363 197.623788,211.631323 197.623788,211.631343 L197.626778,211.631343 Z" id="path147-6-9-8-7-0-5-0-8-3"></path>
            <path d="M9.6723791,0.444000888 C5.76262036,0.532001064 4.00938541,5.11781024 6.90499707,8.67871736 C7.32500586,9.1981184 7.36831574,9.49611899 6.59916795,8.99721799 C4.64961357,7.63921528 0.911484335,8.53201706 0.720044886,12.6836254 C0.483605567,17.7990356 7.34521581,19.2729385 8.6335421,13.8335277 C8.7012419,13.2596265 9.14933061,13.2727265 9.04131092,14.0873282 C8.92384126,16.2983326 8.26101317,18.3648367 7.34989579,20.3800408 L11.9977524,20.3800408 C11.086635,18.3648367 10.4238069,16.2983326 10.3063373,14.0873282 C10.1983276,13.2727265 10.6461163,13.2596265 10.7141061,13.8335277 C12.0024324,19.2729385 18.8640526,17.7990356 18.6276133,12.6836254 C18.4361739,8.53201706 14.6980446,7.63921528 12.7484802,8.99721799 C11.9793325,9.49611899 12.0226423,9.1981184 12.4426611,8.67871736 C15.3382728,5.11781024 13.5850378,0.532401065 9.67536909,0.444000888 C9.6743691,0.444000888 9.67536909,0.444000888 9.67536909,0.444000888 L9.6723791,0.444000888 Z" id="path147-6-9-8-7-4-5-6-8-9"></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
