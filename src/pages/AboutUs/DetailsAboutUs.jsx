import HealthCare from './HeathCare';
import MoreAboutUs from './MoreAboutUs';


const DetailsAboutUs = () => {
    return (
        <div className=' py-16 md:py-20 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl'>
           <MoreAboutUs />
           <HealthCare />
          
        </div>
    );
};

export default DetailsAboutUs;