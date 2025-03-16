import HealthCare from './HeathCare';
import MoreAboutUs from './MoreAboutUs';

const DetailsAboutUs = () => {
    return (
        <div className='pt-16 pb-10 md:pt-20 mx-auto w-11/12 lg:w-10/12 max-w-screen-2xl'>
           <MoreAboutUs />
           <HealthCare />
        </div>
    );
};

export default DetailsAboutUs;