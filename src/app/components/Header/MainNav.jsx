import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './GnHd.module.scss';

export default function MainNav({
  headerNavRef,
  handleNavMouseEnter,
  handleNavMouseLeave,
  isMobile,
  handleDepth1Click,
  navigationRef,
  handleSiteToggle,
  focusedOption,
  handleSelectChange,
  handleOptionClick,
  languagePaths
}) {
  const router = useRouter();
  const [isNiceSelectOn, setIsNiceSelectOn] = useState(false);

  const handleNiceSelectToggle = () => {
    setIsNiceSelectOn(prev => !prev);
  };

  const handleOptionClickLocal = (optionId) => {
    setIsNiceSelectOn(false); // 옵션 선택 후 닫기
    if (handleOptionClick) {
      handleOptionClick(optionId);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchText = e.target.searchText.value;
    if (searchText) {
    }
  };

  return (
    <nav className={`${styles.navigation}`}
      onMouseEnter={!isMobile ? handleNavMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleNavMouseLeave : undefined}>

      {isMobile && (
        <button className={styles.close_btn} onClick={handleSiteToggle}>
          <span className="blind">메뉴닫기</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="3.2rem" viewBox="0 0 384 512" fill="#fff">
            <path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"></path>
          </svg>
        </button>
      )}

      {isMobile && (
        <div className={styles.top}>
          <div className={styles.top_cont}>
            <div className={styles.select}>
              <select
                name="languageSelectMo"
                id="languageSelectMo"
                value={focusedOption}
                onChange={handleSelectChange}
                style={{ display: 'none' }}
              >
                <option value="KOR">KOR</option>
                <option value="ENG">ENG</option>
                <option value="CHN">CHN</option>
                <option value="TWN">TWN</option>
              </select>
              <div
                className={`${styles.Nice_select} ${isNiceSelectOn ? styles.on : ""}`}
                onClick={handleNiceSelectToggle}
                tabIndex="0"
              >
                <span className={styles.current}>{focusedOption}</span>
                <ul>
                  <li
                    className={`${styles.option} ${focusedOption === "KOR" ? styles.focus : ""}`}
                    onClick={() => handleOptionClickLocal("KOR")}
                  >
                    KOR
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === "ENG" ? styles.focus : ""}`}
                    onClick={() => handleOptionClickLocal("ENG")}
                  >
                    ENG
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === "CHN" ? styles.focus : ""}`}
                    onClick={() => handleOptionClickLocal("CHN")}
                  >
                    CHN
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === "TWN" ? styles.focus : ""}`}
                    onClick={() => handleOptionClickLocal("TWN")}
                  >
                    TWN
                  </li>
                </ul>
              </div>
            </div>
            <button
              type="button"
              className={styles.btn}
            >
              로그인
            </button>
          </div>
          <form id="maFrm" name="maFrm" action="/allSch.php" onSubmit={handleSearchSubmit}>
            <div className={styles.sch_box}>
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                name="searchText"
                id="searchTextM"
              />
              <button type="submit" className={styles.ico} id="headerSearchBtn">
                <svg xmlns="http://www.w3.org/2000/svg" height="3rem" viewBox="0 0 512 512" fill="#fff">
                  <path d="M384 208A176 176 0 1 0 32 208a176 176 0 1 0 352 0zM343.3 366C307 397.2 259.7 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 51.7-18.8 99-50 135.3L507.3 484.7c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0L343.3 366z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <ul className={styles.depth1} ref={(el) => {
        if (headerNavRef) headerNavRef.current = el;
        if (navigationRef) navigationRef.current = el;
      }}>
        <li>
          <Link href="/" onClick={(e) => handleDepth1Click(e, 0)}>밝은성모안과</Link>
          <ul className={styles.depth2}>
            <li><Link href="/">합리적인선택</Link></li>
            <li><Link href="/">전문의료진</Link></li>
            <li><Link href="/">진료안내</Link></li>
            <li><Link href="/">병원둘러보기</Link></li>
            <li><Link href="/">의료장비소개</Link>
              <ul className={styles.depth3}>
                <li><Link href="/">- 수술장비</Link></li>
                <li><Link href="/">- 검사장비</Link></li>
              </ul>
            </li>
            <li><Link href="/">협력병원</Link></li>
            <li><Link href="/">미디어</Link></li>
            <li><Link href="/">유튜브</Link></li>
          </ul>
        </li>
        <li>
          <Link href="/" onClick={(e) => handleDepth1Click(e, 1)}>스마일라식</Link>
          <ul className={styles.depth2}>
            <li><Link href="/">스마트 노바 프로</Link></li>
            <li><Link href="/">실크 스마일라식</Link></li>
            <li><Link href="/">스마트 스마일라식</Link></li>
            <li><Link href="/">스마트 스마일라식 시스템</Link></li>
            <li><Link href="/">과정 및 주의사항</Link>
              <ul className={styles.depth3}>
                <li><Link href="/">- 검사과정</Link></li>
                <li><Link href="/">- 수술과정</Link></li>
                <li><Link href="/">- 주의사항</Link></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/" onClick={(e) => handleDepth1Click(e, 2)}>투데이 라섹</Link>
          <ul className={styles.depth2}>
            <li><Link href="/">일반 라섹과 비교</Link></li>
            <li><Link href="/">투데이 라섹 시스템</Link></li>
            <li><Link href="/">과정 및 주의사항</Link>
              <ul className={styles.depth3}>
                <li><Link href="/">- 검사과정</Link></li>
                <li><Link href="/">- 수술과정</Link></li>
                <li><Link href="/">- 주의사항</Link></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/" onClick={(e) => handleDepth1Click(e, 3)}>노안·백내장</Link>
          <ul className={styles.depth2}>
            <li><Link href="/">백내장</Link>
              <ul className={styles.depth3}>
                <li><Link href="/">- 백내장</Link></li>
                <li><Link href="/">- 노안백내장 수술</Link></li>
                <li><Link href="/">- 과정 및 주의사항</Link></li>
              </ul>
            </li>
            <li><Link href="/">노안</Link>
              <ul className={styles.depth3}>
                <li><Link href="/">- 노안</Link></li>
                <li><Link href="/">- 과정 및 주의사항</Link></li>
              </ul>
            </li>
            <li><Link href="/">노안 라식&라섹</Link></li>
            <li><Link href="/">다초점 인공수정체</Link>
              <ul className={styles.depth3}>
                <li><Link href="/">- 다초점 인공수정체</Link></li>
                <li><Link href="/">- 알티플러스 렌즈삽입술</Link></li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/" onClick={(e) => handleDepth1Click(e, 4)}>시력교정술</Link>
          <ul className={styles.depth2}>
            <li><Link href="/">시력교정술 비교</Link></li>
            <li><Link href="/">올레이저 라섹&라식</Link></li>
            <li><Link href="/">렌즈삽입수술(ICL)</Link></li>
            <li><Link href="/">각막강화술</Link></li>
            <li><Link href="/">퍼스널S</Link></li>
          </ul>
        </li>
        <li>
          <Link href="/" onClick={(e) => handleDepth1Click(e, 5)}>안질환</Link>
          <ul className={styles.depth2}>
            <li><Link href="/">안종합검진</Link></li>
            <li><Link href="/">안구건조증</Link></li>
            <li><Link href="/">망막</Link>
              <ul className={styles.depth3}>
                <li><Link href="/">- 황반변성</Link></li>
                <li><Link href="/">- 당뇨망막병증</Link></li>
                <li><Link href="/">- 중심성망막염</Link></li>
                <li><Link href="/">- 망막박리</Link></li>
                <li><Link href="/">- 망막변성</Link></li>
                <li><Link href="/">- 망막열공</Link></li>
              </ul>
            </li>
            <li><Link href="/">녹내장</Link></li>
            <li><Link href="/">결막모반</Link></li>
            <li><Link href="/">안내주사</Link></li>
          </ul>
        </li>
        <li>
          <Link href="/" onClick={(e) => handleDepth1Click(e, 6)}>고객센터</Link>
          <ul className={styles.depth2}>
            <li><Link href="/">공지사항</Link></li>
            <li><Link href="/">이벤트</Link></li>
            <li><Link href="/">수술후기</Link></li>
            <li><Link href="/">온라인상담</Link></li>
            <li><Link href="/">자주하는질문</Link></li>
            <li><Link href="/">제휴/광고제안</Link></li>
            <li><Link href="/">비급여재료비</Link></li>
            <li><Link href="/">해외교포 상담센터</Link></li>
          </ul>
        </li>
      </ul>
      <div className={styles.gnb_bg}></div>
    </nav>
  );
}
