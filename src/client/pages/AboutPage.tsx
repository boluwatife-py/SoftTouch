export default function AboutPage() {
  return (
    <section className="animate-fadeIn py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00B2FF]">About SoftTouch</h1>
          <p className="mt-2 text-xl">Our mission and story</p>
        </div>

        <div className="bg-[#1A2332] rounded-lg shadow-lg overflow-hidden p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#00B2FF] mb-6">Our Mission</h2>
          
          <p className="mb-6">
            SoftTouch was founded with a simple but powerful mission: to democratize access to high-quality APIs for developers at all levels.
          </p>
          
          <p className="mb-6">
            We believe that technology should be accessible to everyone, regardless of budget constraints. By providing free, reliable, and well-documented APIs, we aim to empower developers to build innovative applications without worrying about costly subscription fees.
          </p>
          
          <p className="mb-6">
            Our team consists of passionate developers who understand the challenges of building modern applications. We're committed to maintaining high standards of reliability, security, and performance for all our APIs.
          </p>
          
          <h2 className="text-2xl font-semibold text-[#00B2FF] mb-6 mt-12">Core Values</h2>
          
          <ul className="list-disc pl-6 space-y-4">
            <li><strong className="text-[#00B2FF]">Accessibility</strong> - Removing financial barriers to quality development resources</li>
            <li><strong className="text-[#00B2FF]">Reliability</strong> - Maintaining stable services that developers can depend on</li>
            <li><strong className="text-[#00B2FF]">Transparency</strong> - Being open about our processes, limitations, and roadmap</li>
            <li><strong className="text-[#00B2FF]">Community</strong> - Fostering a supportive environment for developers of all experience levels</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
