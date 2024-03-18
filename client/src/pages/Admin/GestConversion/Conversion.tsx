import React, { useEffect, useState } from 'react'
import { useDispatch ,useSelector } from 'react-redux';
import { AppDispatch } from '../../../context/store';
import Swal from 'sweetalert2';
import { acceptAllConversion, acceptConversion, getAllConversions } from '../../../context/features/ConversionSlice';


const Pompiste : React.FC = () => {

  const handleAcceptConversion = (id:any) => {
    Swal.fire({title: 'Êtes-vous sûr ?',text: `Vous êtes sur le point d'accepter la demande de conversion`,icon: 'warning',showCancelButton: true,confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Oui, procéder !'}).then((result) => {
        if (result.isConfirmed) {
          dispatch(acceptConversion(id)).then(()=>{
            dispatch(getAllConversions())
          })
        }
    });
  };

  const handleAcceptConversions = (ids:any) => {
    Swal.fire({title: 'Êtes-vous sûr ?',text: `Vous êtes sur le point d'accepter la demande de conversion `,icon: 'warning',showCancelButton: true,confirmButtonColor: '#3085d6',cancelButtonColor: '#d33',confirmButtonText: 'Oui, procéder !'}).then((result) => {
        if (result.isConfirmed) {
          dispatch(acceptAllConversion({ids})).then(()=>{
            dispatch(getAllConversions())
          })
        }
    });
  };


  const dispatch = useDispatch<AppDispatch>();
  const {conversions} = useSelector((state :any)=>state.conversions )
  const [selectedIds , setSelectedIds] = useState<string[]>([]);;
  const [selectAllChecked, setSelectAllChecked] = useState(false);
 

  // Checkbox handling
  const handleSelectAllChange = (e: { target: { checked: any; }; }) => {
    const isChecked = e.target.checked;
    setSelectAllChecked(isChecked);
    setSelectedIds(isChecked ? pendingConversions.map((conversion: { _id: any; }) => conversion._id) : []);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, Id: string) => {
    const isChecked = e.target.checked;
    setSelectedIds((prevSelected: any[]) =>
      isChecked
        ? [...prevSelected, Id]
        : prevSelected.filter((id: any) => id !== Id)
    );
  };

  
  useEffect(()=> {
    dispatch(getAllConversions());
  },[])
  console.log(conversions)

    const [pendingConversions, acceptedConversions] = [
      conversions.filter((conversion: { status: string; }) => conversion.status === "PENDING"),
      conversions.filter((conversion: { status: string; }) => conversion.status === "ACCEPTED")
    ];
      return (
    <div>

<h1 className="mb-4 font-semibold leading-none tracking-tight text-gray-900  lg:text-6xl dark:text-black">Gestion des demandes</h1>

  <section className="  p-3 sm:p-5 antialiased">
    <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 py-1">
          <div className="flex-1 flex items-center justify-evenly space-x-2">
            <h5 className='m-0'>
              <span className="text-white">Les demandes en attends : </span>
              <span className="dark:text-white"> {pendingConversions.length}</span>
            </h5>

            <button
            type="button"
            onClick={() => handleAcceptConversions(selectedIds)}
            className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none bg-blue-500"
          >
            <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Accepter tous
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
                <th scope="col" className="p-2 ">Nom</th>
                <th scope="col" className="p-2 ">score</th>
                <th scope="col" className="p-2 ">montant</th>
                <th scope="col" className="p-2 ">Date</th>
                <th scope="col" className="p-2 ">Actions</th>
              </tr>
            </thead>
            <tbody>
            {pendingConversions?.map((pendingConversion :any ) => (
              <tr key={pendingConversion._id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-4 w-4">
                  <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`checkbox${pendingConversion._id}`}
                    name="options[]"
                    value={pendingConversion._id}
                    checked={selectAllChecked || selectedIds.includes(pendingConversion._id)}
                    onChange={(e) => handleCheckboxChange(e, pendingConversion._id)}
                  />

                <label htmlFor={`checkbox-table-search-${pendingConversion._id}`} className="sr-only">
                  Select
                </label>

                  </div>
                </td>
              
                <td className="px-4 py-1">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium rounded dark:bg-primary-900 dark:text-primary-300">{pendingConversion?.pompiste?.username}</span>
                </td>
                <td className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pendingConversion.score}</td>
                <td className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{pendingConversion.montant} MAD</td>
                <td className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(pendingConversion.dateConversion).toLocaleDateString()}</td>
                <td className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center justify-center space-x-4">
                    <button   onClick={() => handleAcceptConversion(pendingConversion._id)} type="button" data-drawer-target="drawer-read-product-advanced" data-drawer-show="drawer-read-product-advanced" aria-controls="drawer-read-product-advanced" className="py-2 px-2 flex items-center text-sm font-medium text-center text-green-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-yellow-700 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-600 dark:hover:text-white dark:hover:bg-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -ml-0.5 text-yellow-500">
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.293 10.293a1 1 0 011.414 0L11 14.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z" />
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

<span className='block w-full h-px bg-black'></span>

{/*___ Demande Accepted____ */}
  <section className="  p-3 sm:p-5 antialiased">
    <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-2">
          <div className="flex-1 flex items-center space-x-2 ">
            <h5 className='m-0 '>
              <span className="text-white">Les demandes Accepter:</span>
              <span className="dark:text-white">{acceptedConversions.length}</span>
            </h5>
        
          </div>
          
        </div>
    
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm  text-gray-500 dark:text-gray-400 text-center  ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              
                <th scope="col" className="p-4 ">Nom</th>
                <th scope="col" className="p-4 ">score</th>
                <th scope="col" className="p-4 ">montant</th>
                <th scope="col" className="p-4 ">date</th>
                <th scope="col" className="p-4 ">Status</th>
              </tr>
            </thead>
            <tbody>
            {acceptedConversions?.map((acceptedConversion :any ) => (
              <tr key={acceptedConversion._id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">        
                <td className="px-4 py-1">
                  <span className="bg-primary-100 text-primary-800 text-xs font-medium rounded dark:bg-primary-900 dark:text-primary-300">{acceptedConversion?.pompiste?.username}</span>
                </td>
                <td className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{acceptedConversion.score}</td>
                <td className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{acceptedConversion.montant} DH</td>
                <td className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">{new Date(acceptedConversion.dateConversion).toLocaleDateString()}</td>
                <td className="px-4 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center justify-center space-x-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 -ml-0.5 text-green-500">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zM12 4c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm1 5.414 4.293 4.293a1 1 0 11-1.414 1.414l-3.5-3.5a1 1 0 00-1.413 0l-1.5 1.5a1 1 0 11-1.414-1.414l2-2a1 1 0 011.414 0l3.5 3.5a1 1 0 101.414-1.414L13 9.414z"/>
                  </svg>

                    
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

 
 </div>

)}

export default Pompiste



