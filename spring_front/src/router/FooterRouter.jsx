import { Suspense } from 'react';
import TravelTermsandConditions from '../components/Footer/TravelTermsandConditions';
import TermsOfUse from '../components/Footer/TermsofUse';
import Location from '../components/Footer/Location';


const Loading = <div className={'bg-purple-500'}>Loading</div>;

const FooterRouter = () => {
    return[
        {
            path    : 'Location',        // /footer/Location
            element : <Suspense fallback={Loading}><Location/></Suspense>
        },
        {
            path    : 'TermsofUse',        // /footer/TermsofUse
            element : <Suspense fallback={Loading}><TermsOfUse/></Suspense>
        },
        {
        path    : 'TravelTermsandConditions',        // /footer/TravelTermsandConditions
        element : <Suspense fallback={Loading}><TravelTermsandConditions/></Suspense>
        }
        

    ]
}

export default FooterRouter;