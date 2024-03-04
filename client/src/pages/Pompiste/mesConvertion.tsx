import React, { useEffect, useState } from "react";
import ConversionCard from "../../components/ConversionCard";
import { useDispatch, useSelector } from "react-redux";
import { retrieveUserSession } from "../../lib/Encryption";
import { getConversions } from "../../context/features/ConversionSlice";
import { AppDispatch, RootState } from "../../context/store";

const Conversion = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userData = retrieveUserSession();
  const { conversions } = useSelector((state: RootState) => state.conversions);

  const [pendingConversions, setPendingConversions] = useState<any[]>([]);
  const [acceptedConversions, setAcceptedConversions] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getConversions(userData.user._id));
  }, []);

  useEffect(() => {
    const pending = conversions?.filter(
      (conversion: { status: string }) => conversion.status === "PENDING"
    );
    const accepted = conversions?.filter(
      (conversion: { status: string }) => conversion.status === "ACCEPTED"
    );
    setPendingConversions(pending || []);
    setAcceptedConversions(accepted || []);
  }, [conversions]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-4 text-gray-900 dark:text-black">
        Demandes
      </h1>
  
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Demandes en attente :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingConversions.length === 0 ? (
            <p>Il n'y a pas de demandes en attente.</p>
          ) : (
            pendingConversions.map((conversion, index) => (
              <ConversionCard key={index} conversion={conversion} />
            ))
          )}
        </div>
      </div>
  
      <div>
        <h2 className="text-lg font-semibold mb-2">Demandes acceptées :</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {acceptedConversions.length === 0 ? (
            <p>Il n'y a pas de demandes acceptées.</p>
          ) : (
            acceptedConversions.map((conversion, index) => (
              <ConversionCard key={index} conversion={conversion} />
            ))
          )}
        </div>
      </div>
    </div>
  );  
};

export default Conversion;
