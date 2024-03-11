import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getAllReviews } from "../../context/features/ReviewSlice";
import Modal from "react-modal";
import Spinner from "../../components/Spinner";
import ClientInfosModal from "../../components/modals/ClientInfos";
import './style.css'
import { retrieveUserSession } from "../../lib/Encryption";
import moment from 'moment';

Modal.setAppElement("#root");

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reviews = useSelector((state: RootState) => state.reviews);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const userData = retrieveUserSession()
    dispatch(getAllReviews(userData.matriculeRH));
  }, []);

  const averageStars = reviews.reviews.reduce((sum, review: any) => sum + review.etoiles, 0) /reviews.reviews.length;

  const getPointsEarned = (etoiles: number): number => {
    switch (etoiles) {
      case 5:
        return 300;
      case 4:
        return 200;
      case 3:
        return 100;
      default:
        return 0;
    }
  };

  const calculateDuration = (reviewDate: Date) => {
    const now = moment();
    const reviewDateTime = moment(reviewDate);
    const duration = moment.duration(now.diff(reviewDateTime));
    const formattedDuration = duration.humanize();
    return formattedDuration;
  };

  const openModal = (review: any) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const noReviews = reviews.reviews.length === 0;
  
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Évaluations</h1>

      {/* Spinner */}
      {reviews.isLoading && (
          <Spinner/>
      )}

      {/* No Reviews Message */}
      {!reviews.isLoading && noReviews && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500">
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
              Vous a avez aucun evaluations
            </p>
          </div>
        </div>
      )}

      {/* Average Stars */}
      {!reviews.isLoading && !noReviews && (
        <div className="flex flex-col items-center mb-8">
          <p className="text-5xl font-bold mb-2" style={{ color: "#FFB400" }}>
            {averageStars.toFixed(1)}
          </p>
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, index) => (
              index < Math.floor(averageStars) ? (
                <StarIcon key={index} style={{ color: "#FFB400", fontSize: "3rem" }} />
              ) : (
                <StarBorderIcon key={index} style={{ color: "#C2C2C2", fontSize: "3rem" }} />
              )
            ))}
          </div>
          <p className="text-gray-500 text-sm" style={{ color: "#C2C2C2" }}>
            {reviews.reviews.length} avis
          </p>
        </div>
      )}

      {/* Reviews List */}
      {!reviews.isLoading &&
        !noReviews &&
        reviews.reviews.map((review: any) => (
          <div
            key={review._id}
            className="flex flex-col sm:flex-row border-b border-gray-300 p-4 mb-4 items-center justify-between rounded-lg shadow-md bg-white cursor-pointer hover:bg-slate-100 transition duration-300 ease-in-out"
            onClick={() => openModal(review)}
          >
            {/* Left part - Points earned */}
            <div className="flex-shrink-0 min-w-16 sm:mb-0 sm:mr-4">
              <p
                className="text-base"
                style={{ color: getPointsEarned(review.etoiles) > 0 ? "#3EBE12" : "#C2C2C2" }}
              >
                +{getPointsEarned(review.etoiles)} pts
              </p>
            </div>

            {/* Center part - Stars */}
            <div className="flex-shrink-0 w-full sm:w-1/4">
              <p className={"text-sm flex items-center justify-center"}>
                {Array.from({ length: 5 }).map((_, index) => (
                  index < review.etoiles ? (
                    <StarIcon key={index} className="text-2xl" style={{ color: "#FFB400" }} />
                  ) : (
                    <StarBorderIcon key={index} className="text-2xl" style={{ color: "#C2C2C2" }} />
                  )
                ))}
              </p>
            </div>

            {/* Right part - Duration */}
            <div className="flex-shrink-0"> {/*min-w-20*/}
              <p className="text-sm text-gray-500" style={{ color: "#C2C2C2" }}>
                {calculateDuration(review.dateReview)}
              </p>
            </div>
          </div>
        ))}

      {/* Modal */}
      <div className="container mx-auto my-8">
      {/* ClientInfosModal component */}
      <ClientInfosModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedReview={selectedReview}
      />
    </div>
    </div>
  );
};

export default Home;

















// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../context/store";
// import StarIcon from "@mui/icons-material/Star";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
// import { getAllReviews } from "../../context/features/ReviewSlice";

// const Home = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const reviews = useSelector((state: RootState) => state.reviews);

//   useEffect(() => {
//     dispatch(getAllReviews({ matriculeRH: "P67890" }));
//   }, []);

//   // Calculate average stars
//   const averageStars =
//     reviews.reviews.reduce((sum, review: any) => sum + review.etoiles, 0) / reviews.reviews.length;

//   const getPointsEarned = (etoiles: number): number => {
//     switch (etoiles) {
//       case 5:
//         return 300;
//       case 4:
//         return 200;
//       case 3:
//         return 100;
//       default:
//         return 0;
//     }
//   };

//   // Check if there are no reviews
//   const noReviews = reviews.reviews.length === 0;

//   return (
//     <div className="container mx-auto my-8">
//       <h1 className="text-3xl font-bold mb-4">Reviews</h1>

//       {/* No Reviews Message */}
//       {noReviews && (
//         <div className="flex items-center justify-center h-full">
//           <div className="text-center text-gray-500">
//             <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
//               No reviews yet. Be the first one to leave a review!
//             </p>
//           </div>
//         </div>


//       )}

//       {/* Average Stars */}
//       {!noReviews && (
//         <div className="flex flex-col items-center mb-8">
//           <p className="text-5xl font-bold mb-2" style={{ color: "#FFB400" }}>
//             {averageStars.toFixed(1)}
//           </p>
//           <div className="flex items-center mb-2">
//             {Array.from({ length: 5 }).map((_, index) => (
//               index < Math.floor(averageStars) ? (
//                 <StarIcon key={index} style={{ color: "#FFB400", fontSize: "3rem" }} />
//               ) : (
//                 <StarBorderIcon key={index} style={{ color: "#C2C2C2", fontSize: "3rem" }} />
//               )
//             ))}
//           </div>
//           <p className="text-gray-500 text-sm" style={{ color: "#C2C2C2" }}>
//             Based on {reviews.reviews.length} reviews
//           </p>
//         </div>
//       )}

//       {/* Reviews List */}
//       {!noReviews &&
//         reviews.reviews.map((review: any) => (
//           <div
//             key={review._id}
//             className="flex flex-col sm:flex-row border-b border-gray-300 p-4 mb-4 items-center justify-between rounded-lg shadow-md bg-white"
//           >
//             {/* Left part - Points earned */}
//             <div className="flex-shrink-0 mb-2 sm:mb-0 sm:mr-4">
//               <p
//                 className="text-base"
//                 style={{ color: getPointsEarned(review.etoiles) > 0 ? "#3EBE12" : "#C2C2C2" }}
//               >
//                 +{getPointsEarned(review.etoiles)} pts
//               </p>
//             </div>

//             {/* Center part - Stars */}
//             <div className="flex-shrink-0 w-full sm:w-1/4">
//               {/* Add logic to display stars based on review.etoiles */}
//               {/* Limit the displayed stars to a maximum of 5 */}
//               <p className={"text-sm flex items-center justify-center"}>
//                 {Array.from({ length: 5 }).map((_, index) => (
//                   index < review.etoiles ? (
//                     <StarIcon key={index} className="text-2xl" style={{ color: "#FFB400" }} />
//                   ) : (
//                     <StarBorderIcon key={index} className="text-2xl" style={{ color: "#C2C2C2" }} />
//                   )
//                 ))}
//               </p>
//             </div>

//             {/* Right part - Duration */}
//             <div className="flex-shrink-0">
//               {/* Add logic to calculate duration */}
//               <p className="text-sm text-gray-500" style={{ color: "#C2C2C2" }}>
//                 3 minutes ago
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Home;
