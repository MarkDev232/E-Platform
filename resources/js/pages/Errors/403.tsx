import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Error403() {
    const [secondsLeft, setSecondsLeft] = useState(3);

    useEffect(() => {
        const countdown = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            window.location.href = '/'; // or '/welcome'
        }, 3000);

        return () => {
            clearInterval(countdown);
            clearTimeout(redirect);
        };
    }, []);

    return (
        <>
            <Head title="403 Unauthorized" />
            <div className="h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600">403 Unauthorized</h1>
                    <p className="mt-2 text-lg text-gray-700">
                        You are not authorized to access this page.
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Redirecting to the homepage in {secondsLeft} second{secondsLeft !== 1 ? 's' : ''}...
                    </p>
                </div>
            </div>
        </>
    );
}
