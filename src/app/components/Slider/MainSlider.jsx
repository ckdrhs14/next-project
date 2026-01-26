'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './MainSlider.module.scss';

export default function MainSlider() {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isTabletOrBelow, setIsTabletOrBelow] = useState(false);
    const paginationRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1200);
            setIsTabletOrBelow(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const handleSwiper = (swiper) => {
        setSwiperInstance(swiper);
        // loop 모드에서는 realIndex 사용, 일반 모드에서는 activeIndex 사용
        const index = swiper.params.loop ? swiper.realIndex : swiper.activeIndex;
        setCurrentSlideIndex(index);
    };

    useEffect(() => {
        if (swiperInstance && paginationRef.current) {
            const circumference = 2 * Math.PI * 19;
            // Swiper 인스턴스에서 실제 autoplay delay 값 가져오기
            const getAutoplayDelay = () => {
                return swiperInstance.params?.autoplay?.delay ||
                    swiperInstance.autoplay?.delay ||
                    8000; // 기본값
            };
            let animationFrameId = null;
            let startTime = null;

            // 활성 슬라이드의 버튼 상태 업데이트
            const updateButtonVisibility = () => {
                const paginationEl = swiperInstance.pagination?.el || paginationRef.current;
                if (!paginationEl) return;

                const bullets = paginationEl.querySelectorAll('span');

                bullets.forEach((bullet) => {
                    const playBtn = bullet.querySelector('.btn.play');
                    const stopBtn = bullet.querySelector('.btn.stop');
                    const circle = bullet.querySelector('circle');
                    const isActive = bullet.classList.contains('swiper-pagination-bullet-active');

                    if (isActive) {
                        // 활성 슬라이드: autoplay 실행 중이면 pause 버튼, 정지 중이면 play 버튼
                        if (swiperInstance.autoplay?.running) {
                            if (playBtn) playBtn.style.display = 'none';
                            if (stopBtn) stopBtn.style.display = 'block';
                            if (circle) circle.style.display = 'block'; // autoplay 실행 중에는 circle 표시
                            // pause 버튼이 보일 때 bullet 배경을 transparent로
                            bullet.style.backgroundColor = 'transparent';
                        } else {
                            if (playBtn) playBtn.style.display = 'block';
                            if (stopBtn) stopBtn.style.display = 'none';
                            if (circle) circle.style.display = 'none'; // play 버튼이 보일 때는 circle 숨김
                            // play 버튼이 보일 때 bullet 배경을 transparent로
                            bullet.style.backgroundColor = 'transparent';
                        }
                    } else {
                        // 비활성 슬라이드: 버튼 숨기고 circle만 표시
                        if (playBtn) playBtn.style.display = 'none';
                        if (stopBtn) stopBtn.style.display = 'none';
                        if (circle) circle.style.display = 'block';
                        // 비활성 슬라이드는 원래 배경색 유지
                        bullet.style.backgroundColor = '';
                    }
                });
            };

            const getActiveCircle = () => {
                const paginationEl = swiperInstance.pagination?.el || paginationRef.current;
                if (!paginationEl) return null;

                // Swiper의 pagination은 실제 슬라이드 인덱스를 사용
                // loop 모드에서는 realIndex, 일반 모드에서는 activeIndex 사용
                let index;
                if (swiperInstance.params.loop) {
                    index = swiperInstance.realIndex;
                } else {
                    index = swiperInstance.activeIndex;
                }

                const bullets = paginationEl.querySelectorAll('span');
                // active 클래스를 가진 bullet 찾기 (더 확실한 방법)
                let activeBullet = null;
                bullets.forEach((bullet) => {
                    if (bullet.classList.contains('swiper-pagination-bullet-active')) {
                        activeBullet = bullet;
                    }
                });

                // active 클래스가 없으면 인덱스로 찾기
                if (!activeBullet && bullets[index]) {
                    activeBullet = bullets[index];
                }

                return activeBullet ? activeBullet.querySelector('circle') : null;
            };

            const getAllCircles = () => {
                const paginationEl = swiperInstance.pagination?.el || paginationRef.current;
                if (!paginationEl) return [];
                return Array.from(paginationEl.querySelectorAll('circle'));
            };

            const resetCircle = (circle, immediate = false) => {
                if (circle) {
                    // immediate가 true이면 transition 없이 즉시 초기화
                    if (immediate) {
                        circle.style.transition = 'none';
                    }
                    circle.setAttribute('stroke-dasharray', `${circumference} ${circumference}`);
                    circle.setAttribute('stroke-dashoffset', `${circumference}`);

                    // transition 복원
                    if (immediate) {
                        requestAnimationFrame(() => {
                            circle.style.transition = '';
                        });
                    }
                }
            };

            const updateSlideInfo = () => {
                // loop 모드에서는 realIndex 사용, 일반 모드에서는 activeIndex 사용
                const index = swiperInstance.params.loop ? swiperInstance.realIndex : swiperInstance.activeIndex;
                setCurrentSlideIndex(index);

                // video 제어: 3번째 슬라이드(index 2)가 활성일 때만 재생
                if (videoRef.current) {
                    if (index === 2) {
                        // 활성 슬라이드일 때 재생
                        videoRef.current.play().catch((error) => {
                            console.log('Video play error:', error);
                        });
                    } else {
                        // 비활성 슬라이드일 때 일시정지 및 초기화
                        videoRef.current.pause();
                        videoRef.current.currentTime = 0;
                    }
                }

                // 버튼 이벤트 재설정 (pagination이 업데이트될 수 있음)
                setupButtonEvents();
                // 버튼 상태 업데이트
                updateButtonVisibility();

                // autoplay가 실행 중이면 새로운 슬라이드의 circle 즉시 초기화하고 시작
                if (swiperInstance.autoplay?.running) {
                    // 즉시 circle 초기화 및 시작 시간 설정
                    const circle = getActiveCircle();
                    if (circle) {
                        resetCircle(circle);
                    }
                    startTime = Date.now();

                    // updateProgress 즉시 시작 (이미 실행 중이면 재시작)
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                    }
                    animationFrameId = requestAnimationFrame(updateProgress);
                } else {
                    startTime = null;
                }
            };

            // 슬라이드 전환 시작 시 이전 슬라이드의 circle만 즉시 초기화
            const handleSlideChangeTransitionStart = () => {
                const allCircles = getAllCircles();
                const activeIndex = swiperInstance.params.loop
                    ? swiperInstance.realIndex
                    : swiperInstance.activeIndex;

                allCircles.forEach((circle, index) => {
                    // 현재 활성 슬라이드가 아닌 circle만 즉시 초기화
                    if (index !== activeIndex) {
                        resetCircle(circle, true);
                    }
                });
            };

            // 드래그 시작 시 모든 circle 즉시 숨기기
            const handleSliderMove = () => {
                const allCircles = getAllCircles();
                allCircles.forEach((circle) => {
                    if (circle) {
                        circle.style.opacity = '0';
                        resetCircle(circle, true);
                    }
                });
            };

            // 드래그 종료 시 circle 다시 보이기 및 애니메이션 즉시 시작
            const handleSliderMoveEnd = () => {
                const allCircles = getAllCircles();
                allCircles.forEach((circle) => {
                    if (circle) {
                        circle.style.opacity = '1';
                    }
                });

                // autoplay가 실행 중이면 즉시 애니메이션 시작
                if (swiperInstance.autoplay?.running) {
                    const circle = getActiveCircle();
                    if (circle) {
                        resetCircle(circle);
                    }
                    startTime = Date.now();
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                    }
                    animationFrameId = requestAnimationFrame(updateProgress);
                }
            };

            // requestAnimationFrame을 사용하여 진행률 업데이트
            const updateProgress = () => {
                const circle = getActiveCircle();

                if (!swiperInstance.autoplay?.running || !circle) {
                    animationFrameId = requestAnimationFrame(updateProgress);
                    return;
                }

                // Swiper의 autoplay 내부 타이머 사용 (가능한 경우)
                const autoplayDelay = getAutoplayDelay();
                let progress = 0;
                if (swiperInstance.autoplay?.timeLeft !== undefined) {
                    // timeLeft가 있으면 이를 사용 (더 정확함)
                    const timeLeft = swiperInstance.autoplay.timeLeft;
                    progress = 1 - (timeLeft / autoplayDelay);
                } else if (startTime) {
                    // timeLeft가 없으면 경과 시간으로 계산
                    const elapsed = Date.now() - startTime;
                    progress = Math.min(elapsed / autoplayDelay, 1);
                }

                const offset = (1 - progress) * circumference;
                circle.setAttribute('stroke-dasharray', `${circumference} ${circumference}`);
                circle.setAttribute('stroke-dashoffset', `${offset}`);

                animationFrameId = requestAnimationFrame(updateProgress);
            };

            // 버튼 클릭 이벤트 설정
            const setupButtonEvents = () => {
                const paginationEl = swiperInstance.pagination?.el || paginationRef.current;
                if (!paginationEl) return;

                const bullets = paginationEl.querySelectorAll('span');
                bullets.forEach((bullet) => {
                    const playBtn = bullet.querySelector('.btn.play');
                    const stopBtn = bullet.querySelector('.btn.stop');

                    // 기존 이벤트 리스너 제거 (중복 방지)
                    if (playBtn) {
                        const newPlayBtn = playBtn.cloneNode(true);
                        playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
                        // 복제된 버튼의 display는 updateButtonVisibility에서 설정
                        newPlayBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // autoplay 시작
                            swiperInstance.autoplay.start();
                            // 현재 슬라이드의 circle 초기화
                            const circle = getActiveCircle();
                            if (circle) {
                                resetCircle(circle);
                            }
                            startTime = Date.now();
                            if (animationFrameId) {
                                cancelAnimationFrame(animationFrameId);
                            }
                            animationFrameId = requestAnimationFrame(updateProgress);
                            updateButtonVisibility();
                        });
                    }

                    if (stopBtn) {
                        const newStopBtn = stopBtn.cloneNode(true);
                        stopBtn.parentNode.replaceChild(newStopBtn, stopBtn);
                        // 복제된 버튼의 display는 updateButtonVisibility에서 설정
                        newStopBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // autoplay 정지
                            swiperInstance.autoplay.stop();
                            updateButtonVisibility();
                        });
                    }
                });

                // 버튼 이벤트 설정 후 즉시 상태 업데이트
                updateButtonVisibility();
            };

            // 초기 버튼 이벤트 설정 (내부에서 updateButtonVisibility 호출됨)
            setupButtonEvents();

            swiperInstance.on('slideChange', updateSlideInfo);
            swiperInstance.on('slideChangeTransitionStart', handleSlideChangeTransitionStart);
            swiperInstance.on('sliderMove', handleSliderMove);
            swiperInstance.on('touchEnd', handleSliderMoveEnd);
            swiperInstance.on('slideChangeTransitionEnd', handleSliderMoveEnd);

            swiperInstance.on('autoplayStop', () => {
                // autoplay가 정지되면 모든 circle을 초기화
                const allCircles = getAllCircles();
                allCircles.forEach(resetCircle);
                startTime = null;
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                updateButtonVisibility();
            });

            swiperInstance.on('autoplayStart', () => {
                // autoplay가 시작되면 현재 슬라이드의 circle 초기화하고 시작 시간 설정
                const circle = getActiveCircle();
                resetCircle(circle);
                startTime = Date.now();
                if (!animationFrameId) {
                    animationFrameId = requestAnimationFrame(updateProgress);
                }
                updateButtonVisibility();
            });

            // 초기 autoplay 시작 감지 및 버튼 상태 설정
            updateButtonVisibility();
            if (swiperInstance.autoplay?.running) {
                startTime = Date.now();
                animationFrameId = requestAnimationFrame(updateProgress);
            }

            // 초기 로드 시 video 제어
            const initialIndex = swiperInstance.params.loop ? swiperInstance.realIndex : swiperInstance.activeIndex;
            if (videoRef.current) {
                if (initialIndex === 2) {
                    videoRef.current.play().catch((error) => {
                        console.log('Video play error:', error);
                    });
                } else {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            }

            return () => {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
                swiperInstance.off('slideChange', updateSlideInfo);
                swiperInstance.off('slideChangeTransitionStart', handleSlideChangeTransitionStart);
                swiperInstance.off('sliderMove', handleSliderMove);
                swiperInstance.off('touchEnd', handleSliderMoveEnd);
                swiperInstance.off('slideChangeTransitionEnd', handleSliderMoveEnd);
                swiperInstance.off('autoplayStop');
                swiperInstance.off('autoplayStart');
            };
        }
    }, [swiperInstance]);

    // Swiper의 slides 배열에서 실제 슬라이드만 필터링
    const totalSlides = swiperInstance
        ? (swiperInstance.params.loop
            ? Array.from(swiperInstance.slides).filter((slide) => {
                return !slide.classList.contains('swiper-slide-duplicate');
            }).length
            : swiperInstance.slides.length)
        : 0;

    return (
        <div className={styles.mainSlider}>
            <Swiper
                className={styles.mainSwiper}
                modules={[Autoplay, Pagination, EffectFade]}
                loop={true}
                effect={'fade'}
                fadeEffect={{
                    crossFade: true,
                }}
                slidesPerView={1}
                spaceBetween={0}
                speed={800}
                observer={true}
                observeParents={true}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    el: `.${styles['swiper-custom-pagination']}`,
                    clickable: true,
                    renderBullet: function (index, className) {
                        // circle의 둘레 계산
                        const circumference = 2 * Math.PI * 19;
                        return `<span class="${className} ${styles['custom-bullet']}">
                        <button type="button" class="btn play"><span class="blind">실행</span></button>
                        <button type="button" class="btn stop"><span class="blind">정지</span></button>
                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <circle class="circle" cx="20" cy="20" r="19" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="${circumference} ${circumference}" stroke-dashoffset="${circumference}"></circle>
                        </svg>
                        </span>`;
                    },
                }}
                onSwiper={handleSwiper}
                navigation={false}
            >
                <SwiperSlide>
                    {!isMobile ? (
                        <Image src="/assets/main/main_slider_01.png" alt="Slide 1" fill loading="eager" className={styles.pc} />
                    ) : (
                        <Image src="/assets/main/main_slider_01_mo.png" alt="Slide 1" fill loading="eager" className={styles.mo} />
                    )}
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>당신의 시력을 책임질 밝은성모안과</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>나이에 상관없이</p></div>
                            <div><p>누구에게나 선명한 세상을</p></div>
                        </div>
                        <button type="button" className="btn_theme_1">
                            <span>바로가기</span>
                        </button>
                    </div>
                    {isTabletOrBelow && (
                        <Link href="/" className={styles['link-area']}>
                            <span className="blind">바로가기</span>
                        </Link>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                    {!isMobile ? (
                        <Image src="/assets/main/main_slider_02.png" alt="Slide 2" fill className={styles.pc} />
                    ) : (
                        <Image src="/assets/main/main_slider_02_mo.png" alt="Slide 2" fill className={styles.mo} />
                    )}
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>본연의 눈에 가장 가까운 편안함과 선명함을 선사합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>정교함의 끝, 실크라식</p></div>
                            <div><p>선명함의 기준을 높이다</p></div>
                        </div>
                    </div>
                    {isTabletOrBelow && (
                        <Link href="/" className={styles['link-area']}>
                            <span className="blind">바로가기</span>
                        </Link>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                    {!isMobile ? (
                        <video ref={videoRef} src="/assets/main/main_slider_03.mp4" alt="Slide 3" muted={true} loop={true} playsInline className={styles.pc} />
                    ) : (
                        <video ref={videoRef} src="/assets/main/main_slider_03.mp4" alt="Slide 3" muted={true} loop={true} playsInline className={styles.mo} />
                    )}
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>빠른 속도와 정확도로 높은 수준의 시력을 제공합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>지능적이고 혁신적인 기술</p></div>
                            <div><p>아토스 스마트 스마일라식</p></div>
                        </div>
                    </div>
                    {isTabletOrBelow && (
                        <Link href="/" className={styles['link-area']}>
                            <span className="blind">바로가기</span>
                        </Link>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                    {!isMobile ? (
                        <Image src="/assets/main/main_slider_04.jpg" alt="Slide 4" fill className={styles.pc} />
                    ) : (
                        <Image src="/assets/main/main_slider_04_mo.jpg" alt="Slide 4" fill className={styles.mo} />
                    )}
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>단 2일만의 상처회복, 일상회복이 가능합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>올레이저로 안전하고 정밀하게</p></div>
                            <div><p>만족도 높은 투데이 라섹</p></div>
                        </div>
                    </div>
                    {isTabletOrBelow && (
                        <Link href="/" className={styles['link-area']}>
                            <span className="blind">바로가기</span>
                        </Link>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                    {!isMobile ? (
                        <Image src="/assets/main/main_slider_05.jpg" alt="Slide 5" fill className={styles.pc} />
                    ) : (
                        <Image src="/assets/main/main_slider_05_mo.jpg" alt="Slide 5" fill className={styles.mo} />
                    )}
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>다양한 인공수정체로 눈 특성에 맞는 맞춤수술이 가능합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>밝은성모안과만의 검증된</p></div>
                            <div><p>노안·백내장 수술</p></div>
                        </div>
                    </div>
                    {isTabletOrBelow && (
                        <Link href="/" className={styles['link-area']}>
                            <span className="blind">바로가기</span>
                        </Link>
                    )}
                </SwiperSlide>
                <SwiperSlide>
                    {!isMobile ? (
                        <Image src="/assets/main/main_slider_06.jpg" alt="Slide 6" fill className={styles.pc} />
                    ) : (
                        <Image src="/assets/main/main_slider_06_mo.jpg" alt="Slide 6" fill className={styles.mo} />
                    )}
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>건조하고 불편한 안구건조증도 치료가 가능합니다.</span>
                        </div>
                        <div className={styles.title}>
                            <div><p>신의료기술로 등재된</p></div>
                            <div><p>아쿠아셀 IPL 레이저</p></div>
                        </div>
                    </div>
                    {isTabletOrBelow && (
                        <Link href="/" className={styles['link-area']}>
                            <span className="blind">바로가기</span>
                        </Link>
                    )}
                </SwiperSlide>
            </Swiper>
            <div className={styles['swiper-option-box']}>
                <div ref={paginationRef} className={styles['swiper-custom-pagination']}></div>

                <div className={styles.numbering}>
                    <span className={styles.current}>{currentSlideIndex + 1}</span> <span className={styles.bar}>/</span> <span>{totalSlides}</span>
                </div>
            </div>

        </div>
    );
}
