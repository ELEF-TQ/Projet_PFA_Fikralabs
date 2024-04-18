import React, { useEffect, useState } from 'react';
import Destroy from '../../../components/crud/Destroy';
import Delete from '../../../components/crud/Delete';
import { fetchServices } from '../../../context/features/ServiceSlice'; // Assuming you have ServiceSlice with getServices action
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../context/store';
import Spinner from '../../../components/status/Spinner';
import EditService from './EditService';
import AddService from './AddService';
const Service: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {  isLoading ,services } = useSelector((state: any) => state.services); // Assuming you have services slice in redux store

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDestroyModalOpen, setIsDestroyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [Element, setElement] = useState(null);


  const [selectedId, setSelectedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Checkbox handling
  const handleSelectAllChange = (e: { target: { checked: any } }) => {
    const isChecked = e.target.checked;
    setSelectAllChecked(isChecked);
    setSelectedIds(isChecked ? services.map((service: { _id: any }) => service._id) : []);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const isChecked = e.target.checked;
    setSelectedIds((prevSelected: any[]) =>
      isChecked ? [...prevSelected, id] : prevSelected.filter((selectedId: any) => selectedId !== id)
    );
  };

  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  return (
    <div>
    <h1 className="text-4xl font-bold mb-8"> Gestion des Services</h1>
      {isLoading ? (
       <Spinner/>
      ) : (
        <section className="  p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="bg-black dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="flex-1 flex items-center space-x-2">
                <h5>
                  <span className="text-white">Tous les service : </span>
                  <span className="dark:text-white"> {services.length}</span>
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
                    <input type="text" id="simple-search" placeholder="Search" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
               
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none bg-blue-500"
              >
                <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Ajouter
              </button>
        
                <button
                 type="button"
                 onClick={()=> setIsDestroyModalOpen(true)}
                 id="createProductButton" data-modal-toggle="createProductModal" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none bg-red-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                  Delete
                </button>
              
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm  text-gray-500 dark:text-gray-400 text-center  ">
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
                    <th scope="col" className="p-4 ">Service</th>
                    <th scope="col" className="p-4 ">Prix</th>
                    <th scope="col" className="p-4 ">description</th>
                    <th scope="col" className="p-4 ">Actions</th>
                  </tr>
                </thead>
                <tbody>
                {services?.map((service :any ) => (
                  <tr key={service._id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <td className="p-4 w-4">
                      <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`checkbox${service._id}`}
                        name="options[]"
                        value={service._id}
                        checked={selectAllChecked || selectedIds.includes(service._id)}
                        onChange={(e) => handleCheckboxChange(e, service._id)}
                      />
        
                    <label htmlFor={`checkbox-table-search-${service._id}`} className="sr-only">
                      Select
                    </label>
        
                      </div>
                    </td>
                 
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{service.nom}</td>
                   
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {service.prix}
                    </td>
                  
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{service.description}</td>
                  
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center justify-center space-x-4">
        
                        
        
                        <button  onClick={() =>{setElement(service) , setIsEditModalOpen(true)}} type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:border-yellow-500 dark:text-yellow-500 dark:hover:text-white dark:hover:bg-yellow-600 dark:focus:ring-yellow-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                          </svg>
                        </button>
        
                        
                        <button onClick={() =>{setSelectedId(service._id) , setIsDeleteModalOpen(true)}}  type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
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
        </section>
       
      )}
      <Destroy
        show={isDestroyModalOpen}
        handleClose={() => setIsDestroyModalOpen(false)}
        ids={selectedIds}
        EndPoint="/services/destroy"
        onDestroySuccess={fetchServices}
      />
      <Delete
        show={isDeleteModalOpen}
        handleClose={() => setIsDeleteModalOpen(false)}
        Id={selectedId}
        EndPoint="/services"
        onDeletionSuccess={fetchServices}
      />
     <EditService show={isEditModalOpen} handleClose={() => setIsEditModalOpen(false)} Element={Element} />
      <AddService show={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} />
    </div>
  );
};

export default Service;






