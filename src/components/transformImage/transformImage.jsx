import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

const TransformImage = ({ crop, width, height, src, alt, classname }) => {
  return (
    <CloudinaryContext cloudName="olanetsoft">
      <Image
        src={src}
        alt={alt}
        className={classname}
      >
        <Transformation width={width} height={height} crop={crop} />
      </Image>
    </CloudinaryContext>
  );
};

export default TransformImage;