import React, { useState } from 'react';
import './home.scss';
import Navbar from './Navbar/Navbar'
import Slider from './slider/Slider';
const Home = () => {

   const [slider, setSlider] = useState(false);

   const toggleslider = () => {
      setSlider(!slider)
   }

   return (
      <>
         <div className="homecontainer">
            <Navbar openSidebar={toggleslider} />
            <Slider slider={slider} openSidebar={toggleslider} />
         </div>
      </>
   )
}

export default Home;