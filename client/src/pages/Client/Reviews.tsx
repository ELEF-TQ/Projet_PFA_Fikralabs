import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import StarIcon from "@mui/icons-material/Star";
import defaultIMG from '../../assets/images/defaultUser.png'
import { getAllReviewsByClient } from "../../context/features/ReviewSlice";
import Spinner from "../../components/status/Spinner";
import { retrieveUserSession } from "../../lib/Encryption";
import moment from "moment";
import EditReview from "./EditReview";
import { Avatar, Typography } from "@mui/material";

const Reviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  console.log(reviews)
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
    setShowEditModal(true);
  };

  const noReviews = reviews.reviews.length === 0;

  const handleClose = () => {
    setShowEditModal(false);
    setSelectedReview(null);
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
    [...reviews.reviews]
    .sort((reviewA: { dateReview: Date }, reviewB: { dateReview: Date }) => new Date(reviewB.dateReview).getTime() - new Date(reviewA.dateReview).getTime())
    .map((review: any) => (
      <div
        key={review._id}
        className="flex flex-col sm:flex-row border-b-2 border-green-500 p-4 mb-4 items-center justify-between rounded-lg shadow-md bg-white cursor-pointer hover:bg-slate-100 transition duration-300 ease-in-out"
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Avatar
            src={review.pompiste.image?.buffer ? `data:image/png;base64,${review.pompiste.image?.buffer}` : defaultIMG}
            alt="Avatar"
            sx={{ marginRight: '16px' }}
            className="w-32 h-32 rounded-full mx-auto ring-2 ring-green-500"
          />
          <div style={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {review.pompiste.username}
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(0, 0, 0, 0.54)' }}>
              <Typography variant="body2" sx={{ marginRight: '8px' }}>
                {calculateDuration(review.dateReview)} ago
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ color: "#FFB400", marginRight: '4px' }} />
                <Typography variant="body2">{review.etoiles} étoile(s)</Typography>
              </div>
            </div>
            <Typography variant="body1">
              {review.commentaire}
            </Typography>
          </div>
        </div>
        <button
          onClick={() => handleEditClick(review)}
          className="Confirm__Button  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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

