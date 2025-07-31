import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import AppLogo from '@/components/app-logo';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-md space-y-8 text-center">
                    <div className="flex items-center justify-center mb-6 gap-2">
                        <AppLogo /> 
                    </div>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">Sign in</h2>

                    <form onSubmit={submit} className="space-y-6 text-left">
                        <div className="space-y-4">
                            <div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="Email or username"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', !!checked)}
                                    />
                                    <Label htmlFor="remember" className="text-gray-600">
                                        Stay signed in
                                    </Label>
                                </div>
                                <div className="flex flex-col text-right text-xs text-blue-600 space-y-1">
                                    {canResetPassword && (
                                        <a href={route('password.request')} className="hover:underline">
                                            Forgot password?
                                        </a>
                                    )}
                                    
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={processing}
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="relative mt-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">or</span>
                        </div>
                    </div>

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

                    <p className="text-sm text-gray-500 mt-6">
                        Don't have an account?{' '}
                        <a href={route('register')} className="text-blue-600 font-medium hover:underline">
                            Sign Up
                        </a>
                    </p>

                    {status && <p className="text-green-600 text-sm">{status}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
}
