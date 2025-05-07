'use client';

import { Box } from '@mui/material';
import Slider from 'react-slick';

const items = [
  { title: 'Banner 1', color: '#d885f7' },
  { title: 'Banner 2', color: '#1e88e5' },
  { title: 'Banner 3', color: '#43a047' },
];

export default function BlogHighlightCard() {
  const settings = {
    centerMode: true,
    centerPadding: '20%',// 左右“peek”距离
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    arrows: false,
    dots: true,
  };

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden', py: 6 }}>
      <Slider {...settings}>
        {items.map((item, index) => (
          <Box
            key={index}
            sx={{
              mx: 2,
              backgroundColor: item.color,
              height: 300,
              borderRadius: 4,
              color: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 32,
              fontWeight: 'bold',
              transition: 'transform 0.4s ease',
            }}
          >
            {item.title}
          </Box>
        ))}
      </Slider>

      <style jsx global>{`
        .slick-slide {
          opacity: 0.5;
          transform: scale(0.9);
          transition: all 0.4s ease;
        }

        .slick-center {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
    </Box>
  );
}