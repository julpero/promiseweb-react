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
        <g id="Spades" transform="translate(10.000000, 26.000000)" fill="#000000">
          <g id="5" transform="translate(1.000000, 9.000000)" >
            <path d="M154.677853,197.963646 C145.493022,211.078681 135.665372,218.625913 135.502104,228.857839 C135.447349,232.171107 137.23643,237.802556 142.840312,238.880457 C146.476016,239.576554 151.481679,236.630198 151.586211,230.644366 C151.570282,229.45264 152.846462,229.483611 152.834515,231.116571 C152.663283,235.83814 151.170574,241.33534 148.661819,245.810111 L160.693888,245.810111 C158.185133,241.33534 156.692423,235.83814 156.521191,231.116571 C156.509244,229.483611 157.785424,229.45264 157.769496,230.644366 C157.874027,236.630198 162.87969,239.576554 166.515394,238.880457 C172.119276,237.802556 173.908357,232.171107 173.853602,228.857839 C173.690334,218.625913 163.862684,211.078681 154.677853,197.963646 L154.677853,197.963646 Z" id="path6950-9-9" transform="translate(154.677853, 221.886878) scale(-1, -1) translate(-154.677853, -221.886878) "></path>
            <path d="M197.118138,208.650951 C192.826773,214.115556 188.235154,217.260225 188.158895,221.523534 C188.133011,222.904054 188.969163,225.250495 191.587428,225.699624 C193.286114,225.989663 195.624831,224.762012 195.673712,222.267916 C195.663757,221.771359 196.262473,221.784268 196.256898,222.464664 C196.177255,224.431991 195.479483,226.722491 194.307336,228.586978 L199.928939,228.586978 C198.756793,226.722491 198.059319,224.431991 197.979377,222.464664 C197.969422,221.784268 198.57003,221.771359 198.562563,222.267916 C198.611345,224.762012 200.950162,225.989663 202.648848,225.699624 C205.267112,225.250495 206.102965,222.904054 206.07738,221.523534 C206.000724,217.260225 201.409403,214.115556 197.118138,208.650951 L197.118138,208.650951 Z" id="path6952-6-0" transform="translate(197.118131, 218.618965) scale(-1, -1) translate(-197.118131, -218.618965) "></path>
            <path d="M9.16608779,37.336048 C4.87472281,31.8714435 0.283103647,28.7267745 0.206845457,24.4634652 C0.180961475,23.0829452 1.01711362,20.7365047 3.63537788,20.2873759 C5.33406393,19.9973366 7.67278118,21.2249872 7.72166209,23.7190838 C7.71170671,24.2156404 8.31042311,24.2027318 8.3048481,23.5223352 C8.22520508,21.5550082 7.52743267,19.2645082 6.35528654,17.4000212 L11.976889,17.4000212 C10.8047429,19.2645082 10.1072692,21.5550082 10.0273275,23.5223352 C10.0173721,24.2027318 10.61798,24.2156404 10.6105135,23.7190838 C10.6592949,21.2249872 12.9981117,19.9973366 14.6967977,20.2873759 C17.315062,20.7365047 18.1509155,23.0829452 18.1253301,24.4634652 C18.0486737,28.7267745 13.4573532,31.8714435 9.16608779,37.336048 L9.16608779,37.336048 Z" id="path6956-5-0" transform="translate(9.166081, 27.368035) scale(-1, -1) translate(-9.166081, -27.368035) "></path>
            <path d="M51.6070434,197.963646 C42.4222122,211.078681 32.5945623,218.625913 32.4312941,228.857839 C32.3765395,232.171107 34.1656204,237.802556 39.7695024,238.880457 C43.4052062,239.576554 48.4108695,236.630198 48.515401,230.644366 C48.4994724,229.45264 49.7756522,229.483611 49.7637057,231.116571 C49.5924732,235.83814 48.099764,241.33534 45.5910088,245.810111 L57.623078,245.810111 C55.1143229,241.33534 53.6216136,235.83814 53.4503811,231.116571 C53.4384346,229.483611 54.7146145,229.45264 54.6986859,230.644366 C54.8032173,236.630198 59.8088806,239.576554 63.4445845,238.880457 C69.0484664,237.802556 70.8375473,232.171107 70.7827927,228.857839 C70.6195245,218.625913 60.7918746,211.078681 51.6070434,197.963646 L51.6070434,197.963646 Z" id="path6958-4-1" transform="translate(51.607043, 221.886878) scale(-1, -1) translate(-51.607043, -221.886878) "></path>
            <path d="M154.677853,48.0234829 C145.493022,34.908448 135.665372,27.3612165 135.502104,17.12929 C135.447349,13.816022 137.23643,8.1845729 142.840312,7.1066718 C146.476016,6.41057552 151.481679,9.35693089 151.586211,15.3427628 C151.570282,16.5344887 152.846462,16.503518 152.834515,14.8705581 C152.663283,10.1489892 151.170574,4.65178934 148.661819,0.177018536 L160.693888,0.177018536 C158.185133,4.65178934 156.692423,10.1489892 156.521191,14.8705581 C156.509244,16.503518 157.785424,16.5344887 157.769496,15.3427628 C157.874027,9.35693089 162.87969,6.41057552 166.515394,7.1066718 C172.119276,8.1845729 173.908357,13.816022 173.853602,17.12929 C173.690334,27.3612165 163.862684,34.908448 154.677853,48.0234829 L154.677853,48.0234829 Z" id="path6970-5-5" transform="translate(154.677853, 24.100251) scale(-1, -1) translate(-154.677853, -24.100251) "></path>
            <path d="M51.6070434,48.0234829 C42.4222122,34.908448 32.5945623,27.3612165 32.4312941,17.12929 C32.3765395,13.816022 34.1656204,8.1845729 39.7695024,7.1066718 C43.4052062,6.41057552 48.4108695,9.35693089 48.515401,15.3427628 C48.4994724,16.5344887 49.7756522,16.503518 49.7637057,14.8705581 C49.5924732,10.1489892 48.099764,4.65178934 45.5910088,0.177018536 L57.623078,0.177018536 C55.1143229,4.65178934 53.6216136,10.1489892 53.4503811,14.8705581 C53.4384346,16.503518 54.7146145,16.5344887 54.6986859,15.3427628 C54.8032173,9.35693089 59.8088806,6.41057552 63.4445845,7.1066718 C69.0484664,8.1845729 70.8375473,13.816022 70.7827927,17.12929 C70.6195245,27.3612165 60.7918746,34.908448 51.6070434,48.0234829 L51.6070434,48.0234829 Z" id="path6972-5-8" transform="translate(51.607043, 24.100251) scale(-1, -1) translate(-51.607043, -24.100251) "></path>
            <path d="M103.142448,99.0703374 C93.9576171,112.185372 84.1299672,119.732604 83.966699,129.96453 C83.9119444,133.277798 85.7010253,138.909247 91.3049072,139.987148 C94.9406111,140.683245 99.9462744,137.736889 100.050806,131.751057 C100.034877,130.559332 101.311057,130.590302 101.299111,132.223262 C101.127878,136.944831 99.6351688,142.442031 97.1264137,146.916802 L109.158483,146.916802 C106.649728,142.442031 105.157018,136.944831 104.985786,132.223262 C104.97384,130.590302 106.250019,130.559332 106.234091,131.751057 C106.338622,137.736889 111.344286,140.683245 114.979989,139.987148 C120.583871,138.909247 122.372952,133.277798 122.318198,129.96453 C122.154929,119.732604 112.327279,112.185372 103.142448,99.0703374 L103.142448,99.0703374 Z" id="path6980-6-3" transform="translate(103.142448, 122.993570) scale(-1, -1) translate(-103.142448, -122.993570) "></path>
          </g>
        </g>
      </g>
    </svg>
  );
};
