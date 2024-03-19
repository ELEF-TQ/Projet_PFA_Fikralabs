import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../context/store";
import { getAllReviewsByClient, updateReview } from "../../context/features/ReviewSlice";
import {  retrieveUserSession } from "../../lib/Encryption";

interface Props {
  show: boolean;
  handleClose: () => void;
  Element: any;
}

const EditReview: React.FC<Props> = ({ show, handleClose, Element }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [commentaire, setCommentaire] = useState(Element.commentaire);
 const user = retrieveUserSession()
  const handleSubmit = () => {
    const Id = Element._id;
    dispatch(updateReview({ Id, commentaire }))
      .unwrap()
      .then(() => {
        dispatch(getAllReviewsByClient(user._id))
        handleClose();
      })
      .catch((error: any) => {
        console.error('Error updating review:', error);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setCommentaire(event.target.value);
  };

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Modifier Votre Commentaire</h3>
            </div>
            <div className="modal-content">
              <div className="mb-4">
                <label
                  htmlFor="commentaire"
                  className="block mb-2 text-sm font-medium Input_Label"
                >
                  Commentaire
                </label>
                <textarea
                  name="commentaire"
                  id="commentaire"
                  className="Input__Style w-full"
                  placeholder="Commentaire"
                  value={commentaire}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="btn bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                onClick={handleSubmit}
              >
                Modifier
              </button>
              <button
                className="btn bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={handleClose}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditReview;
