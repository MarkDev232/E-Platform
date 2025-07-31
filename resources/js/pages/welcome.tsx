import AppLogo from '@/components/app-logo';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import heroimage from '../../images/lading_hero.jpg';

type Product = {
    id: number;
    name: string;
    image_url: string;
    price: number;
};

type Props = SharedData & {
    topProducts: Product[];
};

export default function Welcome() {
    const { topProducts } = usePage<Props>().props;
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="FitnessBuddies">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div
                className="flex min-h-screen flex-col bg-[#f9f9f9] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]"
                style={{
                    backgroundImage: `url(${heroimage})`,
                }}
            >
                <header className="w-full bg-secondary px-6 py-4 shadow-sm dark:bg-[#1c1c1c]">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <AppLogo />
                            <h1 className="text-xl font-semibold tracking-tight">
    FitnessBuddies
  </h1>
                          
                        </div>
                        <nav className="flex items-center justify-end gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative flex flex-grow items-center justify-center bg-cover bg-center px-6 py-16">
                    <div className="absolute inset-0 z-0 bg-black opacity-60" />
                    <div className="relative z-10 max-w-4xl space-y-6 text-center text-white">
                        <h2 className="text-4xl font-bold lg:text-5xl">Upgrade Your Gym Life with FitnessBuddies</h2>
                        <p className="mx-auto max-w-2xl text-lg">
                            Discover high-quality gear, top supplements, and personalized fitness programs in one platform. Shop smarter, lift
                            stronger.
                        </p>
                        <div className="mt-6 flex justify-center gap-4">
                            <Link href={route('register')} className="rounded-lg bg-white px-6 py-3 text-sm text-black hover:bg-gray-200">
                                Get Started
                            </Link>
                            <Link
                                href="#features"
                                className="rounded-lg border border-white px-6 py-3 text-sm text-white hover:bg-white hover:text-black"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="bg-white px-6 py-20 dark:bg-[#121212]">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">Top Fitness Brands</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                We partner with leading fitness brands to bring you premium products.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">Fast & Secure Delivery</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                Get your gear delivered quickly and securely, wherever you are.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">Community Support</h3>
                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                Join a community of lifters, athletes, and wellness enthusiasts.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Top Products Section */}
                <section className="bg-white px-6 py-16 dark:bg-[#0e0e0e]">
                    <div className="mx-auto max-w-6xl text-center">
                        <h2 className="mb-8 text-3xl font-bold">Top Products</h2>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {topProducts.map((product) => (
                                <div key={product.id} className="rounded-lg bg-white p-4 shadow-md dark:bg-[#1b1b1b]">
                                    <img src={product.image_url} alt={product.name} className="mb-4 h-48 w-full rounded-md object-cover" />
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">₱{product.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-[#fdfdfd] px-6 py-16 text-center dark:bg-[#181818]">
                    <div className="mx-auto max-w-3xl space-y-4">
                        <h2 className="text-3xl font-bold">Ready to Take the Next Step?</h2>
                        <p>Sign up today and get exclusive access to member-only deals and training resources.</p>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-lg bg-black px-6 py-3 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                        >
                            Join Now
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#1b1b18] py-6 text-center text-sm text-white dark:bg-[#0a0a0a]">
                    © {new Date().getFullYear()} FitnessBuddies. All rights reserved.
                </footer>
            </div>
        </>
    );
}
