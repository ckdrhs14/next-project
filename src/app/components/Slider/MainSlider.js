'use client';

import styles from './MainSlider.module.css';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Header() {
    return (
        <div className={styles.mainSlider}>
            <Swiper
                className={styles.mainSwiper} 
                modules={[Autoplay, Pagination, EffectFade]}
                loop={true} 
                effect={'fade'}
                fadeEffect={{
                    crossFade:true,
                }}
                slidesPerView={1} 
                spaceBetween={0}
                speed={800}
                // autoplay={{
                //     // delay: 3000,
                //     // disableOnInteraction: false,
                // }}
                
                pagination={{ 
                    clickable: true, 
                }}
                navigation={false} 
                onSwiper={(swiper) => console.log('Swiper 초기화 됨', swiper)}
                onSlideChange={() => console.log('슬라이드 변경됨')}
            >
                <SwiperSlide>
                    <img src="/assets/main/main_slider_01.png" alt="Slide 1" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>당신의 시력을 책임질 밝은성모안과</span>
                        </div>
                        <div className={styles.title}>
                            <p>나이에 상관없이</p>
                            <p>누구에게나 선명한 세상을</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/main/main_slider_02.png" alt="Slide 2" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>당신의 시력을 책임질 밝은성모안과</span>
                        </div>
                        <div className={styles.title}>
                            <p>나이에 상관없이</p>
                            <p>누구에게나 선명한 세상을</p>
                        </div>
                        <Link href="/" target="_blank" className="btn_theme_1">
                            <span>바로가기</span>
                        </Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <video src="/assets/main/main_slider_03.mp4" alt="Slide 3" autoPlay={true} muted={true} loop={true} />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>당신의 시력을 책임질 밝은성모안과</span>
                        </div>
                        <div className={styles.title}>
                            <p>나이에 상관없이</p>
                            <p>누구에게나 선명한 세상을</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/main/main_slider_04.jpg" alt="Slide 4" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>당신의 시력을 책임질 밝은성모안과</span>
                        </div>
                        <div className={styles.title}>
                            <p>나이에 상관없이</p>
                            <p>누구에게나 선명한 세상을</p>
                        </div>
                        <Link href="/" target="_blank" className="btn_theme_1">
                            <span>바로가기</span>
                        </Link>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/main/main_slider_05.jpg" alt="Slide 5" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>당신의 시력을 책임질 밝은성모안과</span>
                        </div>
                        <div className={styles.title}>
                            <p>나이에 상관없이</p>
                            <p>누구에게나 선명한 세상을</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="/assets/main/main_slider_06.jpg" alt="Slide 6" />
                    <div className={styles.text_box}>
                        <div className={styles.subtxt}>
                            <span>당신의 시력을 책임질 밝은성모안과</span>
                        </div>
                        <div className={styles.title}>
                            <p>나이에 상관없이</p>
                            <p>누구에게나 선명한 세상을</p>
                        </div>
                        <Link href="/" target="_blank" className="btn_theme_1">
                            <span>바로가기</span>
                        </Link>
                    </div>
                </SwiperSlide>
            </Swiper>
            
        </div>
    );
}