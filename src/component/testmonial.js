import React from 'react';
import '../css/testmonianl.css'; 

const Testimonials = () => {
  return (
    <section>
    <div className="rev p-5">
   <h1>TESTIMONIALS</h1>
      <div className="testimonials big-screen">
        
      <div className="testimonial-item">
  <p>
    "I absolutely love Vima Shoes! The quality and style of their footwear are unmatched.
    The comfort and durability of the shoes make every step a pleasure. Vima Shoes has
    become my go-to choice for fashionable and reliable footwear. I highly recommend
    their products to anyone looking for the perfect blend of style and comfort!"
  </p>
  <p className="testimonial-name">- Happy Customer, Jane Doe</p>
</div>

<div className="testimonial-item">
  <p>
    "Vima Shoes exceeded my expectations! The attention to detail in their designs
    and the craftsmanship of their shoes are truly impressive. I've received numerous
    compliments on my Vima shoes, and the comfort they provide is exceptional. The
    variety of styles ensures there's a perfect pair for every occasion. Vima Shoes
    has earned a loyal customer in me!"
  </p>
  <p className="testimonial-name">- Satisfied Shopper, John Smith</p>
</div>

<div className="testimonial-item">
  <p>
    "Vima Shoes is a game-changer! Their commitment to quality and style sets them apart
    from the rest. I recently purchased a pair, and I'm thrilled with the level of comfort
    and the modern design. The shoes are not only fashionable but also durable. Vima Shoes
    has gained my trust, and I can't wait to explore more from their collection."
  </p>
  <p className="testimonial-name">- Trendsetter, Alex Rodriguez</p>
</div>

      </div>
    </div>

    <div id="carouselExampleIndicators" class="carousel slide small-screen" style={{marginBottom:''}}>
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner justify-content-center p-5 ">
    <div class="carousel-item active">
     <div className="testimonial-item">
  <p>
    "I absolutely love Vima Shoes! The quality and style of their footwear are unmatched.
    The comfort and durability of the shoes make every step a pleasure. Vima Shoes has
    become my go-to choice for fashionable and reliable footwear. I highly recommend
    their products to anyone looking for the perfect blend of style and comfort!"
  </p>
  <p className="testimonial-name">- Happy Customer, Jane Doe</p>
</div>
    </div>
    <div class="carousel-item">
    <div className="testimonial-item">
    <p>
    "Vima Shoes exceeded my expectations! The attention to detail in their designs
    and the craftsmanship of their shoes are truly impressive. I've received numerous
    compliments on my Vima shoes, and the comfort they provide is exceptional. The
    variety of styles ensures there's a perfect pair for every occasion. Vima Shoes
    has earned a loyal customer in me!"
  </p>
  <p className="testimonial-name">- Satisfied Shopper, John Smith</p>
</div>
    </div>
    <div class="carousel-item">
    <div className="testimonial-item">
    <p>
    "Vima Shoes is a game-changer! Their commitment to quality and style sets them apart
    from the rest. I recently purchased a pair, and I'm thrilled with the level of comfort
    and the modern design. The shoes are not only fashionable but also durable. Vima Shoes
    has gained my trust, and I can't wait to explore more from their collection."
  </p>
  <p className="testimonial-name">- Trendsetter, Alex Rodriguez</p>
</div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="false" style={{color:'red', backgroundColor:'red'}}></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="false" style={{color:'red', backgroundColor:'red'}}></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </section>
  );
};

export default Testimonials;
