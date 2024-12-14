import React from 'react';
import Slider from 'react-slick';
import ava01Img from '../../assets/images/ava-1.jpg';
import ava02Img from '../../assets/images/ava-2.jpg';
import ava03Img from '../../assets/images/ava-3.jpg';

const Testimonials = () => {
    const testimonials = [
        { text: "Great service!", name: "John Doe", image: ava01Img },
        { text: "Amazing experience!", name: "Lia Franklin", image: ava02Img },
        { text: "Highly recommend!", name: "Mark Smith", image: ava03Img },
    ];

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider {...settings}>
            {testimonials.map((item, index) => (
                <div className="testimonial py-4 px-3" key={index}>
                    <p>{item.text}</p>
                    <div className="d-flex align-items-center gap-4 mt-3">
                        <img src={item.image} className="w-25 h-25 rounded-2" alt={item.name} />
                        <div>
                            <h6 className="mb-0 mt-3">{item.name}</h6>
                            <p>Customer</p>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Testimonials;