const Reviews = ({ reviews }) => {
    return (
      <div className="mt-4">
        <h2 className="mb-2 text-xl font-bold">What people are saying</h2>
        {reviews.map((review) => (
          <div key={review.id} className="mb-4">
            <div className="flex items-center space-x-2 text-yellow-500">
              {/* Render star icons */}
            </div>
            <p>{review.comment}</p>
            <p className="text-gray-500">- {review.author}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Reviews;