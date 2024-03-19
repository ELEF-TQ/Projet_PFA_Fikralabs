import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultIMG from '../../../assets/images/defaultUser.png';

interface Props {
  show: boolean;
  handleClose: () => void;
  Element: any;
}

const ViewPompiste: React.FC<Props> = ({ show, handleClose, Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(Element);
  }, [Element]);

  return (
    <>
      {show && (
        <div className="modal-overlay">
          <div className="modal bg-green-50 text-gray-900">
            <div className="modal-header">
              <h3 className="modal-title text-lg font-semibold">Voir plus</h3>
            </div>
            <div className="modal-content">
              <div className="photo-wrapper p-2">
                <img
                  src={Element.image?.buffer ? `data:image/png;base64,${Element.image.buffer}` : defaultIMG}
                  alt="default"
                  className="w-32 h-32 rounded-full mx-auto ring-2 ring-gray-300"
                />
              </div>
              <div className="p-2">
                <h3 className="text-center my-0 text-xl font-medium leading-8">{Element.username}</h3>
                <div className="text-center text-gray-600 text-xs font-semibold">
                  <p className="mb-4">#{Element.matriculeRH}</p>
                </div>
                <table className="text-sm w-full my-3 mx-auto">
                  <tbody>
                    <tr>
                      <td className="px-2 py-2 text-gray-700 font-semibold">CIN</td>
                      <td className="px-2 py-2">{Element.CIN}</td>
                      <td className="px-6"></td>
                      <td className="px-2 py-2 text-gray-700 font-semibold">Phone</td>
                      <td className="px-2 py-2">{Element.phone}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-700 font-semibold">Email</td>
                      <td className="px-2 py-2">{Element.email}</td>
                      <td className="px-6"></td>
                      <td className="px-2 py-2 text-gray-700 font-semibold">Score</td>
                      <td className="px-2 py-2">{Element.score}</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-700 font-semibold">Etoiles</td>
                      <td className="px-2 py-2">{Element.etoiles}</td>
                      <td className="px-6"></td>
                      <td className="px-2 py-2 text-gray-700 font-semibold">Solde</td>
                      <td className="px-2 py-2">{Element.solde}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between p-4">
              <button
                className="btn bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={handleClose}
              >
                Fermer
              </button>
              <button
                className="btn bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 border border-green-500 hover:border-transparent rounded"
                onClick={() => navigate(`/admin/viewReviews/${Element.matriculeRH}`)}
              >
                Voir les avis
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPompiste;
