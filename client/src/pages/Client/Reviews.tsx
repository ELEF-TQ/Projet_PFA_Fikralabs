import  { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import StarIcon from "@mui/icons-material/Star";
import defaultIMG from '../../assets/images/defaultUser.png'
import { getAllReviewsByClient } from "../../context/features/ReviewSlice";
import Spinner from "../../components/status/Spinner";
import { retrieveUserSession } from "../../utils/Encryption";
import moment from "moment";
import EditReview from "./EditReview";
import { Avatar, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

const Reviews = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

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
      <h1 className="text-4xl font-bold mb-4">Évaluations</h1>
      <p className='mb-8 text-gray-700'>
        Consultez vos évaluations et commentaires : Retracez vos expériences passées avec nos pompistes et partagez vos impressions.
      </p>
      {reviews.isLoading && <Spinner />}
      {!reviews.isLoading && noReviews && (
          <div className="flex justify-center items-center">
          <div className="bg-yellow-100 text-yellow-800 p-6 rounded border border-yellow-400 max-w-2xl text-xl flex items-center">
          <InfoOutlined className="mr-2" />
            Aucune évaluation pour le moment
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
        className={`flex flex-col sm:flex-row border-b-2 ${review.alerted ? 'border-red-500' : 'border-green-500'} p-4 mb-4 items-center justify-between rounded-lg shadow-md bg-white cursor-pointer hover:bg-slate-100 transition duration-300 ease-in-out`}      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Avatar
            src={review?.pompiste?.image?.buffer ? `data:image/png;base64,${review.pompiste.image?.buffer}` : defaultIMG}
            alt="Avatar"
            sx={{ marginRight: '16px' }}
            className="w-32 h-32 rounded-full mx-auto ring-2 ring-green-500"
          />
          <div style={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {review?.pompiste?.username}
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
          className={` ${review.alerted ? 'bg-red-500 hover:bg-red-600 border border-red-500' : 'bg-green-500 hover:bg-green-600 border border-green-500'} text-white font-semibold py-2 px-4 rounded`}
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

