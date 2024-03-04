import React, { useEffect, useState } from "react";
import conversions from "../../utils/conversion";
import ConversionCard from "../../components/ConversionCard";

const Conversion = () => {
  const [pendingConversions, setPendingConversions] = useState<any[]>([]);
  const [acceptedConversions, setAcceptedConversions] = useState<any[]>([]);

  useEffect(() => {
    const pending = conversions.filter((conversion) => conversion.status === "PENDING");
    const accepted = conversions.filter((conversion) => conversion.status === "ACCEPTED");
    setPendingConversions(pending);
    setAcceptedConversions(accepted);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-4 text-gray-900 dark:text-black">Demandes</h1>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Demandes en attente :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingConversions.map((conversion, index) => (
            <ConversionCard key={index} conversion={conversion} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Demandes acceptées :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {acceptedConversions.map((conversion, index) => (
            <ConversionCard key={index} conversion={conversion} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conversion;
