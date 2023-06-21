import { Box } from '@mui/material';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useCallback, useEffect, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const ProductGallery = ({ media, selectedVariant, accentcolor }) => {
  const [swiper, setSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleVariantChange = useCallback(
    (variantImageId) => {
      swiper.slideTo(
        media.findIndex((image) => {
          return image.shopifyId === variantImageId;
        })
      );
    },
    [media, swiper]
  );

  //console.log(selectedVariant);
  //console.log(media);

  useEffect(() => {
    if (selectedVariant?.image?.id) {
      handleVariantChange(selectedVariant?.image?.id);
    }
  }, [selectedVariant, handleVariantChange]);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      sx={{
        '.swiper-button-prev, .swiper-button-next': {
          color: accentcolor ? accentcolor : '#34542a'
        }
      }}>
      <Swiper
        onSwiper={setSwiper}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, FreeMode, Thumbs]}
        className="mySwiper">
        {media.map((image) => (
          <SwiperSlide key={image.shopifyId}>
            <GatsbyImage
              placeholder="blurred"
              imgStyle={{ borderRadius: '20px' }}
              image={image.image.gatsbyImageData}
              alt={image.image.altText}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        style={{ marginTop: '30px' }}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="mySwiper">
        {media.map((image) => (
          <SwiperSlide key={`${image.shopifyId}-thumb`} style={{ cursor: 'pointer' }}>
            <GatsbyImage
              imgStyle={{ borderRadius: '10px' }}
              placeholder="blurred"
              image={image.image.gatsbyImageData}
              alt={image.image.altText}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ProductGallery;
