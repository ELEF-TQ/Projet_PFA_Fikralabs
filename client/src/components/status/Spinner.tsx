import { BeatLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <BeatLoader color="#80BD0A" size={15} />
    </div>
  );
};

export default Spinner;
