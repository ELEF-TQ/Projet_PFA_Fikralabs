import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../context/store";
import { useEffect } from "react";
import { getPompiste } from "../../context/features/PompisteSlice";
import { createConversion } from "../../context/features/ConversionSlice";
import { EastOutlined } from "@mui/icons-material";

const DemandeConvertion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pompiste: any = useSelector((state: RootState) => state.pompistes.pompiste);

  useEffect(() => {
    // Fetch pompiste data when the component mounts
    dispatch(getPompiste("P1267645"));
  }, [dispatch]);

  const handleConversion = async () => {
    try {
      // Dispatch createConversion with the pompisteId
      console.log(pompiste._id)
      await dispatch(createConversion(pompiste._id));
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error creating conversion:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const calculateMontant = (score: number) => {
    return (score * 1) / 25; // Adjust the formula based on your actual calculation
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Demande de conversion</h2>
      <div className="conversion-container">
        {/* Part 1 */}
        <p className="text-gray-700 mb-4">
          Avant de procéder à la conversion, assurez-vous de vérifier votre solde actuel de
          points. Cela vous aidera à savoir combien vous pouvez convertir en chèque.
        </p>

        {/* Part 2 */}
        <div className="flex flex-wrap justify-center items-center mt-12 space-x-10">
          <div className="w-48 h-48 flex flex-col items-center justify-center text-3xl text-black rounded-full border-4 border-primary-color-1">
            {pompiste && (
              <>
                <p className="text-5xl">{pompiste.score}</p>
                <p className="text-lg text-gray-color">pts</p>
              </>
            )}
          </div>
          <div className="flex items-center mt-6 md:mt-0">
            <div className="hidden md:block">
              <EastOutlined sx={{ fontSize: 90, color: '#80BD0A' }} />
            </div>
          </div>
          <div className="md:ml-6 mt-6 md:mt-0 text-black px-6 py-3 rounded-3xl border-primary-color-2">
            {pompiste && (
              <div className="text-center">
                <span className="text-lg">Compatible (en Dirham marocain)</span>
                <span className="my-3 block text-2xl text-primary-color text-3xl">{calculateMontant(pompiste.score)} DHS</span>
              </div>
            )}
          </div>
        </div>

        {/* Part 3 */}
        <div className="mt-6 md:mt-16 mr-6 flex justify-center md:justify-end"> {/* Center the button on small screens, move to the right on medium and larger screens */}
          <button
            className="bg-primary-color text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleConversion}
          >
            Convertir
          </button>
        </div>
      </div>
    </div>
  );
}

export default DemandeConvertion;
