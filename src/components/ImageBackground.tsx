import React, { useEffect, useMemo, useState } from "react";

interface Props {
  images: string[];
  maxWidth?: number;
  spread?: number;
  rotationRange?: number;
  verticalJitter?: number;
  scaleRange?: [number, number];
  seed?: number;
}


const ImageBackground: React.FC<Props> = ({
  images,
  maxWidth = 550,
  spread = 1.5,
  rotationRange = 16,
  verticalJitter = 24,
  scaleRange = [0.9, 1.05],
}) => {
  const rand = Math.random

  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth;
      if (w < 1000) setScaleFactor(0.3); 
      else setScaleFactor(1);              
      console.log({w})
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const items = useMemo(() => {
    const len = images.length;
    const centerIndex = (len - 1) / 2;

    return images.map((src, i) => {
      const baseOffset = (i - centerIndex) * (maxWidth * 0.45) * spread * scaleFactor;
      const wiggleX = (rand() - 0.5) * (maxWidth * 0.2) * scaleFactor;
      const rotation = (rand() - 0.5) * 2 * rotationRange;
      const translateY = (rand() - 0.5) * 2 * verticalJitter * scaleFactor;
      const scale = scaleRange[0] + rand() * (scaleRange[1] - scaleRange[0]);
      const widthPx = Math.round(maxWidth * scaleFactor * (0.9 + rand() * 0.3));
      const opacity = 0.95 - rand() * 0.15;

      return {
        src,
        transform: `translate(-50%, -50%) translateX(${baseOffset + wiggleX}px) translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`,
        widthPx,
        opacity,
        zIndex: i,
      };
    });
  }, [
    images,
    maxWidth,
    spread,
    rotationRange,
    verticalJitter,
    scaleRange,
    rand,
    scaleFactor,
  ]);

  return (
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden w-full h-full z-0"
      >
      {items.map((it, idx) => (
        <img
          key={idx}
          src={it.src}
          alt={`background-${idx}`}
          loading="lazy"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: it.transform,
            zIndex: 0,
            width: `${it.widthPx}px`,
            maxWidth: "32vw",
            minWidth: "120px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      ))}
    </div>
  );
};

export default ImageBackground;
