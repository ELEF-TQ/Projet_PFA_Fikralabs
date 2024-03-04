import  { useEffect, useState } from "react";
import ConversionCard from "../../components/ConversionCard";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUserSession } from "../../lib/Encryption";
import { getConversions } from "../../context/features/ConversionSlice";
import { AppDispatch } from "../../context/store";
const Conversion = () => {
  const dispatch = useDispatch<AppDispatch>()
  const userData = retrieveUserSession()
  const {conversions} = useSelector((state:any)=>state.conversions)
  
  const [pendingConversions, setPendingConversions] = useState<any[]>([]);
const [acceptedConversions, setAcceptedConversions] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getConversions(userData.user._id)).then(()=> {
      const pending = conversions?.filter((conversion: { status: string; }) => conversion.status === "PENDING");
      const accepted = conversions?.filter((conversion: { status: string; }) => conversion.status === "ACCEPTED");
      setPendingConversions(pending);
      setAcceptedConversions(accepted);
    })
  }, []);

  return (
    <div>
      <h1 className="mb-4 font-semibold leading-none tracking-tight text-gray-900 lg:text-6xl dark:text-black">Demandes</h1>
      <div>
        <h2 className="text-lg font-semibold mb-2">Demandes en attente :</h2>
       <div className="flex flex-col justify-center items-center">
       {pendingConversions.map((conversion, index) => (
          <ConversionCard key={index} conversion={conversion} />
        ))}
       </div>
      </div>

      <div>
      <h2 className="text-lg font-semibold mb-2">Demandes acceptées :</h2>
      <div className="flex flex-col justify-center items-center">
        {acceptedConversions.map((conversion, index) => (
          <ConversionCard key={index} conversion={conversion} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default Conversion;
