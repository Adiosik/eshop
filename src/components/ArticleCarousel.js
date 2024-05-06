import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function ArticleCarousel({ images }) {
    const [index, setIndex] = React.useState(0)

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    return (
        <div className="ratio ratio-4x3">
            <Carousel className="carousel-dark" activeIndex={index} onSelect={handleSelect}>
                {images.map((image, idx) => (
                    <Carousel.Item key={idx}>
                        <img
                            className="card-img-top d-block object-fit-cover"
                            src={image}
                            alt=""
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    )
}
