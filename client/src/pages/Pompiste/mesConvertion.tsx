import  { useEffect, useState } from "react";
import conversions from "../../utils/conversion";
import ConversionCard from "../../components/ConversionCard";

const Conversion = () => {
  const [pendingConversions, setPendingConversions] = useState<any[]>([]);
const [acceptedConversions, setAcceptedConversions] = useState<any[]>([]);


  useEffect(() => {
    const pending = conversions.filter(conversion => conversion.status === "PENDING");
    const accepted = conversions.filter(conversion => conversion.status === "ACCEPTED");
    setPendingConversions(pending);
    setAcceptedConversions(accepted);
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
