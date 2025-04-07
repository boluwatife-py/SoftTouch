import { useEffect } from "react";

export default function TermsPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="animate-fadeIn py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00B2FF] mb-4">Terms & Conditions</h1>
          <p className="text-lg">Last Updated: March 29, 2025</p>
        </div>
        
        <div className="bg-[#1A2332] rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">1. Introduction</h2>
          <p className="mb-6">
            Welcome to SoftTouch API ("we," "our," or "us"). These Terms and Conditions govern your access to and use of our API services. By accessing or using our APIs, you agree to be bound by these terms.
          </p>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">2. API Use</h2>
          <p className="mb-4">
            Our APIs are provided free of charge, with no authentication requirements, no rate limits, and no restrictions on commercial use. You may integrate our APIs into any application, website, or service without prior approval.
          </p>
          <p className="mb-6">
            While we strive to maintain 100% uptime, we do not guarantee that the APIs will be available at all times. We reserve the right to modify, suspend, or discontinue the APIs at any time without notice.
          </p>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">3. Acceptable Use</h2>
          <p className="mb-4">
            You agree not to use our APIs:
          </p>
          <ul className="list-disc pl-8 mb-6 space-y-2">
            <li>For any illegal purposes or in violation of any local, state, national, or international law.</li>
            <li>To harm, threaten, or harass any person or to incite violence or discrimination.</li>
            <li>To generate or facilitate unsolicited commercial email.</li>
            <li>To impersonate any person or entity.</li>
            <li>To interfere with or disrupt the APIs or servers or networks connected to the APIs.</li>
            <li>To attempt to gain unauthorized access to our services, systems, or networks.</li>
          </ul>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">4. Intellectual Property</h2>
          <p className="mb-6">
            All content, features, and functionality of our APIs, including but not limited to code, text, graphics, logos, and icons, are owned by SoftTouch and are protected by intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our APIs without our permission.
          </p>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">5. Disclaimer of Warranties</h2>
          <p className="mb-6">
            The APIs are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the APIs will be uninterrupted, timely, secure, or error-free.
          </p>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">6. Limitation of Liability</h2>
          <p className="mb-6">
            In no event shall SoftTouch be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the APIs.
          </p>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">7. Indemnification</h2>
          <p className="mb-6">
            You agree to defend, indemnify, and hold harmless SoftTouch and our affiliates, directors, officers, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses arising from your use of the APIs.
          </p>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">8. Changes to Terms</h2>
          <p className="mb-6">
            We reserve the right to modify these Terms and Conditions at any time. If we make changes, we will provide notice by updating the date at the top of these terms and by maintaining a current version of the terms at this location. Your continued use of the APIs after such modifications will constitute your acknowledgment of the modified terms.
          </p>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">9. Governing Law</h2>
          <p className="mb-6">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which SoftTouch is established, without regard to its conflict of law provisions.
          </p>
          
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">10. Contact Us</h2>
          <p className="mb-2">
            If you have any questions about these Terms and Conditions, please contact us at:
          </p>
          <p className="text-[#00B2FF]">
            support@softtouch.dev
          </p>
        </div>
        
        <div className="bg-[#1A2332] rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-semibold text-[#00B2FF] mb-4">Privacy Policy</h2>
          <p className="mb-4">
            At SoftTouch, we respect your privacy and are committed to protecting it. We do not collect any personal data when you use our APIs.
          </p>
          <p className="mb-4">
            Our servers automatically log standard information including IP addresses and request details for system administration, troubleshooting, and analytics purposes. This information is used in aggregate form and is not used to identify individual users.
          </p>
          <p>
            We do not share, sell, rent, or trade any information with third parties for their commercial purposes.
          </p>
        </div>
      </div>
    </section>
  );
}