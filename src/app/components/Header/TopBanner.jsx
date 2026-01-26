"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './GnHd.module.scss';

export default function TopBanner() {
    const [isChecked, setIsChecked] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // 쿠키 설정 함수 (24시간 유효)
    const setCookie = (name, value, hours) => {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    };

    // 쿠키 읽기 함수
    const getCookie = (name) => {
        if (typeof window === 'undefined') return null;
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    // 초기 상태를 null로 설정 (서버와 클라이언트 동일하게)
    const [isVisible, setIsVisible] = useState(null);

    // 컴포넌트 마운트 후 쿠키 확인 및 상태 설정 (클라이언트에서만 실행)
    useEffect(() => {
        const cookieValue = getCookie('topBannerHide');
        const shouldShow = cookieValue !== 'true'; // 쿠키가 있으면 false, 없으면 true
        setIsVisible(shouldShow);

        // hasBanner 클래스 동기화
        if (shouldShow) {
            document.body.classList.add('hasBanner');
        } else {
            document.body.classList.remove('hasBanner');
        }
    }, []);

    // isVisible 상태 변경 시 hasBanner 클래스 동기화
    useEffect(() => {
        if (isVisible === null) return; // 초기 상태(null)일 때는 무시

        if (isVisible) {
            document.body.classList.add('hasBanner');
        } else {
            document.body.classList.remove('hasBanner');
        }
    }, [isVisible]);

    const handleClose = () => {
        // 체크박스가 체크되어 있으면 탑배너 완전히 제거 (쿠키 저장)
        if (isChecked) {
            document.body.classList.remove('hasBanner');
            setIsVisible(false);
            setCookie('topBannerHide', 'true', 24);
        } else {
            // 닫기만 했을 때: closing 애니메이션만 적용 (DOM은 유지)
            setIsClosing(true);
            document.body.classList.remove('hasBanner');
        }
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    // 초기 상태(null)이거나 쿠키가 있으면 컴포넌트를 렌더링하지 않음
    if (isVisible === null || !isVisible) {
        return null;
    }

    return (
        <div className={`${styles.top_banner} ${isClosing ? styles.closing : ""}`}>
            {/* 하드코딩 값 : 백그라운드 색상 설정 기능 */}
            <Link href="/" style={{ background: '#080e18' }}>
                <div className={styles.img_box}>
                    <Image src="/assets/main/top-banner-sample.jpg" alt="Top Banner" fill sizes="100vw" className={styles.pc} />
                    <Image src="/assets/main/top-banner-sample-m.jpg" alt="Top Banner" fill sizes="100vw" className={styles.mo} />
                </div>
            </Link>
            <div className={styles.util}>
                <div className={styles.chk_box}>
                    <input
                        type="checkbox"
                        id="topYn"
                        className={styles.hidden}
                        name="topYn"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="topYn">
                        <svg className={styles.n} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path d="M256 32a224 224 0 1 1 0 448 224 224 0 1 1 0-448zm0 480A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM363.3 203.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L224 297.4l-52.7-52.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l64 64c6.2 6.2 16.4 6.2 22.6 0l128-128z" />
                        </svg>
                        <svg className={styles.y} xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                        </svg>
                        <span>오늘하루 보지 않기</span>
                    </label>
                </div>
                <button type="button" className={styles.close_btn} onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                        <path d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
