import styles from "./page.module.css";
import MainSlider from "./components/Slider/MainSlider";


export default function Page() {
  return (
    <div className={styles.page}>
      <MainSlider />
    </div>
  );
}
