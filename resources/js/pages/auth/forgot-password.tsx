import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="w-full max-w-md space-y-8 text-center">
                    {/* Brand Name */}
                    <h1 className="text-xl font-semibold tracking-tight">FitnessBuddies</h1>

                    <h2 className="mt-6 text-xl font-semibold text-gray-800">
                        Forgot your password?
                    </h2>
                    <p className="text-sm text-gray-500">
                        Enter your email and we’ll send you a reset link.
                    </p>

                    {/* Form */}
                    <form onSubmit={submit} className="space-y-6 text-left">
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        {status && (
                            <div className="text-green-600 text-sm text-center">
                                {status}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={processing}
                        >
                            Email Password Reset Link
                        </Button>
                    </form>

                    <div className="text-sm text-gray-600">
                        <span>Or, return to </span>
                        <a href={route('login')} className="text-blue-600 hover:underline font-medium">
                            Sign in
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
