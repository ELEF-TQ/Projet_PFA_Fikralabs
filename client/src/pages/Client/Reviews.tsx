import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getAllReviewsByClient } from "../../context/features/ReviewSlice";
import Spinner from "../../components/status/Spinner";
import { retrieveUserSession } from "../../lib/Encryption";
import moment from "moment";
import EditReview from "./EditReview";

const Reviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
//   const [commentaire, setCommentaire] = useState('');

  useEffect(() => {
    const user = retrieveUserSession();
    dispatch(getAllReviewsByClient(user._id));
  }, []);

  const calculateDuration = (reviewDate: Date) => {
    const now = moment();
    const reviewDateTime = moment(reviewDate);
    const duration = moment.duration(now.diff(reviewDateTime));
    const formattedDuration = duration.humanize();
    return formattedDuration;
  };

  const handleEditClick = (review: any) => {
    setSelectedReview(review);
    // setCommentaire(review.commentaire);
    setShowEditModal(true);
  };

  const noReviews = reviews.reviews.length === 0;

  const handleClose = () => {
    setShowEditModal(false);
    setSelectedReview(null);
    // setCommentaire('');
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Évaluations</h1>
      {reviews.isLoading && <Spinner />}

      {!reviews.isLoading && noReviews && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              Vous n'avez aucun évaluations
            </p>
          </div>
        </div>
      )}

      {!reviews.isLoading &&
        !noReviews &&
        reviews.reviews.map((review: any) => (
          <div
            key={review._id}
            className="flex flex-col sm:flex-row border-b border-gray-300 p-4 mb-4 items-center justify-between rounded-lg shadow-md bg-white cursor-pointer hover:bg-slate-100 transition duration-300 ease-in-out"
          >
            <div className="flex-shrink-0 min-w-16 sm:mb-0 sm:mr-4">
              <p className="text-base" style={{ color: "#C2C2C2" }}>
                {review.commentaire}
              </p>
            </div>
            <div className="flex-shrink-0 w-full sm:w-1/4">
              <p className={"text-sm flex items-center justify-center"}>
                {Array.from({ length: 5 }).map((_, index) => (
                  index < review.etoiles ? (
                    <StarIcon
                      key={index}
                      className="text-2xl"
                      style={{ color: "#FFB400" }}
                    />
                  ) : (
                    <StarBorderIcon
                      key={index}
                      className="text-2xl"
                      style={{ color: "#C2C2C2" }}
                    />
                  )
                ))}
              </p>
            </div>
            <div className="flex-shrink-0 min-w-20 text-center">
              <p
                className="text-sm text-gray-500"
                style={{ color: "#C2C2C2" }}
              >
                {calculateDuration(review.dateReview)}
              </p>
            </div>
            <button
              onClick={() => handleEditClick(review)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      {showEditModal && selectedReview && (
        <EditReview
          show={showEditModal}
          handleClose={handleClose}
          Element={selectedReview}
        />
      )}
    </div>
  );
};

export default Reviews;

