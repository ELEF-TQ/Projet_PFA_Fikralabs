import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices } from '../../context/features/ServiceSlice';
import { AppDispatch, RootState } from '../../context/store';
import { Grid } from '@mui/material';
import Spinner from '../../components/status/Spinner';
import Reservation from '../../components/modals/Reservation';

const Services = () => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector((state: RootState) => state.services.services);
  const isLoading = useSelector((state: RootState) => state.services.isLoading);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [Element , setElement] = useState(null);


  useEffect(() => {
    dispatch(fetchServices());
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold">Reservation d'une service :</h1>
      <div className='flex justify-center items-center min-h-screen mt-4'>
        {isLoading ? (
          <Spinner />
        ) : (
          <Grid container spacing={3}>
            {services.map((service: any) => (
              <Grid item key={service._id} xs={12} sm={6} md={4} lg={3}>
                <div className="bg-white border border-gray-200 rounded-lg shadow h-full">
                  <a href="#">
                    <img className="rounded-t-lg" src="https://www.shell.fr/motorists/our-service-stations/_jcr_content/par/pageHeader/image.img.960.jpeg/1600446997232/cobham-retail-station.jpeg?imwidth=1280" alt="" />
                  </a>
                  <div className="p-5">
                    <div className='flex flex-col justify-around'>
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{service.nom}</h5>
                      </a>
                      <p className="mb-3 text-sm font-normal text-gray-700">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{service.prix} DHS</span>
                        <button onClick={() => {setElement(service), setIsAddModalOpen(true)}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
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
        <Reservation show={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} Element= {Element} />
      </div>
    </>
  );
};

export default Services;
