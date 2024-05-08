import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function ArticleCarousel({ images }) {
    const [index, setIndex] = React.useState(0)

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    }

    return (
        images.length > 1 ? (
            <Carousel interval={null} className="carousel-dark" activeIndex={index} onSelect={handleSelect}>
                {images.map((image, idx) => (
                    <Carousel.Item className="ratio ratio-4x3" key={idx}>
                        <img
                            className="card-img-top d-block object-fit-cover"
                            src={image}
                            alt=""
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        ) : (
            images[0] ? (
                <img
                    className="card-img-top d-block object-fit-cover"
                    src={images[0]}
                    alt=""
                />
            ) : null
        )
    )
}
