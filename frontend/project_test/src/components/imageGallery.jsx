const ImageGallery = ({ images }) => {
  const renderImage = (image) => (
    <div className="w-full h-full">
      <img
        src={image?.imageUrl || "https://via.placeholder.com/600x400"}
        alt={image?.alt || "Placeholder"}
        className="object-cover w-full h-full"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* First Row */}
      <div className="col-span-1">{renderImage(images[0])}</div>
      <div className="grid col-span-2 grid-rows-2 gap-4">
        <div>{renderImage(images[1])}</div>
        <div>{renderImage(images[2])}</div>
      </div>

      {/* Second Row */}
      <div className="grid col-span-2 grid-rows-2 gap-4">
        <div>{renderImage(images[3])}</div>
        <div>{renderImage(images[4])}</div>
      </div>
      <div className="col-span-1">{renderImage(images[5])}</div>
    </div>
  );
};

ImageGallery.defaultProps = {
  images: Array(6).fill({
    imageUrl: "https://via.placeholder.com/600x400",
    alt: "Placeholder Image",
  }),
};

export default ImageGallery;
