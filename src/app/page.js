import styles from "./page.module.css";
import MainSlider from "./components/Slider/MainSlider";
import Since from "./components/Main/Since/Since";
import Slogan from "./components/Main/Slogan/Slogan";
import Service from "./components/Main/Service/Service";
import Standard from "./components/Main/Standard/Standard";
import Event from "./components/Main/Event/Event";
import Media from "./components/Main/Media/Media";

export default function Page() {
  return (
    <div className={styles.page}>
      <MainSlider />
      <Since />
      {/* <Slogan /> */}
      <Service />
      <Standard />
      {/* <Event />
      <Media /> */}
    </div>
  );
}
