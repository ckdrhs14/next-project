'use client';

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';
import styles from './GnHd.module.css';

export default function Header() {
  // 강남점, 부산점 링크 ACTIVE
  const [activeBranch, setActiveBranch] = useState('gangnam');
  const handleBranchClick = (branchId) => {
    setActiveBranch(branchId);
  };
  const handleClick = (branchId) => {
  };

  // 언어 선택 option focus class
  const [focusedOption, setFocusedOption] = useState('KOR');
  const [isNiceSelectOn, setIsNiceSelectOn] = useState(false);
  const handleOptionClick = (optionId) => {
    setFocusedOption(optionId);
  };
  const handleNiceSelectToggle = () => {
    setIsNiceSelectOn(prev => !prev);
  };

  // 통합검색 토글 클래스 추가
  const [isSearchOn, setIsSearchOn] = useState(false);
  const handleSearchToggle = () => {
    setIsSearchOn(prev => !prev);
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Link href="/">
              <h1>
                <img src="/assets/svgs/logo.svg" alt="강남 스마일라식" className={styles.logo} />
              </h1>
            </Link>
            <div className={styles.btn_box}>
              <Link
                href="/"
                className={`${styles.branch_button} ${activeBranch === 'gangnam' ? styles.active : ''}`}
                onClick={() => handleBranchClick('gangnam')}
              >
                강남점
              </Link>
              <Link
                href="/"
                className={`${styles.branch_button} ${activeBranch === 'busan' ? styles.active : ''}`}
                onClick={() => handleBranchClick('busan')} 
              >
                부산점
              </Link>
            </div>
          </div>

          <nav className={styles.navigation}>
            <ul>
              <li><Link href="/">밝은성모안과</Link></li>
              <li><Link href="/">스마일라식</Link></li>
              <li><Link href="/">투데이 라섹</Link></li>
              <li><Link href="/">노안·백내장</Link></li>
              <li><Link href="/">시력교정술</Link></li>
              <li><Link href="/">안질환</Link></li>
              <li><Link href="/">고객센터</Link></li>
            </ul>
          </nav>
          
          <div className={styles.util_wrap}>
            <div className={styles.select}>
              <select name="" id="">
                <option value="">KOR</option>
                <option value="">ENG</option>
                <option value="">CHN</option>
                <option value="">TWN</option>
              </select>
              <div className={styles.Nice_select} onClick={handleNiceSelectToggle} tabIndex="0">
                <span className={styles.current}>KOR</span>
                <ul className={`${isNiceSelectOn ? styles.on : ''}`}>
                  <li
                    className={`${styles.option} ${focusedOption === 'KOR' ? styles.focus : ''}`}
                    onClick={() => handleOptionClick('KOR')}
                  >
                    KOR
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === 'ENG' ? styles.focus : ''}`}
                    onClick={() => handleOptionClick('ENG')}
                  >
                    ENG
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === 'CHN' ? styles.focus : ''}`}
                    onClick={() => handleOptionClick('CHN')}
                  >
                    CHN
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === 'TWN' ? styles.focus : ''}`}
                    onClick={() => handleOptionClick('TWN')}
                  >
                    ENG
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.util_box}>
              <button onClick={handleSearchToggle}>
                <svg className="hdUtil" xmlns="http://www.w3.org/2000/svg" height="2.5rem" viewBox="0 0 512 512" fill="#173348">
                  <path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"></path>
                </svg>
              </button>
              <button>
                <svg className="hdUtil" xmlns="http://www.w3.org/2000/svg" height="2.5rem" viewBox="0 0 448 512" fill="#173348">
                  <path d="M448 128c0 53-43 96-96 96c-28.9 0-54.8-12.8-72.4-33l-89.7 44.9c1.4 6.5 2.1 13.2 2.1 20.1s-.7 13.6-2.1 20.1L279.6 321c17.6-20.2 43.5-33 72.4-33c53 0 96 43 96 96s-43 96-96 96s-96-43-96-96c0-6.9 .7-13.6 2.1-20.1L168.4 319c-17.6 20.2-43.5 33-72.4 33c-53 0-96-43-96-96s43-96 96-96c28.9 0 54.8 12.8 72.4 33l89.7-44.9c-1.4-6.5-2.1-13.2-2.1-20.1c0-53 43-96 96-96s96 43 96 96zM96 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM400 128a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM352 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path>
                </svg>
              </button>
              <button>
                <svg className="hdUtil" xmlns="http://www.w3.org/2000/svg" height="2.5rem" viewBox="0 0 448 512" fill="#173348">
                  <path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={`${styles.all_sch} ${isSearchOn ? styles.on : ''}`}>
            <form id="aFrm" name="aFrm" action="">
              <div className={styles.sch_box}>
                <div className={styles.inp_box}>
                  <input type="text" placeholder="검색어를 입력해주세요." name="searchText" id="searchTextA"></input>
                    <button type="submit" className={styles.sch_btn} id="headerSearchBtn">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1.8rem" viewBox="0 0 512 512" fill="#000">
                        <path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"></path>
                      </svg>
                    </button>
                </div>
                <button type="button" className={styles.close_btn}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="1.8rem" viewBox="0 0 384 512" fill="#fff">
                      <path d="M345 137c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-119 119L73 103c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l119 119L39 375c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l119-119L311 409c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-119-119L345 137z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}