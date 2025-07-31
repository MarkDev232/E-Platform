import logo from '../components/images/logo.png';
import { Link } from '@inertiajs/react';

export default function AppLogo() {
    
    return (
      
        <>
           <div className="flex aspect-square size-10 items-center justify-center rounded-md text-sidebar-primary-foreground">
    <Link href={route('welcome')}>
        <img src={logo} alt="Logo" className="h-auto cursor-pointer" />
    </Link>
    
</div>
   </>
    );
}

