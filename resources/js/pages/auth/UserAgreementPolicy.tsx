import { Head } from '@inertiajs/react';

export default function UserAgreementPolicy() {
  return (
    <>
      <Head title="User Agreement & Cookies Policy" />
      <div className="mx-auto max-w-3xl px-4 py-12 text-gray-800">
        <h1 className="mb-6 text-3xl font-bold">User Agreement</h1>

        <p className="mb-4 text-sm text-gray-600">Effective Date: July 30, 2025</p>
        <p className="mb-4">
          Welcome to <strong>Fitness Buddies</strong> — a platform for fitness enthusiasts to shop,
          connect, and grow healthier together.
        </p>

        <h2 className="mt-6 text-xl font-semibold">1. Account Registration</h2>
        <ul className="mb-4 list-disc pl-5">
          <li>You must be 18 years or older to create an account.</li>
          <li>You agree to provide accurate information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
        </ul>

        <h2 className="text-xl font-semibold">2. Use of the Platform</h2>
        <p className="mb-2">You agree to:</p>
        <ul className="mb-4 list-disc pl-5">
          <li>Use Fitness Buddies for lawful purposes only.</li>
          <li>Not engage in fraudulent, harmful, or misleading behavior.</li>
          <li>Not upload or distribute malicious content, spam, or viruses.</li>
        </ul>

        <p className="mb-4">
          We reserve the right to suspend or terminate accounts violating our policies.
        </p>

        <h2 className="text-xl font-semibold">3. Orders & Payments</h2>
        <ul className="mb-4 list-disc pl-5">
          <li>All product prices are listed in your local currency and include applicable taxes unless stated.</li>
          <li>Payment must be completed before your order is processed.</li>
          <li>We reserve the right to cancel suspicious or incomplete transactions.</li>
        </ul>

        <h2 className="text-xl font-semibold">4. Returns & Refunds</h2>
        <p className="mb-4">
          Please refer to our <a href="/return-policy" className="text-blue-600 underline">Return Policy</a> for detailed guidelines.
        </p>

        <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
        <p className="mb-4">
          Fitness Buddies is not liable for indirect or incidental damages, loss of profits or data, or failures due to third-party services.
        </p>

        <h2 className="text-xl font-semibold">6. Changes to This Agreement</h2>
        <p className="mb-4">
          We may update this agreement. Continued use of the service after updates means you accept the changes.
        </p>

        <hr className="my-8" />

        <h1 className="mb-4 text-3xl font-bold">Cookies & Internet Advertising Policy</h1>

        <h2 className="text-xl font-semibold">1. What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small files stored on your browser to enhance your experience on our site.
        </p>

        <h2 className="text-xl font-semibold">2. How We Use Cookies</h2>
        <ul className="mb-4 list-disc pl-5">
          <li>Remember your login and preferences.</li>
          <li>Analyze website traffic via Google Analytics.</li>
          <li>Show relevant ads based on your browsing activity.</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Third-Party Cookies</h2>
        <p className="mb-4">
          We partner with platforms like Facebook and Google Ads, which may set their own cookies. See their policies:
        </p>
        <ul className="mb-4 list-disc pl-5">
          <li>
            <a href="https://policies.google.com/technologies/ads" target="_blank" className="text-blue-600 underline">
              Google Ads
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/policies/cookies/" target="_blank" className="text-blue-600 underline">
              Facebook Ads
            </a>
          </li>
        </ul>

        <h2 className="text-xl font-semibold">4. Managing Cookies</h2>
        <p className="mb-4">
          You can manage or disable cookies in your browser settings, but this may affect site functionality.
        </p>

        <hr className="my-8" />

        <h2 className="text-xl font-semibold">📬 Contact Us</h2>
        <p className="mt-2 text-sm">
          Email: support@fitnessbuddies.com<br />
          Address: Fitness Buddies HQ, 123 Wellness Street, Fit City
        </p>
      </div>
    </>
  );
}
