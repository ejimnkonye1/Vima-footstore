import React from 'react';
import '../css/testmonianl.css'; 

const Testimonials = () => {
  return (
    <div className="rev p-5">
   <h1>TESTIMONIALS</h1>
      <div className="testimonials">
        
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
  );
};

export default Testimonials;
