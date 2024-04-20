import { useState, useEffect } from "react";

export default function Carousel({ img1, img2, img3 }) {
    const images = [img1, img2, img3];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };


    useEffect(() => {
        // Automatically switch to the next slide every 2 seconds
        const intervalId = setInterval(() => {
            nextSlide();
        }, 4000);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [currentIndex]);

    return (
        <div className="carousel-container relative overflow-hidde">
            <div className="carousel-track flex transition-transform duration-200" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Slide ${index + 1}`} className="w-full object-fill aspect-auto flex-shrink-0 h-[500px]" />
                ))}
            </div>
            <div className="flex gap-2 absolute bottom-0 left-[50%] text-2xl">
                <button onClick={prevSlide} className="carousel-control prev p-1 px-2 rounded-lg cursor-pointer">&#8249;</button>
                <button onClick={nextSlide} className="carousel-control next p-1 px-2 rounded-lg cursor-pointer">&#8250;</button>
            </div>
        </div>
    );
};