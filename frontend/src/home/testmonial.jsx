import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "I absolutely love Vima Shoes! The quality and style of their footwear are unmatched. The comfort and durability make every step a pleasure. Vima has become my go-to choice for fashionable and reliable footwear!",
      author: "Jane Doe",
      role: "Happy Customer"
    },
    {
      quote: "Vima Shoes exceeded my expectations! The attention to detail in their designs and craftsmanship are truly impressive. I've received numerous compliments and the comfort is exceptional. Vima has earned a loyal customer!",
      author: "John Smith",
      role: "Satisfied Shopper"
    },
    {
      quote: "Vima Shoes is a game-changer! Their commitment to quality and style sets them apart. I'm thrilled with the comfort and modern design. The shoes are fashionable yet durable. Can't wait to explore more!",
      author: "Alex Rodriguez",
      role: "Trendsetter"
    }
  ];

  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          What Our Customers Say
        </h2>

        {/* Desktop Grid View (hidden on mobile) */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center text-emerald-500 mb-4">
                <FaQuoteRight className="text-3xl mx-auto" />
              </div>
              <p className="text-gray-600 text-lg mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-emerald-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel (visible on mobile) */}
        <div className="md:hidden relative">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center text-emerald-500 mb-4">
              <FaQuoteRight className="text-3xl mx-auto" />
            </div>
            <p className="text-gray-600 text-lg mb-6 italic">
              "{testimonials[activeIndex].quote}"
            </p>
            <div className="text-right">
              <p className="font-semibold text-gray-800">{testimonials[activeIndex].author}</p>
              <p className="text-sm text-emerald-600">{testimonials[activeIndex].role}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="text-emerald-600 text-xl" />
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-emerald-50 transition-colors"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="text-emerald-600 text-xl" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-emerald-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;