import React, { useEffect, useState } from 'react';
import Destroy from '../../../components/crud/Destroy';
import Delete from '../../../components/crud/Delete';
import { fetchReservations } from '../../../context/features/ServiceSlice'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../context/store';
import Spinner from '../../../components/status/Spinner';
import StatusLabel, { StatusLabelProps } from '../../../components/status/StatusLablel';

const Reservations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, reservations } = useSelector((state: any) => state.services); 

  const [isDestroyModalOpen, setIsDestroyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Checkbox handling
  const handleSelectAllChange = (e: { target: { checked: any } }) => {
    const isChecked = e.target.checked;
    setSelectAllChecked(isChecked);
    setSelectedIds(isChecked ? reservations.map((reservation: { _id: any }) => reservation._id) : []);
  };

  
    // Fonction de filtrage des clients en fonction de la valeur de recherche
    const filteredReservations= reservations.filter((reservation: any) =>
      reservation.code.toLowerCase().includes(searchValue.toLowerCase()) 
    );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const isChecked = e.target.checked;
    setSelectedIds((prevSelected: any[]) =>
      isChecked ? [...prevSelected, id] : prevSelected.filter((selectedId: any) => selectedId !== id)
    );
  };

  useEffect(() => {
    dispatch(fetchReservations());
  }, []);

  // const sortedAndFilteredReservations = useMemo(() => 
  //   reservations
  //     .filter((reservation: { code: string; }) => 
  //       reservation.code.toLowerCase().includes(searchValue.toLowerCase())
  //     )
  //     .sort((a, b) => {
  //       const dateTimeA = new Date(`${a.dateReservation}T${a.heureReservation}`);
  //       const dateTimeB = new Date(`${b.dateReservation}T${b.heureReservation}`);
  //       return dateTimeA - dateTimeB;
  //     }),
  //   [reservations, searchValue]
  // );
  


  const getReservationStatus = (dateReservation: string): StatusLabelProps => {
    const currentDate = new Date();
    const expiration = new Date(dateReservation);
    const oneHour = 60 * 60 * 1000; // 1 heure en millisecondes
  
    if (expiration < currentDate) {
      return { text: 'Expiré', variant: 'danger' };
    } else if (expiration.getTime() - currentDate.getTime() <= oneHour) {
      return { text: 'Bientôt fini', variant: 'warning' };
    } else {
      return { text: 'Valide', variant: 'success' };
    }
  };
  

  return (
    <div>

<h1 className="text-4xl font-bold mb-8">Gestion des Réservations</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="p-3 sm:p-5 antialiased">
          {reservations && reservations.length > 0 ? (
            <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
              <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="flex-1 flex items-center space-x-2">
                    <h5>
                      <span className="dark:text-white">Toutes les réservations : </span>
                      <span className="dark:text-white"> {reservations?.length}</span>
                    </h5>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">

          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                  </svg>
                </div>
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" id="simple-search" placeholder="Search " required className="outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
              </div>
            </form>
          </div>
           
             </div>  
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="selectAll"
                              checked={selectAllChecked}
                              onChange={handleSelectAllChange}
                            />
                            <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th scope="col" className="p-4">Code</th>
                        <th scope="col" className="p-4">Date</th>
                        <th scope="col" className="p-4">Heure</th>
                        <th scope="col" className="p-4">Adresse</th>
                        <th scope="col" className="p-4">Client</th>
                        <th scope="col" className="p-4">Service</th>
                        <th scope="col" className="p-4 ">status</th>
                        <th scope="col" className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReservations.map((reservation :any ) => (
                        <tr key={reservation._id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="p-4 w-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id={`checkbox${reservation._id}`}
                                name="options[]"
                                value={reservation._id}
                                checked={selectAllChecked || selectedIds.includes(reservation._id)}
                                onChange={(e) => handleCheckboxChange(e, reservation._id)}
                              />
                              <label htmlFor={`checkbox-table-search-${reservation._id}`} className="sr-only">
                                Select
                              </label>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{reservation.code}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {new Date(reservation.dateReservation).toLocaleDateString()}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{reservation.heureReservation}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{reservation.adresse}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{reservation.client?.username}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{reservation.service?.nom}</td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">   <StatusLabel  {...getReservationStatus(reservation.dateReservation)} /></td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <div className="flex items-center justify-center space-x-4">
                              <button onClick={() =>{setSelectedId(reservation._id) , setIsDeleteModalOpen(true)}} type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
               
              </div>
            </div>
          ) : (
            <div className="px-4 py-3 text-center text-gray-900 ">
              Aucune réservation trouvée
            </div>
          )}
        </section>
      )}
      <Destroy
        show={isDestroyModalOpen}
        handleClose={() => setIsDestroyModalOpen(false)}
        ids={selectedIds}
        EndPoint="/services/deleteReservation/destroy"
        onDestroySuccess={fetchReservations}
      />
      <Delete
        show={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        Id={selectedId}
        EndPoint="/services/deleteReservation"
        onDeletionSuccess={fetchReservations}
      />
    </div>
  );
};

export default Reservations;
