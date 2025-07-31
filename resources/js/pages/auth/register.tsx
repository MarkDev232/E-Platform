import AppLogo from '@/components/app-logo';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';

export default function Register() {
    const [userType, setUserType] = useState<'personal' | 'business'>('personal');
    

   const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    user_type: userType, // Add this
});

    useEffect(() => {
    setData('user_type', userType);
}, [setData, userType]);


    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12">
                {/* Logo */}
                <div className="mb-6 flex items-center gap-2">
                    <AppLogo />
                </div>

                {/* Headline */}
                <h2 className="text-xl font-semibold text-gray-800">It’s fast and free to get started</h2>

                {/* Tabs (Static UI only) */}
                <div className="mt-4 mb-6 flex w-50 items-center justify-between rounded-md bg-gray-100 p-2 text-sm font-medium shadow-sm">
                    <button
                        type="button"
                        className={`rounded-md px-4 py-2 ${userType === 'personal' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                        onClick={() => setUserType('personal')}
                    >
                        Personal
                    </button>
                    <button
                        type="button"
                        className={`rounded-md px-4 py-2 ${userType === 'business' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                        onClick={() => setUserType('business')}
                    >
                        Business
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="w-full max-w-md space-y-4 text-left">
    {userType === 'business' ? (
        <>
            <div>
                <Label htmlFor="name">Legal business name</Label>
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    placeholder="Legal business name"
                    disabled={processing}
                />
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            </div>

            <div>
                <Label htmlFor="email">Business email</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    placeholder="Business email"
                    disabled={processing}
                />
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            </div>
        </>
    ) : (
        <>
            <div>
                <Label htmlFor="name">Full name</Label>
                <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    placeholder="Full name"
                    disabled={processing}
                />
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            </div>

            <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    placeholder="Email address"
                    disabled={processing}
                />
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            </div>
        </>
    )}

    <div>
        <Label htmlFor="password">Password</Label>
        <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            required
            placeholder="Password"
            disabled={processing}
        />
        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
    </div>

    <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700" disabled={processing}>
        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
        Create your account
    </Button>
</form>


                {/* Agreement */}
                <p className="mt-4 max-w-md text-center text-xs text-gray-500">
                    By Registering, you agree to FitnessBuddies{' '}


                    <Link href={route('useragreementpolicy')} className="text-blue-600 underline">
                        User Agreement
                    </Link>{' '}
                    and{' '}
                    <Link href={route('useragreementpolicy')} className="text-blue-600 underline">
                        Cookies & Internet Advertising
                    </Link>
                    .
                </p>

                {/* Divider */}
                <div className="my-6 flex w-full max-w-md items-center">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="px-2 text-sm text-gray-500">or</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                {/* Social buttons */}
                <div className="flex justify-center gap-4">
                                        <button className="p-3 border rounded-md hover:bg-gray-100">
                                            <FaGoogle className="text-red-500" />
                                        </button>
                                        <button className="p-3 border rounded-md hover:bg-gray-100">
                                            <FaFacebookF className="text-blue-600" />
                                        </button>
                                        <button className="p-3 border rounded-md hover:bg-gray-100">
                                            <FaTwitter className="text-sky-500" />
                                        </button>
                                    </div>

                {/* Footer */}
                <p className="mt-6 text-sm text-gray-600">
                    Already has an account?{' '}
                    <Link href={route('login')} className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>

                {/* Copyright */}
               
            </div>
             <Footer />
        </>
    );
}
