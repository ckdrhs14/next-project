import styles from "./page.module.css";
import MainSlider from "./components/Slider/MainSlider.jsx";
import Since from "./components/Main/Since/Since.jsx";
import Slogan from "./components/Main/Slogan/Slogan.jsx";
import Service from "./components/Main/Service/Service.jsx";
import Standard from "./components/Main/Standard/Standard.jsx";
import Guarantee from "./components/Main/Guarantee/Guarantee.jsx";
import Event from "./components/Main/Event/Event.jsx";
import Map from "./components/Main/Map/Map.jsx";
import Reserve from "./components/Main/Reserve/Reserve.jsx";

import Media from "./components/Main/Media/Media.jsx";

export default function Page() {
    return (
        <div className={styles.page}>
            <MainSlider />
            <Since />
            <Slogan />
            <Service />
            <Standard />
            <Guarantee />
            <Event />
            <Map />
            <Reserve />
            <Media />
        </div>
    );
}
