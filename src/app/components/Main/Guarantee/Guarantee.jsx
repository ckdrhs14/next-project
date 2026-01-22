import Image from "next/image";
import styles from "./Guarantee.module.scss";

export default function Guarantee() {

    return (
        <section className={styles["sc-guarantee"]}>
            <div className={`${styles.inner} ${styles.type02}`}>
                <div className={styles.left}>
                    <div className={styles["title-area"]} data-aos="fade-up" data-aos-easing="ease">
                        <span className={styles.txt}>시력교정도 A/S가 되나요?</span>
                        <h2 className={styles.title}>밝은성모안과는 끝까지 책임집니다.</h2>
                    </div>
                    <Image src="/assets/main/img-gaurantee01.webp" alt="평생보장" data-aos="fade-up" data-aos-easing="ease" width={600} height={400} className={styles.img} />
                    <div className={styles["txt-area"]}>
                        <p className={styles.txt} data-aos="fade-up" data-aos-delay="100" data-aos-easing="ease">
                            25년 넘게 환자의 시력을 지켜온 밝은성모안과는 <br />
                            환자 한 분 한 분의 소중한 시력을 평생 함께 관리합니다. <br />
                            본원 수술 후 시력이 다시 저하될 경우, 평생 재수술을 보장해드립니다.
                        </p>
                        <p className={styles.txt} data-aos="fade-up" data-aos-delay="200" data-aos-easing="ease">
                            밝은성모안과를 믿고 선택해주신 만큼 <br />
                            당신의 믿음직스러운 주치의가 되어드리겠습니다.
                        </p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles["img-area"]}>
                        <Image src="/assets/main/img-gaurantee02.webp" alt="밝은성모안과 수술보증서" data-aos="fade-up" data-aos-delay="300" data-aos-easing="ease" fill className={styles.img} />
                    </div>
                </div>
            </div>
        </section>
    )
}