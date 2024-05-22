import { Suspense } from 'react';
import TermsOfService from '../components/Footer/TermsOfService';


const Loading = <div className={'bg-purple-500'}>Loading</div>;

const FooterRouter = () => {
    return[
        {
        path    : 'TermsOfService',        // /footer/TermsOfService
        element : <Suspense fallback={Loading}><TermsOfService/></Suspense>
        }

    ]
}

export default FooterRouter;