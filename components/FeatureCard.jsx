import Image from "next/image";
import React from "react";

const FeatureCard = ({ title, images }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl p-6  w-full h-[300px] text-white shadow-lg flex flex-col">
      <h2 className="text-center text-lg font-semibold mb-4">{title}</h2>

      <div className="relative flex-1 flex justify-center items-end">
        <div className="relative w-[250px] h-[200px] ">
          {images.map((img, index) => (
            <div
              key={index}
              className="absolute bottom-[100px] transition-all duration-300 hover:scale-105 hover:z-10"
              style={{
                left: `${index * 50}px`,
                bottom: "0px", // Cards sit at the very bottom
                zIndex: images.length - index,
                transform: `rotate(${(index - 1) * 8}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              <Image
                src={img}
                alt={`anime-${index}`}
                width={120}
                height={170}
                className="rounded-lg border-2 border-white/10 shadow-xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
