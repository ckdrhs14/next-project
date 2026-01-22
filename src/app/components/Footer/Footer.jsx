'use client';

import React, { useEffect, useState } from 'react'; 
import Link from 'next/link';
import styles from './GnFt.module.scss';

export default function Footer() {

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 500) { 
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <footer className={styles.footer}>
        <div className={styles.inner}>
            <div className={styles.cont}>
                <div className={styles.logo}><img src="/assets/icons/logo_w.svg" alt="밝은성모안과의원" /></div>
                <div className={styles.info_wrap}>
                    <div className={styles.info_top}>
                        <div className={styles.info_link}>
                            <Link href="/">개인정보처리방침</Link>
                            <Link href="/">이용안내</Link>
                            <Link href="/">제휴/광고제안</Link>
                            <Link href="/">환자권리장전</Link>
                            <Link href="/">비급여재료비</Link>
                        </div>
                        <div className={styles.sns_wrap}>
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.8 9">
                                    <g id="레이어_1-2-2" data-name="레이어 1-2">
                                        <path className={styles.snsIco} d="M12.54,1.41a10.31,10.31,0,0,1,.19,1.24,7.38,7.38,0,0,0,.07,1.29V5.09a8.23,8.23,0,0,1-.07,1.26,10.8,10.8,0,0,1-.19,1.27,1.62,1.62,0,0,1-1.15,1.12,14.3,14.3,0,0,1-1.73.19L7.48,9H5.32L3.14,8.93a14.3,14.3,0,0,1-1.73-.19A1.62,1.62,0,0,1,.26,7.62,10.8,10.8,0,0,1,.07,6.35,8.23,8.23,0,0,1,0,5.09V3.94A8.61,8.61,0,0,1,.07,2.65,10.31,10.31,0,0,1,.26,1.41,1.7,1.7,0,0,1,1.41.26,14.3,14.3,0,0,1,3.14.07L5.32,0H7.48L9.66.07a14.3,14.3,0,0,1,1.73.19A1.7,1.7,0,0,1,12.54,1.41Zm-7.45,5L8.44,4.5,5.09,2.6Z"></path>
                                    </g>
                                </svg>
                            </Link>
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.83 10.04">
                                    <path className={styles.snsIco} d="M2.36,3.71A.37.37,0,0,0,2,4.08a.38.38,0,0,0,.75,0A.37.37,0,0,0,2.36,3.71Z"></path>
                                    <path className={styles.snsIco} d="M6.05,3.67a.4.4,0,1,0,.4.4A.4.4,0,0,0,6.05,3.67Z"></path>
                                    <path className={styles.snsIco} d="M9.38,0H1.45A1.45,1.45,0,0,0,0,1.45V6.16A1.44,1.44,0,0,0,1.45,7.6h2.8l1,2.25s.07.19.23.19h0c.16,0,.22-.19.22-.19L6.6,7.6H9.38a1.44,1.44,0,0,0,1.45-1.44V1.45A1.45,1.45,0,0,0,9.38,0Zm-6,4.16a.9.9,0,0,1-.89.89A.73.73,0,0,1,2,4.82V5H1.32V2.3h0S2,2.3,2,2.3v1c.15-.26.59-.25.59-.25A.94.94,0,0,1,3.4,4.16Zm1.14-1V5H3.91V3.17c0-.25-.31-.32-.31-.32V2.21A.87.87,0,0,1,4.54,3.15Zm1.51,1.9A1,1,0,0,1,5,4.07a1,1,0,0,1,1.07-1,1,1,0,0,1,1.06,1A1,1,0,0,1,6.05,5.05Zm3.47,0A.9.9,0,0,1,8.59,6H8.3V5.37h.17s.4,0,.39-.57c0,0-.07.25-.63.25a.84.84,0,0,1-.79-.83V3.93a.9.9,0,0,1,.88-.86.65.65,0,0,1,.56.24V3.12h.64Z"></path>
                                    <path className={styles.snsIco} d="M8.51,3.68a.39.39,0,0,0,0,.78.39.39,0,0,0,0-.78Z"></path>
                                </svg>
                            </Link>
                            
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.2 10.01">
                                    <path className={styles.snsIco} d="M1.55,3.66V2.23A2.62,2.62,0,0,1,2.18.6,1.87,1.87,0,0,1,3.45,0,11.39,11.39,0,0,1,5.2.08V1.67h-1a1,1,0,0,0-.63.21.68.68,0,0,0-.15.37,1.13,1.13,0,0,0,0,.26V3.66H5.14L4.92,5.43H3.39V10H1.55V5.43H0V3.66Z"></path>
                                </svg>
                            </Link>
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.43 10.5">
                                    <path className={styles.snsIco} d="M10.43,3.07V7.41a3.06,3.06,0,0,1-.87,2.2,3,3,0,0,1-2.18.84L6,10.5H4.36L3,10.45a3,3,0,0,1-2.2-.84A3,3,0,0,1,0,7.41v-3A10,10,0,0,1,.05,3.07,3,3,0,0,1,.84.89,3.17,3.17,0,0,1,3,0H7.38A3,3,0,0,1,9.56.89a3.06,3.06,0,0,1,.87,2.2ZM9.3,8.34a4.14,4.14,0,0,0,.19-1.26,11.85,11.85,0,0,0,0-1.46V4.88a11.85,11.85,0,0,0,0-1.46A4.14,4.14,0,0,0,9.3,2.16a1.88,1.88,0,0,0-1-1A4.52,4.52,0,0,0,7,1L5.57.94H4.83c-.49,0-1,0-1.46.06a4.53,4.53,0,0,0-1.26.19,1.88,1.88,0,0,0-1,1A4.61,4.61,0,0,0,1,3.42V7.08a4.86,4.86,0,0,0,.19,1.26,1.88,1.88,0,0,0,1,1,4.53,4.53,0,0,0,1.26.19H7.06a4.47,4.47,0,0,0,1.26-.19A1.81,1.81,0,0,0,9.3,8.34ZM5.2,2.55A2.73,2.73,0,1,1,5.24,8h0A2.74,2.74,0,0,1,2.5,5.3,2.74,2.74,0,0,1,5.2,2.6ZM5.2,7A1.78,1.78,0,1,0,4,6.49,1.78,1.78,0,0,0,5.2,7ZM8.65,2.44A.8.8,0,0,0,8.46,2,.65.65,0,0,0,8,1.84.6.6,0,0,0,7.57,2,.63.63,0,0,0,8,3.08a.64.64,0,0,0,.64-.64Z"></path>
                                </svg>
                            </Link>
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path className={styles.snsIco} d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                                </svg>
                            </Link>
                            <Link href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <g>
                                        <circle className={styles.snsIco} cx="58.18" cy="58.18" r="58.18"></circle>
                                        <circle className={styles.snsIco} cx="204.2" cy="58.18" r="58.18"></circle>
                                        <circle className={styles.snsIco} cx="204.2" cy="204.2" r="58.18"></circle>
                                        <circle className={styles.snsIco} cx="204.2" cy="350.22" r="58.18"></circle>
                                        <circle className={styles.snsIco} cx="350.22" cy="58.18" r="58.18"></circle>
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className={styles.info_bottom}>
                        <div className={styles.info_text}>
                            <p>밝은성모안과의원 | 서울시 강남구 테헤란로 110 캠브리지빌딩 3F, 16F, 17F, 18F</p>
                            <p>대표자 김준형 | 사업자번호 225-95-11475 | 문의 02. 2202. 1515</p>
                            <p className={styles.copy}>© 2024 밝은성모안과의원</p>
                        </div>
                        <div className={styles.info_corp}>
                            <div className={styles.box}>
                                <div className={styles.ico}>
                                    <img src="/assets/icons/ft_corp_01.png" alt="문화체육관광부-한국관광공사" />
                                </div>
                                <p>문화체육관광부-한국관광공사 <br /> 의료관광 공식승인</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.ico}>
                                    <img src="/assets/icons/ft_corp_02.svg" alt="서울특별시 의료관광 협력기관" />
                                </div>
                                <p>서울특별시 <br /> 의료관광 협력기관 선정</p>
                            </div>
                            <div className={styles.box}>
                                <div className={styles.ico}>
                                    <img src="/assets/icons/ft_corp_03.svg" alt="보건복지부 그린처방의원" />
                                </div>
                                <p>보건복지부 <br /> 그린처방의원 선정</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${styles.quick_menu} ${isVisible ? styles.show : ''}`}>
            <div className={styles.quick}>
                <Link href="/">
                    <div className={styles.ico}><img src="/assets/icons/ico_online.png" alt="밝은성모안과의원" /></div>
                    <span>온라인상담</span>
                </Link>
                <Link href="/">
                    <div className={styles.ico}><img src="/assets/icons/ico_chat.png" alt="밝은성모안과의원" /></div>
                    <span>채팅상담</span>
                </Link>
                <Link href="/">
                    <div className={styles.ico}>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 248.6 238">
                            <g>
                                <g><path d="M196.6,22.1v-6.5c0-6.8-5.5-12.4-12.4-12.4c-6.8,0-12.4,5.5-12.4,12.4v6.5h-95v-6.5c0-6.8-5.5-12.4-12.4-12.4S52,8.8,52,15.6v6.5H2.8v212.6h243V22.1H196.6z M224.6,213.5H24v-149h200.6V213.5z"></path></g>
                                <polygon points="108.8,136 141.1,182.5 168,182.5 168,95.6 139.9,95.6 139.9,142.1 107.5,95.6 80.6,95.6 80.6,182.5 108.8,182.5"></polygon>
                            </g>
                        </svg>
                    </div>
                    <span>네이버예약</span>
                </Link>
                <Link href="/">
                    <div className={styles.ico}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M244 130.6l-12-13.5-4.2-4.7c-26-29.2-65.3-42.8-103.8-35.8c-53.3 9.7-92 56.1-92 110.3v3.5c0 32.3 13.4 63.1 37.1 85.1L253 446.8c.8 .7 1.9 1.2 3 1.2s2.2-.4 3-1.2L443 275.5c23.6-22 37-52.8 37-85.1v-3.5c0-54.2-38.7-100.6-92-110.3c-38.5-7-77.8 6.6-103.8 35.8l-4.2 4.7-12 13.5c-3 3.4-7.4 5.4-12 5.4s-8.9-2-12-5.4zm34.9-57.1C311 48.4 352.7 37.7 393.7 45.1C462.2 57.6 512 117.3 512 186.9v3.5c0 36-13.1 70.6-36.6 97.5c-3.4 3.8-6.9 7.5-10.7 11l-184 171.3c-.8 .8-1.7 1.5-2.6 2.2c-6.3 4.9-14.1 7.5-22.1 7.5c-9.2 0-18-3.5-24.8-9.7L47.2 299c-3.8-3.5-7.3-7.2-10.7-11C13.1 261 0 226.4 0 190.4v-3.5C0 117.3 49.8 57.6 118.3 45.1c40.9-7.4 82.6 3.2 114.7 28.4c6.7 5.3 13 11.1 18.7 17.6l4.2 4.7 4.2-4.7c4.2-4.7 8.6-9.1 13.3-13.1c1.8-1.5 3.6-3 5.4-4.5z"></path>
                        </svg>
                    </div>
                    <span>이벤트</span>
                </Link>
                <Link href="/">
                    <div className={`${styles.ico} ${styles.map}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M352 192c0-88.4-71.6-160-160-160S32 103.6 32 192c0 15.6 5.4 37 16.6 63.4c10.9 25.9 26.2 54 43.6 82.1c34.1 55.3 74.4 108.2 99.9 140c25.4-31.8 65.8-84.7 99.9-140c17.3-28.1 32.7-56.3 43.6-82.1C346.6 229 352 207.6 352 192zm32 0c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192zm-240 0a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 80a80 80 0 1 1 0-160 80 80 0 1 1 0 160z"></path>
                        </svg>
                    </div>
                    <span>오시는 길</span>
                </Link>
            </div>
            <div className={styles.top_btn} onClick={scrollToTop}>
                <div>
                    <div className={styles.ico}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M203.3 36.7c-6.2-6.2-16.4-6.2-22.6 0l-176 176c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L176 86.6V464c0 8.8 7.2 16 16 16s16-7.2 16-16V86.6L356.7 235.3c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-176-176z"></path>
                        </svg>
                    </div>
                    <span>TOP</span>
                </div>
            </div>
        </div>
    </footer>
  );
}
