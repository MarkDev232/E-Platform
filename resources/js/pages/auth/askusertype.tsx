import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';
import { LoaderCircle } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                    <AppLogo />
                    <h1 className="text-xl font-semibold tracking-tight">FitnessBuddies</h1>
                </div>

                {/* Headline */}
                <h2 className="text-xl font-semibold text-gray-800">It’s fast and free to get started</h2>

                {/* Tabs (Static UI only) */}
                <div className="flex items-center justify-center mt-4 mb-6 space-x-2 text-sm font-medium">
                    <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-600">Personal</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Business</button>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="w-full max-w-md space-y-4 text-left">
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
                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    </div>

                    <div>
                        <Label htmlFor="email">Legal business email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="Legal business email"
                            disabled={processing}
                        />
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    </div>

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
                        <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Create your account
                    </Button>
                </form>

                {/* Agreement */}
                <p className="text-xs text-gray-500 mt-4 text-center max-w-md">
                    By Registering, you agree to NichoShop’s{' '}
                    <a href="#" className="text-blue-600 underline">User Agreement</a> and{' '}
                    <a href="#" className="text-blue-600 underline">Cookies & Internet Advertising</a>.
                </p>

                {/* Divider */}
                <div className="flex items-center my-6 w-full max-w-md">
                    <div className="flex-grow border-t border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <div className="flex-grow border-t border-gray-300" />
                </div>

                {/* Social buttons */}
                <div className="flex gap-4">
                    <button className="p-2 rounded-md border bg-white">
                        <img src="/icons/google.svg" className="w-5 h-5" alt="Google" />
                    </button>
                    <button className="p-2 rounded-md border bg-white">
                        <img src="/icons/facebook.svg" className="w-5 h-5" alt="Facebook" />
                    </button>
                    <button className="p-2 rounded-md border bg-white">
                        <img src="/icons/twitter.svg" className="w-5 h-5" alt="Twitter" />
                    </button>
                </div>

                {/* Footer */}
                <p className="text-sm text-gray-600 mt-6">
                    Already a Member?{' '}
                    <Link href={route('login')} className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>

                {/* Copyright */}
                <footer className="mt-10 text-xs text-gray-400 text-center">
                    Copyright 2017 NichoShop Inc. All rights reserved.{' '}
                    <a href="#" className="text-blue-600 underline">User agreement</a>,{' '}
                    <a href="#" className="text-blue-600 underline">Privacy</a> and{' '}
                    <a href="#" className="text-blue-600 underline">Cookies</a>.
                </footer>
            </div>
        </>
    );
}
