import { useState } from "react";
import {
  FaEnvelope,
  FaDiscord,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null); // null, 'success', or 'error'

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const formUrl: string = import.meta.env.VITE_API_URL + '/contact';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Submission failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        setSubmitStatus('error');
      });

    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <section className="animate-fadeIn py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00B2FF]">
            Contact Us
          </h1>
          <p className="mt-2 text-xl mb-4">We'd love to hear from you</p>
          <p className="max-w-2xl mx-auto">
            Have questions about our APIs? Want to report a bug? Or maybe you're
            interested in partnering with us? Reach out using any of the methods
            below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-[#1A2332] rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-[#00B2FF]">
              Send Us a Message
            </h2>

            {submitStatus === 'success' && (
              <div className="bg-green-900/30 border border-green-700 text-green-100 rounded-md p-4 mb-6">
                <p className="font-medium">Thank you for your message!</p>
                <p className="text-sm mt-1">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-900/30 border border-red-700 text-red-100 rounded-md p-4 mb-6">
                <p className="font-medium">Oops! Something went wrong.</p>
                <p className="text-sm mt-1">
                  Please try again later or use another contact method.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#0D1525] border border-[#00B2FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00D4FF] text-[#D9E1E8]"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#0D1525] border border-[#00B2FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00D4FF] text-[#D9E1E8]"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#0D1525] border border-[#00B2FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00D4FF] text-[#D9E1E8]"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#0D1525] border border-[#00B2FF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00D4FF] text-[#D9E1E8]"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium shadow-lg hover:bg-[#00D4FF] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0D1525]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-[#1A2332] rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-[#00B2FF]">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-4 mt-1">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href="mailto:support@softtouch.dev"
                      className="text-gray-300 hover:text-[#00B2FF]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      support@softtouch.dev
                    </a>
                    <p className="text-gray-400 text-sm mt-1">
                      We aim to respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-4 mt-1">
                    <FaDiscord />
                  </div>
                  <div>
                    <h3 className="font-medium">Discord</h3>
                    <a
                      href="https://discord.gg/wAGzpZXexg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#00B2FF]"
                    >
                      discord.gg/softtouch
                    </a>
                    <p className="text-gray-400 text-sm mt-1">
                      Join our server for live support
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-4 mt-1">
                    <FaGithub />
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <a
                      href="https://github.com/softtouch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#00B2FF]"
                    >
                      github.com/softtouch
                    </a>
                    <p className="text-gray-400 text-sm mt-1">
                      Report issues or contribute to our project
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-4 mt-1">
                    <FaClock />
                  </div>
                  <div>
                    <h3 className="font-medium">Support Hours</h3>
                    <p className="text-gray-300">
                      Monday - Friday: 9AM - 6PM EST
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      We monitor urgent issues 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A2332] rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold mb-6 text-[#00B2FF]">
                FAQ
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-[#00B2FF]">
                    Do I need to sign up to use the APIs?
                  </h3>
                  <p className="mt-1">
                    No! All our APIs are completely free with no signup
                    required. You can start using them immediately without any
                    registration.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-[#00B2FF]">
                    Are your APIs really free?
                  </h3>
                  <p className="mt-1">
                    Yes! All our APIs are 100% free to use with absolutely no
                    restrictions or limits. We're committed to keeping them
                    freely accessible for everyone.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-[#00B2FF]">
                    How can I contribute?
                  </h3>
                  <p className="mt-1">
                    We welcome contributions! You can contribute code,
                    documentation, or support us financially. Check out our{" "}
                    <SmoothNavLink
                      to="/join"
                      className="text-[#00B2FF] hover:underline"
                    >
                      contribution guidelines
                    </SmoothNavLink>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Links */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Quick Connect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="mailto:support@softtouch.dev"
              className="bg-[#1A2332] rounded-lg p-6 text-center transition-all hover:bg-[#242e40]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-2xl text-[#00B2FF] mb-2">
                <FaEnvelope className="mx-auto" />
              </div>
              <p className="font-medium">Email Us</p>
            </a>

            <a
              href="https://discord.gg/wAGzpZXexg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1A2332] rounded-lg p-6 text-center transition-all hover:bg-[#242e40] cursor-pointer"
            >
              <div className="text-2xl text-[#00B2FF] mb-2">
                <FaDiscord className="mx-auto" />
              </div>
              <p className="font-medium">Discord Server</p>
            </a>

            <a
              href="https://github.com/softtouch/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1A2332] rounded-lg p-6 text-center transition-all hover:bg-[#242e40] cursor-pointer"
            >
              <div className="text-2xl text-[#00B2FF] mb-2">
                <FaGithub className="mx-auto" />
              </div>
              <p className="font-medium">GitHub Issues</p>
            </a>

            <SmoothNavLink
              to="/donate"
              className="bg-[#1A2332] rounded-lg p-6 text-center transition-all hover:bg-[#242e40]"
            >
              <div className="text-2xl text-[#00B2FF] mb-2">
                <FaDollarSign className="mx-auto" />
              </div>
              <p className="font-medium">Support Us</p>
            </SmoothNavLink>
          </div>
        </div>
      </div>
    </section>
  );
}