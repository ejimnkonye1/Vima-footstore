// Inside your React component (Ani.js)
import React from "react";
import '../css/aninat.css';
import img1 from '../images/brown-man-s-leather-derby-shoes-removebg-preview.png'
import img2 from '../images/leather-sandals-pair-colors-sea-removebg.png'
import img3 from '../images/soft-woolen-baby-booties-handmade-with-elegance-generated-by-ai-removebg.png'

const Ani = () => {
    return (
        <div className="container-fluid cont p-5">
        <section className="ani">
            <div className="slider-wrapper">
                <div className="slider">
                    <div className="slide">
                        <div className="slide-content">
                            <img id="slide-1" src={img1} alt="Slide 1" />
                            <p>LET MAKE</p>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="slide-content">
                            <img id="slide-2" src={img2} height={'80%'} alt="Slide 2" />
                            <p>OUR HOPE YOUR</p>
                        </div>
                    </div>
                    <div className="slide">
                        <div className="slide-content">
                            <img id="slide-3" src={img3} alt="Slide 3" />
                            <p>WE HAVE</p>
                        </div>
                    </div>
                </div>
                <div className="slider-nav">
                    <a href="#slide-1"></a>
                    <a href="#slide-2"></a>
                    <a href="#slide-3"></a>
                </div>
            </div>
        </section>
        </div>
    );
}

export default Ani;
