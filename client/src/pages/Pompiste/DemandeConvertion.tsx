import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import { useEffect } from "react";
import { getPompiste } from "../../context/features/PompisteSlice";
import { createConversion } from "../../context/features/ConversionSlice";
import {  EastRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import { retrieveUserSession } from "../../lib/Encryption";

const DemandeConvertion = () => {

  const userData = retrieveUserSession()

  const dispatch = useDispatch<AppDispatch>();
  const pompiste: any = useSelector((state: RootState) => state.pompistes.pompiste);
  const isLoading: boolean = useSelector((state: RootState) => state.pompistes.isLoading);
  
  useEffect(() => {
    dispatch(getPompiste(userData.user.matriculeRH));
  }, []);

  const handleConversion = async () => {
    if(pompiste.score < 2500){
      Swal.fire({title: 'Conversion Forbidden', text: 'You cannot convert points with a score less than 2500.', icon: 'error', confirmButtonColor: '#3085d6',});
    }else{
      Swal.fire({title: 'Are you sure?',text: `You are about to convert your points`,icon: 'warning',showCancelButton: true, confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Yes, proceed!'}).then( async (result) => {
        if (result.isConfirmed) {
            console.log(pompiste._id)
            await dispatch(createConversion(pompiste._id)).then(() => {
              dispatch(getPompiste(userData.user.matriculeRH));
            })
        }
      });
    }
  };

  const calculateMontant = (score: number) => {
    return (score * 1) / 25; 
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Demande de conversion</h2>
      {
        isLoading ? <Spinner/> : 
        (
          <div className="conversion-container">
            {
              pompiste? (
                <>
                  {/* Part 1 */}
                  <p className="text-gray-700 mb-4">
                    Avant de procéder à la conversion, assurez-vous de vérifier votre solde actuel de
                    points. Cela vous aidera à savoir combien vous pouvez convertir en chèque.
                  </p>
          
                  {/* Part 2 */}
                  <div className="flex flex-wrap justify-center items-center mt-12"> {/*space-x-10*/}
                    <div className="md:mr-10 w-48 h-48 flex flex-col items-center justify-center text-3xl text-black rounded-full border-4 border-primary-color-1">
                      {pompiste && (
                        <>
                          <p className="text-5xl">{pompiste.score}</p>
                          <p className="text-lg text-gray-color">pts</p>
                        </>
                      )}
                    </div>
                    <div className="flex items-center mt-6 md:mt-0">
                      <div className="hidden md:block">
                        <EastRounded sx={{ fontSize: 90, color: '#80BD0A' }} />
                      </div>
                    </div>
                    <div className="md:ml-10 mt-6 md:mt-0 text-black px-6 py-3 rounded-3xl border-primary-color-2">
                      {pompiste && (
                        <div className="text-center">
                          <span className="text-lg">Compatible (en Dirham marocain)</span>
                          <span className="my-3 block text-2xl text-primary-color text-3xl">{calculateMontant(pompiste.score)} DHS</span>
                        </div>
                      )}
                    </div>
                  </div>
          
                  {/* Part 3 */}
                  <div className="mt-6 md:mt-16 mr-0 md:mr-6 flex justify-center md:justify-end"> {/* Center the button on small screens, move to the right on medium and larger screens */}
                    <button
                      className="bg-primary-color text-white px-4 py-2 rounded cursor-pointer"
                      onClick={handleConversion}
                    >
                      Convertir
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-red-500">
                  Aucune donnée de pompiste trouvée.
                </div>
              )
            }
          </div>      
        )
      }
    </div>
  );
}

export default DemandeConvertion;
