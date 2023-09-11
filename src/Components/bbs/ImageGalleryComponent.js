// ImageGalleryComponent.js
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import "../../css/ImageGalleryComponent.css";

function ImageGalleryComponent({ imageUrls }) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (imageUrls && imageUrls.length > 0) {
            const galleryImages = imageUrls.map(url => ({
                original: url,
                thumbnail: url
            }));
            setImages(galleryImages);
        }
    }, [imageUrls]);

    return (
        <div className="image-gallery-container">
            <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={true}
                showBullets={true}
                slideDuration={150}
                lazyLoad={true}
                showNav={false}
                showThumbnails={true}
                additionalClass="image-gallery-custom"
            />
        </div>
    );
}

export default ImageGalleryComponent;
