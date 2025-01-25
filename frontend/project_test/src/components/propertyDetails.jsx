const PropertyDetails = ({ title, rating, numReviews, location }) => {
    return (
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center space-x-2 text-gray-500">
          <span>{rating}</span>
          <span>·</span>
          <span>{numReviews} reviews</span>
          <span>·</span>
          <span>{location}</span>
        </div>
      </div>
    );
  };
  
  export default PropertyDetails;