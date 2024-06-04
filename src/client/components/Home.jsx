import MenuMap from "./MenuMap"
import SoundSwiper from "./SoundSwiper";
import { useState } from "react"

const Home = ({ parentPage, setParentPage }) => {
  const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const [sound, setSound] = useState(false);

  return(
    <>
      {isMobileOrTablet?
      <SoundSwiper isSoundOn={setSound} >
      <MenuMap setParentPage={setParentPage} />
      </SoundSwiper> :
      <MenuMap setParentPage={setParentPage} setSound={setSound}/>}
    </>
  )
}

export default Home;