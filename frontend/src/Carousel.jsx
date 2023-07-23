import React from 'react';
import { Carousel } from 'react-bootstrap';

const flowershop = [
  {
    src: './flowershop8.jpg',
    // altText: '슬라이드2',
    // caption: '슬라이드2 설명',
    // header: '슬라이드2 제목'
  },
  {
    src: './flowershop10.jpg',
    // altText: '슬라이드3',
    // caption: '슬라이드3 설명',
    // header: '슬라이드3 제목'
  },
];

export default function () {
  return (
    <Carousel style={{ maxHeight: '100%' }}>
      {flowershop.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100"
            style={{ height: '100%', objectFit: 'cover' }}
            src={item.src}
            alt={item.altText}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
