import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import './TestimonialSlider.css';

interface Testimonial {
    id: number;
    text: string;
    author: string;
    role: string;
    stars: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        text: "Our foot traffic increased by 30% after partnering with Ads on WiFi. Customers love the free internet!",
        author: "Ahmed Khan",
        role: "Cafe Owner, Karachi",
        stars: 5
    },
    {
        id: 2,
        text: "Best ROI we've seen from any advertising channel. 100% guaranteed views with local targeting!",
        author: "Sarah Ali",
        role: "Marketing Manager, Local Brand",
        stars: 5
    },
    {
        id: 3,
        text: "Professional setup, zero maintenance cost, and happy customers. It's a win-win partnership!",
        author: "Bilal Hassan",
        role: "Gym Owner, Lahore",
        stars: 5
    }
];

const TestimonialSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [currentIndex, isAnimating]);

    return (
        <div className="testimonial-slider-container">
            <div className="testimonial-slider-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {testimonials.map((t) => (
                    <div className="testimonial-slide" key={t.id}>
                        <div className="testimonial-card">
                            <div className="stars">
                                {[...Array(t.stars)].map((_, i) => (
                                    <Star key={i} size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                                ))}
                            </div>
                            <p className="testimonial-text">"{t.text}"</p>
                            <div className="testimonial-author">
                                <strong>{t.author}</strong>
                                <span>{t.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="slider-controls">
                <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous testimonial">
                    <ChevronLeft size={24} />
                </button>
                <div className="slider-dots">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
                <button className="slider-btn next" onClick={nextSlide} aria-label="Next testimonial">
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default TestimonialSlider;
