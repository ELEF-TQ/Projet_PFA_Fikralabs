import React, { useState } from 'react';
import Logo from '../../assets/icons/LogoBlack.png';
import './style.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import QR from '../../assets/images/Vectorscan.png'
import defaultIMG from '../../assets/images/defaultUser.png';
import {  Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../context/store';
import { useDispatch } from 'react-redux';
import { createReview } from '../../context/features/ReviewSlice';
import { axiosNoAuth } from '../../lib/AxiosBase';
import Header from '../../components/shared/Header';
import Swal from 'sweetalert2';
const steps = ['', '', '', ''];

const Index: React.FC = () => {
  const phoneRegex = /^(0|\+212)([67])(\d{8}|\d{1}[\s-]\d{2}[\s-]\d{2}[\s-]\d{2}[\s-]\d{2})$/;
  const dispatch = useDispatch<AppDispatch>()
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [phone, setPhone] = useState('');
  const [matriculeRH, setMatriculeRH] = useState('');
  const [ratings, setRatings] = useState<number[]>([0, 0, 0]);
  const [commentaire , setCommentaire] = useState('');
  const [pompisteInfo , setPompisteInfo] = useState<any>(null);
 
  const handleRatingChange = (index:number, newValue: number | null) => {
    if(newValue !== null) {
      const newRatings = [...ratings];
      newRatings[index] = newValue;
      console.log(newRatings);
      setRatings(newRatings);
    }
  };
  

  const calculateAverage = () => {
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    const average = sum / ratings.length;
    const roundedAverage = Math.floor(average);
    return roundedAverage;
};

  

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;   
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
  
    switch (activeStep) {
      case 0:
          if (!phoneRegex.test(phone)) {
            Swal.fire({icon: 'warning',title: 'Attention',text: 'Veuillez saisir un numéro de téléphone valide !'});    
            return;
          }
          try {
            await axiosNoAuth.get(`/clients/phone/${phone}`);
          } catch (error:any) {
            Swal.fire({icon: 'error',title: 'Erreur',text: error.response.data.message});   
            return;
          }
          localStorage.setItem('phone', phone);
          break;
      case 1:
        try {
        const res =  await axiosNoAuth.get(`/pompistes/matriculeRH/${matriculeRH}`);
        setPompisteInfo(res.data)
        console.log(res)
        } catch (error:any) {
          Swal.fire({icon: 'error',title: 'Erreur',text: error.response.data.message});
          return;
        }
        localStorage.setItem('matriculeRH', matriculeRH);
        break;
      case 2:
        const formData = {
          phone: phone,
          matriculeRH: matriculeRH,
          etoiles: calculateAverage(),
          commentaire: commentaire,
        };
       dispatch(createReview(formData)).then(()=>{
        setPhone('');
        setMatriculeRH('');
        setRatings([0, 0, 0]);
        setCommentaire('');
        localStorage.removeItem('phone');
        localStorage.removeItem('matriculeRH'); 
      })
        break;
      case 3:
        console.log("Working on step 4");
        break;
      default:
        console.log("Unknown step");
        break;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };





  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <div className='mt-5'>
              <h6 className="Title_Text">Vérification du Numéro de Téléphone</h6>
              
              <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium Input_Label">
                Numéro de téléphone
              </label>
              <input
                type='text'
                name="phone"
                id="phone"
                placeholder="+212 6 00 00 00 00 "
                className="Input__Style w-full"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />

            </div>
          </div>
        );
      case 1:
        return (
          <div className='mt-5'>
              <h6 className="Title_Text">Scanner le Code QR sur le Badge du Pompiste</h6>
             
              <p>
                Dirigez votre appareil vers le code QR présent 
                sur le badge du pompiste.
                En cas de problème, vous pouvez saisir manuellement le code 
                pour accéder à la page d'évaluation.
              </p>
              <div className='flex flex-col items-center '>
              <img src={QR} alt="scanner le code QR" className='w-24 m-10' />

             
              <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium Input_Label">
              Saisir manuellement le code
              </label>
              <input
                type='text'
                name="code"
                id="code"
                placeholder="0000"
                className="Input__Style w-full"
                value={matriculeRH}
                onChange={(event)=>setMatriculeRH(event.target.value)}
              />

              </div>
              </div>
             
          </div>
        );
      case 2:
        return (
          <div className='mt-5'>
              <h6 className="Title_Text">Évaluer le Service du Pompiste</h6>

              <div className='flex flex-col items-center gap-2'>
                <div className='flex flex-col items-center'>
                <img className='Pompiste_Avatar'
                src={pompisteInfo?.image?.buffer ? `data:image/png;base64,${pompisteInfo.image.buffer}` : defaultIMG}
                alt="image" />
                  <span>{pompisteInfo?.username}</span>
                </div>

              <div className='flex flex-col items-center'>
                <span>Comment évaluez-vous l'accueil du pompiste ?</span>  
                <Rating
                    name="accueil"
                    value={Number(ratings[0])}
                    onChange={(_event, newValue) => handleRatingChange(0, newValue)}
                  />
              </div>

              <div className='flex flex-col items-center'>
                <span>Le pompiste était-il amical et souriant ?</span> 
                <Rating
                  name="amical"
                  value={Number(ratings[1])}
                  onChange={(_event, newValue) => handleRatingChange(1, newValue)}
                />
              </div>
              <div className='flex flex-col items-center'>
               <span>Le pompiste a-t-il été efficace dans l'exécution de ses tâches ?</span>
                <Rating
                  name="efficacite"
                  value={Number(ratings[2])}
                  onChange={(_event, newValue) => handleRatingChange(2, newValue)}
                />
              </div>


             
              <div>
                <label htmlFor="commentaire" className='block mb-2 text-sm font-medium Input_Label'> Ajouter un Commentaire</label>
                <textarea 
                className='TextArea__Style ' 
                name='commentaire'
                value={commentaire}
                onChange={(e)=> setCommentaire(e.target.value)}
                ></textarea>
              </div>
              </div>
          </div>
        );
      case 3:
        return ( 
          <div className='mt-5'>
             <h6 className="Title_Text">Félicitations</h6>

             <div className='flex flex-col items-center gap-10 mt-10'>
              <p>
                Nous avons ajouté 200 points à votre compte Shell Fidélité 
                associé au numéro de téléphone +212600000000. 
                Votre engagement et vos évaluations contribuent à rendre 
                notre service encore meilleur.
              </p>
              <p>
                Consultez votre solde de points dans l'application pour suivre 
                vos progrès et découvrez les récompenses passionnantes 
                qui vous attendent.
              </p>
              <p>
                Continuez à utiliser l'application Shell Maroc et à évaluer 
                nos services pour accumuler davantage de points !
              </p>
              <p>
              Merci de choisir Shell Maroc pour vos besoins en carburant.
              </p>

             </div>
          </div>  
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex flex-col h-screen'> 
    <Header />
   

      <div className=" md:px-60 p-10 ">
        <div className="space-y-4 md:space-y-6   sm:w-full  relative ">
          <img src={Logo} alt="Logo" />
          <p className="Paragraphe_Text">
            évaluer votre expérience et gagner des points passionnants en suivant ces étapes simples
          </p>
              <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep}>
                      {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                          optional?: React.ReactNode;
                        } = {};

                        if (isStepSkipped(index)) {
                          stepProps.completed = false;
                        }
                        return (
                          <Step key={index} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                    <div className='transition-container '>
                      {renderStepContent(activeStep)}
                    </div>
                    <div className='  mx-auto w-full lg:px-20'>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' ,width:'100%' }}>
                      <Button 
                      color="inherit" 
                      disabled={activeStep === 0} 
                      onClick={handleBack} 
                      className='Cancel__Button w-2/5 '>
                        Back
                      </Button>
                      {activeStep !== steps.length - 1 && (
                        <Button 
                          onClick={handleNext} 
                          className='Confirm__Button w-3/6'
                          disabled={
                            activeStep === 0 && phone === '' || 
                            activeStep === 1 && matriculeRH === ''  
                          }
                        >
                          Next
                        </Button>
                      )}
                      {activeStep === steps.length - 1 && (
                        <Button onClick={handleNext} className='Confirm__Button w-3/6 '>
                          <Link to='/login'>
                            Finish
                          </Link>
                          
                        </Button>
                      )}
                    </Box>
                    </div>
            </Box>

        </div>
      </div>
     </div>
  );
};

export default Index;
