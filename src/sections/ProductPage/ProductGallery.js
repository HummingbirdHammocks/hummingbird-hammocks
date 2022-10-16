import React, { useState, useEffect } from "react"
import { Box } from "@mui/material"
import { FreeMode, Navigation, Thumbs } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { GatsbyImage } from "gatsby-plugin-image"

const ProductGallery = ({ images, variantImageId }) => {
    const [swiper, setSwiper] = useState(null)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)


    const handleVariantChange = variantImageId => {
        swiper.slideTo(
            images.findIndex(image => {
                return image.shopifyId === variantImageId
            })
        )
    }

    useEffect(() => {
        if (variantImageId) {
            handleVariantChange(variantImageId)
        }
    }, [variantImageId])

    return (
        <Box
            justifyContent="center"
            alignItems="center"
            sx={{
                ".swiper-button-prev, .swiper-button-next": {
                    color: "#34542a",
                },
            }}
        >
            <Swiper
                onSwiper={setSwiper}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, FreeMode, Thumbs]}
                className="mySwiper"
            >
                {images.map(image => (
                    <SwiperSlide key={image.id}>
                        <GatsbyImage
                            placeholder="blurred"
                            imgStyle={{ borderRadius: "20px" }}
                            image={image.gatsbyImageData}
                            alt={image.altText}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                style={{ marginTop: "30px" }}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Thumbs]}
                className="mySwiper"
            >
                {images.map(image => (
                    <SwiperSlide key={image.id} style={{ cursor: "pointer" }}>
                        <GatsbyImage
                            imgStyle={{ borderRadius: "10px" }}
                            placeholder="blurred"
                            image={image.gatsbyImageData}
                            alt={image.altText}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}

export default ProductGallery
