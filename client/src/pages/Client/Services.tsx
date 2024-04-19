import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../../context/features/ServiceSlice';
import { AppDispatch, RootState } from '../../context/store';
import { Grid } from '@mui/material';
import Spinner from '../../components/status/Spinner';
import Reservation from '../../components/modals/Reservation';
import { Service } from '../../types/Service';
import DefaultService from "../../assets/images/DefaultService.png"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Services = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.services.services);
  const isLoading = useSelector((state: RootState) => state.services.isLoading);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [Element , setElement] = useState<Service>(
    {
      _id: "",
      nom: "",
      prix: 0,
      description: "",
      image: ""
    }
  );


  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">Nos Services</h1>
      <ToastContainer />
      <p className=' text-gray-700'>Nous offrons le meilleur des produits et services Shell et Engen. Cela inclut les carburants, les lubrifiants et une offre croissante de vente au détail de produits non combustibles pour les automobilistes, ainsi que des solutions de carburant, hybrides et solaires sur mesure pour les clients commerciaux.</p>
      <div className='flex justify-center items-center min-h-screen'>
        {isLoading ? (
          <Spinner />
        ) : (
          <Grid container spacing={3}>
            {services.map((service: Service) => (
              <Grid item key={service._id} xs={12} sm={6} md={4} lg={4}>
                <div className="bg-white border border-gray-200 rounded-lg shadow h-full">
                <div className="w-full h-56 overflow-hidden"> 
                  <img
                    src={service.image ? `data:image/png;base64,${service.image.buffer}` : DefaultService}
                    alt={service.nom}
                    className="w-full h-auto" 
                    draggable="false"
                  />
                </div>
                  <div className="p-5">
                    <div className='flex flex-col justify-around'>
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{service.nom}</h5>
                      </a>
                      <p className="mb-3 text-sm font-normal text-gray-700">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{service.prix} DHS</span>
                        <button onClick={() => {setElement(service); setIsAddModalOpen(true);}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                          Réserver
                          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
        <Reservation show={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} Service= {Element} />
      </div>
    </>
  );
};

export default Services;
