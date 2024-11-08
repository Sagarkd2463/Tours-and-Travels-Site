import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';
import WeatherImg from '../assets/images/weather.png';
import GuideImg from '../assets/images/guide.png';
import CustomizationImg from '../assets/images/customization.png';

const servicesData = [
    {
        imgUrl: WeatherImg,
        title: "Calculate Weather",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    },
    {
        imgUrl: GuideImg,
        title: "Best Tour Guide",
        desc: "Explicabo eligendi voluptatem eos provident ullam architecto corrupti",
    },
    {
        imgUrl: CustomizationImg,
        title: "Customization",
        desc: "Animi eius illo provident pariatur quis explicabo dolores obcaecati sit!",
    },
];

const ServiceList = () => {
    return (
        <>
            {
                servicesData.map((item, index) => (
                    <Col lg="3" md="6" sm="12" key={index} className='mb-4'>
                        <ServiceCard item={item} />
                    </Col>
                ))
            }
        </>
    );
};

export default ServiceList;