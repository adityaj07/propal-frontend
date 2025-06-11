import { FC } from "react";
import Image from "next/image";

const BackgroundImage: FC = () => {
  return (
    <>
      <Image
        src="/images/ooorganize.svg"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -20,
          opacity: 0.3,
          overflow: "hidden",
          pointerEvents: "none",
        }}
        alt="Hero background"
        className="gradient-mask-b-50-d"
      />
    </>
  );
};

export default BackgroundImage;
