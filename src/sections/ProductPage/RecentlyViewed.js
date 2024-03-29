import { Box, Divider, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// components
import {
  Link
  /* , ProductPreviewBadge */
} from '../../components';
// stores
import { useRecentlyViewedStore } from '../../stores';

const AbsoluteImage = styled(GatsbyImage)(({ theme }) => ({
  borderRadius: '20px',

  [theme.breakpoints.down('md')]: {
    margin: '0 30px'
  }
}));

export function RecentlyViewed({ title }) {
  const theme = useTheme();
  const { recentlyViewedProducts } = useRecentlyViewedStore();

  /* console.log(recentlyViewedProducts) */

  if (
    !recentlyViewedProducts ||
    recentlyViewedProducts.length < 1 ||
    recentlyViewedProducts === {}
  ) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        marginTop: '32px',
        marginBottom: '32px',

        '& .swiper-pagination': {
          bottom: '-3px!important'
        },

        '& .swiper-pagination-bullet': {
          backgroundColor: '#132210!important'
        },

        '.swiper-button-prev, .swiper-button-next': {
          color: '#34542a'
        },

        [theme.breakpoints.down('md')]: {
          padding: '70px 10px 50px 10px'
        }
      }}>
      <Typography pb="30px" textAlign="center" variant="h4">
        {title}
      </Typography>
      <Divider variant="middle" sx={{ marginBottom: 4 }} />
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 10
          },
          '@0.50': {
            slidesPerView: 2,
            spaceBetween: 10
          },
          '@0.75': {
            slidesPerView: 3,
            spaceBetween: 40
          },
          '@1.00': {
            slidesPerView: 4,
            spaceBetween: 50
          },
          '@1.50': {
            slidesPerView: 5,
            spaceBetween: 60
          }
        }}
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper">
        {recentlyViewedProducts.map((item) => (
          <SwiperSlide key={item.shopifyId}>
            <Box
              sx={{
                '& .image-2': {
                  display: 'none'
                },

                '&:hover': {
                  '& .image-2': {
                    display: 'block'
                  },
                  '& .image-1': {
                    display: 'none'
                  }
                }
              }}>
              <Link to={`/products/${item.handle}`}>
                {item.featuredImage && (
                  <AbsoluteImage
                    className="image-1"
                    image={item.featuredImage.gatsbyImageData}
                    alt={item.featuredImage.altText}
                    placeholder="blurred"
                  />
                )}
                {item.media && item.media[1] ? (
                  <AbsoluteImage
                    className="image-2"
                    image={item.media[1].image.gatsbyImageData}
                    alt={item.media[1].image.altText}
                    placeholder="blurred"
                  />
                ) : (
                  <AbsoluteImage
                    className="image-2"
                    image={item.featuredImage.gatsbyImageData}
                    alt={item.featuredImage.altText}
                    placeholder="blurred"
                  />
                )}
              </Link>

              <Box
                sx={{
                  marginTop: '40px',
                  textAlign: 'center'
                }}>
                <Link to={`/products/${item.handle}`}>
                  <Typography textAlign={'center'} variant="subtitle2" color="black">
                    {item.title}
                  </Typography>
                </Link>

                <Typography textAlign={'center'} variant="subtitle3" color="black">
                  {`$${item.priceRangeV2.minVariantPrice.amount} ${item.priceRangeV2.minVariantPrice.currencyCode}`}
                </Typography>

                {/* <Box
                  sx={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <ProductPreviewBadge handle={item.handle} />
                </Box> */}

                {/* <AddToCart
                  variantId={item.variants[0].shopifyId}
                  available={item.variants.availableForSale}
                /> */}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
