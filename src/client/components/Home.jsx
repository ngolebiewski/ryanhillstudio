import MenuMap from "./MenuMap"
import SoundSwiper from "./SoundSwiper";
import { useState } from "react"

const Home = ({ parentPage, setParentPage }) => {
  const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const [isSoundOn, setIsSoundOn] = useState(false);

  return(
    <>
      {isMobileOrTablet?
      <SoundSwiper isSoundOn={isSoundOn} >
      <MenuMap setParentPage={setParentPage} isSoundOn={isSoundOn} setIsSoundOn={setIsSoundOn}/>
      </SoundSwiper> :
      <MenuMap setParentPage={setParentPage} isSoundOn={isSoundOn} setIsSoundOn={setIsSoundOn}/>}
      </>
  )
}

export default Home;