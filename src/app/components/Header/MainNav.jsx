import React from 'react'
import Link from 'next/link';
import styles from './GnHd.module.scss';

export default function MainNav({ headerNavRef, handleNavMouseEnter, handleNavMouseLeave, isMobile, handleDepth1Click, navigationRef }) {
  return (
    <nav className={`${styles.navigation}`}
      onMouseEnter={!isMobile ? handleNavMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleNavMouseLeave : undefined}>
      <ul className={styles.depth1} ref={(el) => {
        if (headerNavRef) headerNavRef.current = el;
        if (navigationRef) navigationRef.current = el;
      }}>
        <li>
          <Link href="/homepage" onClick={(e) => handleDepth1Click(e, 0)}>밝은성모안과</Link>
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
