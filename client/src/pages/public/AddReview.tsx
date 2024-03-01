import React, { useState } from 'react';
import illustration from '../../assets/images/illustration.png';
import Logo from '../../assets/icons/LogoBlack.png';
import './style.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import QR from '../../assets/images/Vectorscan.png'
import PompisteImg from '../../assets/images/istockphoto-832990432-612x612 1.png'
import { Rating } from '@mui/material';
import { AppDispatch } from '../../context/store';
import { useSelector,useDispatch } from 'react-redux';
import { getPompiste } from '../../context/features/PompisteSlice';
import { createReview } from '../../context/features/ReviewSlice';
const steps = ['', '', '', ''];

const Index: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {pompiste} = useSelector((state:any)=>state.pompistes)
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [phone, setPhone] = useState('');
  const [matriculeRH, setMatriculeRH] = useState('');
  const [ratings, setRatings] = useState<number[]>([0, 0, 0]);
 
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
    const roundedAverage = Math.round(average);
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
        localStorage.setItem('phone', phone);
        break;
      case 1:
        localStorage.setItem('matriculeRH', matriculeRH);
        dispatch(getPompiste(matriculeRH));
        break;
      case 2:
        const formData = {
          phone: phone,
          matriculeRH: matriculeRH,
          etoiles: calculateAverage(),
        };
        console.log('Form Data:', formData);
        dispatch(createReview(formData));
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
          <div className='mt-10'>
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
          <div className='mt-10'>
              <h6 className="Title_Text">Scanner le Code QR sur le Badge du Pompiste</h6>
             
              <p>
                Dirigez votre appareil vers le code QR présent 
                sur le badge du pompiste.
                En cas de problème, vous pouvez saisir manuellement le code 
                pour accéder à la page d'évaluation.
              </p>
              <div className='flex flex-col items-center gap-10'>
              <img src={QR} alt="scanner le code QR" className='w-20' />

             
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
          <div className='mt-10'>
              <h6 className="Title_Text">Évaluer le Service du Pompiste</h6>

              <div className='flex flex-col items-center gap-10 mt-10'>
                <div className='flex flex-col items-center'>
                  <img className='Pompiste_Avatar ' src={PompisteImg} alt="image" />
                  <span>Mohamed Mohamed</span>
                </div>

                <div className='flex flex-col items-center'>
              <span>Comment évaluez-vous l'accueil du pompiste ?</span>  
              <Rating
                  name="accueil"
                  value={Number(ratings[0])}
                  onChange={(event, newValue) => handleRatingChange(0, newValue)}
                />
              </div>
              <div className='flex flex-col items-center'>
                <span>Le pompiste était-il amical et souriant ?</span> 
                <Rating
                  name="amical"
                  value={Number(ratings[1])}
                  onChange={(event, newValue) => handleRatingChange(1, newValue)}
                />
              </div>
              <div className='flex flex-col items-center'>
               <span>Le pompiste a-t-il été efficace dans l'exécution de ses tâches ?</span>
                <Rating
                  name="efficacite"
                  value={Number(ratings[2])}
                  onChange={(event, newValue) => handleRatingChange(2, newValue)}
                />
              </div>

              <div>
                Moyenne des évaluations: {calculateAverage()}
              </div>
              </div>
          </div>
        );
      case 3:
        return ( 
          <div className='mt-10'>
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
    <div className="flex flex-row items-center justify-around gap-0 h-full">
      <div className="hidden md:block">
        <img src={illustration} alt="illustration" className="" />
      </div>
      <div className=" xl:p-2 p-20 ">
        <div className="space-y-4 md:space-y-6 md:p-5  sm:w-full ">
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
                    <div>
                      {renderStepContent(activeStep)}
                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifyContent: 'space-between' }}>
                      <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
                        Back
                      </Button>
                      {activeStep !== steps.length - 1 && (
                        <Button onClick={handleNext}>
                          Next
                        </Button>
                      )}
                      {activeStep === steps.length - 1 && (
                        <Button onClick={handleNext}>
                          Finish
                        </Button>
                      )}
                    </Box>
            </Box>

        </div>
      </div>
    </div>
  );
};

export default Index;
