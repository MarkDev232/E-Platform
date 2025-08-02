import { Link } from '@inertiajs/react';
import logo from '../components/images/logo.png';

export default function AppLogo() {
    return (
        <>
            {/* <div className="flex aspect-square size-10 items-center justify-center rounded-md text-sidebar-primary-foreground">
                
            </div> */}

            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <Link href={route('welcome')}>
                    <img src={logo} alt="Logo" className="h-auto cursor-pointer" />
                </Link>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <h1 className="mb-0.5 truncate leading-none font-semibold text-xl pt-1">FitnessBuddies</h1>
            </div> 
        </>
    );
}
