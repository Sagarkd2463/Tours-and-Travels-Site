import React from 'react';
import Slider from 'react-slick';
import ava01Img from '../../assets/images/ava-1.jpg';
import ava02Img from '../../assets/images/ava-2.jpg';
import ava03Img from '../../assets/images/ava-3.jpg';

const Testimonials = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
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
        ]
    };

    return (
        <Slider {...settings}>
            <div className="testimonial py-4 px-3">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, facilis tempore magnam laudantium facere sunt,
                    neque fugiat expedita saepe ex, consectetur nemo sequi debitis adipisci accusantium possimus modi eligendi? Inventore.
                    Sapiente iure cumque incidunt unde dicta expedita iusto omnis aliquid amet quae. Pariatur optio numquam esse dolorem,
                    expedita temporibus soluta autem, quam cumque eum assumenda magnam dicta praesentium! Illum, magni.
                </p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava01Img} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, facilis tempore magnam laudantium facere sunt,
                    neque fugiat expedita saepe ex, consectetur nemo sequi debitis adipisci accusantium possimus modi eligendi? Inventore.
                    Sapiente iure cumque incidunt unde dicta expedita iusto omnis aliquid amet quae. Pariatur optio numquam esse dolorem,
                    expedita temporibus soluta autem, quam cumque eum assumenda magnam dicta praesentium! Illum, magni.
                </p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava02Img} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>Lia Franklin</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, facilis tempore magnam laudantium facere sunt,
                    neque fugiat expedita saepe ex, consectetur nemo sequi debitis adipisci accusantium possimus modi eligendi? Inventore.
                    Sapiente iure cumque incidunt unde dicta expedita iusto omnis aliquid amet quae. Pariatur optio numquam esse dolorem,
                    expedita temporibus soluta autem, quam cumque eum assumenda magnam dicta praesentium! Illum, magni.
                </p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava03Img} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, facilis tempore magnam laudantium facere sunt,
                    neque fugiat expedita saepe ex, consectetur nemo sequi debitis adipisci accusantium possimus modi eligendi? Inventore.
                    Sapiente iure cumque incidunt unde dicta expedita iusto omnis aliquid amet quae. Pariatur optio numquam esse dolorem,
                    expedita temporibus soluta autem, quam cumque eum assumenda magnam dicta praesentium! Illum, magni.
                </p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava03Img} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, facilis tempore magnam laudantium facere sunt,
                    neque fugiat expedita saepe ex, consectetur nemo sequi debitis adipisci accusantium possimus modi eligendi? Inventore.
                    Sapiente iure cumque incidunt unde dicta expedita iusto omnis aliquid amet quae. Pariatur optio numquam esse dolorem,
                    expedita temporibus soluta autem, quam cumque eum assumenda magnam dicta praesentium! Illum, magni.
                </p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava03Img} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className="testimonial py-4 px-3">
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, facilis tempore magnam laudantium facere sunt,
                    neque fugiat expedita saepe ex, consectetur nemo sequi debitis adipisci accusantium possimus modi eligendi? Inventore.
                    Sapiente iure cumque incidunt unde dicta expedita iusto omnis aliquid amet quae. Pariatur optio numquam esse dolorem,
                    expedita temporibus soluta autem, quam cumque eum assumenda magnam dicta praesentium! Illum, magni.
                </p>

                <div className='d-flex align-items-center gap-4 mt-3'>
                    <img src={ava03Img} className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h6 className='mb-0 mt-3'>John Doe</h6>
                        <p>Customer</p>
                    </div>
                </div>
            </div>
        </Slider>
    );
};

export default Testimonials;