"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./GnHd.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import useToggle from "@/app/hooks/useToggle";
import MainNav from "./MainNav.jsx";


export default function Header() {
  const headerRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const languagePaths = {
    KOR: "/",
    ENG: "/eng",
    CHN: "/chn",
    TWN: "/twn",
  };

  const getCurrentLanguage = () => {
    if (pathname === "/eng") return "ENG";
    if (pathname === "/chn") return "CHN";
    if (pathname === "/twn") return "TWN";
    return "KOR";
  };

  const [activeBranch, setActiveBranch] = useState("gangnam");
  const [isSearchOverlayOn, toggleSearchOverlay, setSearchOverlayTrue, setSearchOverlayFalse] = useToggle(false);
  const [isNiceSelectOn, toggleNiceSelect] = useToggle(false);
  const [isHeaderOn, , setHeaderOnTrue, setHeaderOnFalse] = useToggle(false);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [isShareAreaOn, toggleShareArea] = useToggle(false);
  const [isSiteMapOn, toggleSiteMap] = useToggle(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDepth1Index, setOpenDepth1Index] = useState(null);
  const navigationRef = useRef(null);
  const jQueryRef = useRef(null);

  // 모바일 감지 (1440px 기준) 및 jQuery 동적 로드
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1440);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // jQuery 동적 로드
    if (typeof window !== "undefined" && !jQueryRef.current) {
      import("jquery").then((jq) => {
        jQueryRef.current = jq.default;
      });
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // 모바일일 때 초기 상태 설정: 모든 depth2 숨기기
  useEffect(() => {
    if (isMobile) {
      const initDepth2 = () => {
        if (jQueryRef.current && navigationRef.current) {
          const $ = jQueryRef.current;
          // 초기 상태에서 모든 depth2를 숨김 (CSS의 display: none과 동기화)
          $(navigationRef.current).find("> li > ul").hide();
        }
      };

      // DOM이 완전히 준비될 때까지 대기
      const timer = setTimeout(() => {
        initDepth2();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  // depth1 토글 핸들러 
  const handleDepth1Click = (e, index) => {
    if (isMobile && jQueryRef.current) {
      e.preventDefault();

      if (navigationRef.current) {
        const $ = jQueryRef.current;
        const $depth1Items = $(navigationRef.current).find("> li");
        const $targetDepth2 = $depth1Items.eq(index).find("> ul");


        if ($targetDepth2.length === 0) return;


        $depth1Items.each((i) => {
          if (i !== index) {
            const $otherDepth2 = $depth1Items.eq(i).find("> ul");
            if ($otherDepth2.length > 0 && $otherDepth2.is(":visible")) {
              $otherDepth2.stop(true, true).slideUp(400, function() {
                // 애니메이션 완료 후 클래스 제거 (순수 DOM 조작만, React 리렌더링 방지)
                $depth1Items.eq(i)[0].classList.remove(styles.open);
              });
            }
          }
        });

        // 현재 메뉴 토글 - 순수 jQuery만 사용 (React 상태와 완전히 분리)
        const isVisible = $targetDepth2.is(":visible");
        $targetDepth2.stop(true, true).slideToggle(400, function () {
          // 애니메이션 완료 후 클래스 동기화 (순수 DOM 조작만, React 리렌더링 방지)
          const $targetLi = $depth1Items.eq(index);
          if (isVisible) {
            $targetLi[0].classList.remove(styles.open);
          } else {
            $targetLi[0].classList.add(styles.open);
          }
        });
      }
    }
  };

  // 강남점, 부산점 링크 ACTIVE
  const handleBranchClick = (branchId) => {
    setActiveBranch(branchId);
  };

  const handleNiceSelectToggle = () => {
    toggleNiceSelect();
  };

  const handleNavMouseEnter = () => {
    setHeaderOnTrue();
  };

  const handleNavMouseLeave = () => {
    setHeaderOnFalse();
  };

  const handleShareToggle = () => {
    toggleShareArea();
  };

  const handleSiteToggle = () => {
    toggleSiteMap();
  };

  // 통합검색 토글 클래스 추가
  const handleSearchToggle = () => {
    setIsSearchOn((prev) => !prev);
  };

  // 언어 선택 option focus class - pathname에 따라 자동 계산
  const focusedOption = useMemo(() => getCurrentLanguage(), [pathname]);

  const handleOptionClick = (optionId) => {
    toggleNiceSelect(); // 옵션 선택 후 닫기
    const targetPath = languagePaths[optionId];
    if (targetPath) {
      router.push(targetPath);
    }
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue && languagePaths[selectedValue]) {
      router.push(languagePaths[selectedValue]);
    }
  };

  // depth1 메뉴명 split char 추가 및 동작 효과 (PC 버전에서만 실행)
  const headerNavRef = useRef(null);

  useEffect(() => {
    // 모바일에서는 실행하지 않음 (jQuery 애니메이션과 충돌 방지)
    if (isMobile || !headerNavRef.current) return;

    const linksToSplit = headerNavRef.current.querySelectorAll(":scope > li > a");

    // SplitType 인스턴스들을 저장할 배열
    const splitInstances = [];

    linksToSplit.forEach((link) => {
      if (link.dataset.splittypeProcessed === "true") {
        return;
      }

      const splitText = new SplitType(link, { types: "chars" });
      splitInstances.push(splitText);
      link.dataset.splittypeProcessed = "true";

      const textWrapper = document.createElement("span");
      textWrapper.classList.add(styles.textWrapper);

      const originalChars = Array.from(link.children);

      while (link.firstChild) {
        link.removeChild(link.firstChild);
      }

      link.appendChild(textWrapper);

      originalChars.forEach((charEl) => {
        const charWrap = document.createElement("span");
        charWrap.classList.add(styles.charWrap);

        charWrap.appendChild(charEl);
        textWrapper.appendChild(charWrap);
      });

      gsap.set(splitText.chars, { yPercent: 0 });

      const hoverAnimation = gsap.to(splitText.chars, {
        yPercent: -120,
        stagger: { each: 0.015 },
        duration: 0.6,
        paused: true,
      });

      link.addEventListener("mouseenter", () => {
        hoverAnimation.play();
      });

      link.addEventListener("mouseleave", () => {
        hoverAnimation.reverse();
      });
    });

    return () => {
      splitInstances.forEach((instance) => instance.revert());
      linksToSplit.forEach((link) => {
        if (link.dataset.splittypeProcessed === "true") {
          delete link.dataset.splittypeProcessed;
        }
      });
    };
  }, [isMobile]);

  // 헤더 스크롤 이벤트
  useEffect(() => {
    if (!headerRef.current) return;

    const headerScroll = ScrollTrigger.create({
      trigger: "body",
      start: "top top",

      onUpdate: (self) => {
        const currentScroll = self.scroll();

        if (currentScroll > 0) {
          headerRef.current.classList.add(styles.fixed);
          headerRef.current.classList.remove(styles.down);
        } else {
          headerRef.current.classList.remove(styles.fixed);
        }

        if (self.direction === 1) {
          headerRef.current.classList.add(styles.down);
          headerRef.current.classList.remove(styles.on);
        } else {
          headerRef.current.classList.remove(styles.down);
        }
      },
    });

    return () => {
      if (headerScroll) {
        headerScroll.kill();
      }
    };
  }, []);

  return (
    <header ref={headerRef} className={`${styles.header} ${isHeaderOn ? styles.on : ""}`}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <Link href="/">
              <h1>
                <Image src="/assets/icons/logo.svg" alt="강남 스마일라식" width={200} height={50} className={styles.logo} />
              </h1>
            </Link>
            <div className={styles.btn_box}>
              <Link
                href="/"
                className={`${styles.branch_button} ${activeBranch === "gangnam" ? styles.active : ""}`}
                onClick={() => handleBranchClick("gangnam")}
              >
                강남점
              </Link>
              <Link
                href="/"
                className={`${styles.branch_button} ${activeBranch === "busan" ? styles.active : ""}`}
                onClick={() => handleBranchClick("busan")}
              >
                부산점
              </Link>
            </div>
          </div>

          <MainNav
            headerNavRef={headerNavRef}
            handleNavMouseEnter={handleNavMouseEnter}
            handleNavMouseLeave={handleNavMouseLeave}
            isMobile={isMobile}
            navigationRef={navigationRef}
            handleDepth1Click={handleDepth1Click}
          />

          <div className={styles.util_wrap}>
            <div className={styles.select}>
              <select name="" id="" value={focusedOption} onChange={handleSelectChange}>
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
                    onClick={() => handleOptionClick("KOR")}
                  >
                    KOR
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === "ENG" ? styles.focus : ""}`}
                    onClick={() => handleOptionClick("ENG")}
                  >
                    ENG
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === "CHN" ? styles.focus : ""}`}
                    onClick={() => handleOptionClick("CHN")}
                  >
                    CHN
                  </li>
                  <li
                    className={`${styles.option} ${focusedOption === "TWN" ? styles.focus : ""}`}
                    onClick={() => handleOptionClick("TWN")}
                  >
                    TWN
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.util_box}>
              <button onClick={handleSearchToggle}>
                <svg
                  className={styles.hdUtil}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#173348"
                >
                  <path d="M368 208A160 160 0 1 0 48 208a160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"></path>
                </svg>
              </button>
              <button onClick={handleShareToggle}>
                <svg
                  className={styles.hdUtil}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="#173348"
                >
                  <path d="M448 128c0 53-43 96-96 96c-28.9 0-54.8-12.8-72.4-33l-89.7 44.9c1.4 6.5 2.1 13.2 2.1 20.1s-.7 13.6-2.1 20.1L279.6 321c17.6-20.2 43.5-33 72.4-33c53 0 96 43 96 96s-43 96-96 96s-96-43-96-96c0-6.9 .7-13.6 2.1-20.1L168.4 319c-17.6 20.2-43.5 33-72.4 33c-53 0-96-43-96-96s43-96 96-96c28.9 0 54.8 12.8 72.4 33l89.7-44.9c-1.4-6.5-2.1-13.2-2.1-20.1c0-53 43-96 96-96s96 43 96 96zM96 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM400 128a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM352 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"></path>
                </svg>
                <div className={`${styles.share_area} ${isShareAreaOn ? styles.on : ""}`}>
                  <a className={styles.facebook} href="javascript:shareFacebook();">
                    <Image alt="" src="/assets/icons/ico_facebook_w.svg" fill />
                  </a>
                  <a className={styles.kakao} href="javascript:shareFacebook();">
                    <Image alt="" src="/assets/icons/ico_kakao_w.svg" fill />
                  </a>
                  <a className={styles.blog} href="javascript:shareFacebook();">
                    <Image alt="" src="/assets/icons/ico_blog_w.svg" fill />
                  </a>
                  <a className={styles.twit} href="javascript:shareFacebook();">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                    </svg>
                  </a>
                  <a className={styles.share} href="javascript:shareFacebook();">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
                      <path d="M304 24c0 13.3 10.7 24 24 24H430.1L207 271c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l223-223V184c0 13.3 10.7 24 24 24s24-10.7 24-24V24c0-13.3-10.7-24-24-24H328c-13.3 0-24 10.7-24 24zM72 32C32.2 32 0 64.2 0 104V440c0 39.8 32.2 72 72 72H408c39.8 0 72-32.2 72-72V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V440c0 13.3-10.7 24-24 24H72c-13.3 0-24-10.7-24-24V104c0-13.3 10.7-24 24-24H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H72z"></path>
                    </svg>
                  </a>
                </div>
              </button>
              <button onClick={handleSiteToggle}>
                <svg
                  className={styles.hdUtil}
                  xmlns="http://www.w3.org/2000/svg"
                  height="2.5rem"
                  viewBox="0 0 448 512"
                  fill="#173348"
                >
                  <path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88zM0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zM448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={`${styles.all_sch} ${isSearchOn ? styles.on : ""}`}>
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
      <div className={`${styles.site_map} ${isSiteMapOn ? styles.on : ""}`}>
        <div className={styles.cont}>
          <div className={styles.top}>
            <h1>Site Map</h1>
            <div className={styles.ico_wrap}>
              <button>로그인</button>
            </div>
            <div className={styles.close_btn} onClick={handleSiteToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#fff">
                <path d="M338.1 413.4c3.1 3.1 8.2 3.1 11.3 0s3.1-8.2 0-11.3L203.3 256 349.4 109.9c3.1-3.1 3.1-8.2 0-11.3s-8.2-3.1-11.3 0L192 244.7 45.9 98.6c-3.1-3.1-8.2-3.1-11.3 0s-3.1 8.2 0 11.3L180.7 256 34.6 402.1c-3.1 3.1-3.1 8.2 0 11.3s8.2 3.1 11.3 0L192 267.3 338.1 413.4z"></path>
              </svg>
            </div>
          </div>
          <MainNav />
        </div>
      </div>
    </header>
  );
}
