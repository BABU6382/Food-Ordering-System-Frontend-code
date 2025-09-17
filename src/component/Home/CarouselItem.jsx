import React from 'react';

export const CarouselItem = ({ image, title }) => {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <div className="aspect-square w-28 sm:w-32 md:w-40 lg:w-48 overflow-hidden rounded-full flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <span className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-white text-center">
        {title}
      </span>
    </div>
  );
};
