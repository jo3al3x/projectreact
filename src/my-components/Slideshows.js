import React, { useState, useEffect } from 'react';

const Slideshows = () => {
  // Shared styles object
  const styles = {
    container: {
      padding: '16px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    slideContainer: {
      margin: '16px 0',
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    slideshow: {
      position: 'relative',
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    imageContainer: {
      position: 'relative',
      height: '300px', // Fixed height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
    },
    caption: {
      position: 'absolute',
      bottom: '12px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '4px',
      zIndex: 1,
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: 'white',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    },
    prevButton: {
      left: '8px',
    },
    nextButton: {
      right: '8px',
    },
    dotsContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '16px',
    },
    dot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
    },
    activeDot: {
      backgroundColor: '#3b82f6',
    },
    inactiveDot: {
      backgroundColor: '#d1d5db',
    },
  };

  // AutoSlideshow Component
  const AutoSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
      { src: "/iphone14.png", alt: "iPhone 14" },
      { src: "/SamsungGalaxy.png", alt: "Samsung Galaxy" },
      { src: "/nokia.png", alt: "Nokia" }
    ];

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000);

      return () => clearInterval(timer);
    }, []);

    return (
      <div style={styles.slideContainer}>
        <h3 style={styles.title}>Latest Models</h3>
        <div style={styles.slideshow}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <div style={styles.imageContainer}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style={styles.image}
                />
                <div style={styles.caption}>{image.alt}</div>
              </div>
            </div>
          ))}
          <div style={styles.dotsContainer}>
            {images.map((_, index) => (
              <span
                key={index}
                style={{
                  ...styles.dot,
                  ...(index === currentIndex ? styles.activeDot : styles.inactiveDot),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ManualSlideshow Component
  const ManualSlideshow = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
      { src: "/SamsungZfold.png", alt: "Samsung Z Fold" },
      { src: "/iphone15pro.png", alt: "iPhone 15 Pro" },
      { src: "/iphone16.png", alt: "iPhone 16" }
    ];

    const goToPrevious = () => {
      setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
      setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };

    return (
      <div style={styles.slideContainer}>
        <h3 style={styles.title}>Upcoming Releases</h3>
        <div style={styles.slideshow}>
          <button
            onClick={goToPrevious}
            style={{ ...styles.navButton, ...styles.prevButton }}
            aria-label="Previous"
          >
            ❮
          </button>

          {images.map((image, index) => (
            <div
              key={index}
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <div style={styles.imageContainer}>
                <img
                  src={image.src}
                  alt={image.alt}
                  style={styles.image}
                />
                <div style={styles.caption}>{image.alt}</div>
              </div>
            </div>
          ))}

          <button
            onClick={goToNext}
            style={{ ...styles.navButton, ...styles.nextButton }}
            aria-label="Next"
          >
            ❯
          </button>

          <div style={styles.dotsContainer}>
            {images.map((_, index) => (
              <button
                key={index}
                style={{
                  ...styles.dot,
                  ...(index === currentIndex ? styles.activeDot : styles.inactiveDot),
                }}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={{ ...styles.title, fontSize: '24px' }}>Phone Models</h2>
      <AutoSlideshow />
      <ManualSlideshow />
    </div>
  );
};

export default Slideshows;