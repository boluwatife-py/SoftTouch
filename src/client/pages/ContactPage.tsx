import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaDiscord,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaDollarSign,
  FaCheck,
  FaExclamationTriangle,
} from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 50) return 'Name must be less than 50 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return undefined;
      case 'subject':
        if (!value) return 'Please select a subject';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        if (value.length > 1000) return 'Message must be less than 1000 characters';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Validate on change if field has been touched
    if (touched[id]) {
      const error = validateField(id, value);
      setErrors(prev => ({ ...prev, [id]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    const error = validateField(id, formData[id as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [id]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const formUrl: string = import.meta.env.VITE_API_URL + '/contact';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

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
        setTouched({});
        setErrors({});
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

  const InputWrapper = ({ children, id, label }: { children: React.ReactNode; id: string; label: string }) => (
    <div className="mb-4 sm:mb-6">
      <label
        htmlFor={id}
        className="block text-xs sm:text-sm font-medium mb-1 sm:mb-2"
      >
        {label}
      </label>
      <div className="relative">
        {children}
        {touched[id] && errors[id] && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400">
            <FaExclamationTriangle className="h-4 w-4" />
          </div>
        )}
        {touched[id] && !errors[id] && formData[id as keyof typeof formData] && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400">
            <FaCheck className="h-4 w-4" />
          </div>
        )}
      </div>
      {touched[id] && errors[id] && (
        <p className="mt-1 text-xs text-red-400">{errors[id]}</p>
      )}
    </div>
  );

  return (
    <section className="animate-fadeIn py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00B2FF]">
            Contact Us
          </h1>
          <p className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4">We'd love to hear from you</p>
          <p className="max-w-2xl mx-auto text-sm sm:text-base">
            Have questions about our APIs? Want to report a bug? Or maybe you're
            interested in partnering with us? Reach out using any of the methods
            below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          {/* Contact Form */}
          <div className="bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-[#00B2FF]">
              Send Us a Message
            </h2>

            {submitStatus === 'success' && (
              <div className="bg-green-900/30 border border-green-700 text-green-100 rounded-md p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="font-medium text-sm sm:text-base">Thank you for your message!</p>
                <p className="text-xs sm:text-sm mt-1">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-900/30 border border-red-700 text-red-100 rounded-md p-3 sm:p-4 mb-4 sm:mb-6">
                <p className="font-medium text-sm sm:text-base">Oops! Something went wrong.</p>
                <p className="text-xs sm:text-sm mt-1">
                  Please try again later or use another contact method.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <InputWrapper id="name" label="Name">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0D1525] border ${
                    touched.name && errors.name ? 'border-red-400' : 
                    touched.name && !errors.name ? 'border-green-400' : 
                    'border-[#00B2FF]'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#00D4FF] text-[#D9E1E8] text-sm pr-8`}
                  required
                  disabled={isSubmitting}
                />
              </InputWrapper>

              <InputWrapper id="email" label="Email">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0D1525] border ${
                    touched.email && errors.email ? 'border-red-400' : 
                    touched.email && !errors.email ? 'border-green-400' : 
                    'border-[#00B2FF]'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#00D4FF] text-[#D9E1E8] text-sm pr-8`}
                  required
                  disabled={isSubmitting}
                />
              </InputWrapper>

              <InputWrapper id="subject" label="Subject">
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0D1525] border ${
                    touched.subject && errors.subject ? 'border-red-400' : 
                    touched.subject && !errors.subject ? 'border-green-400' : 
                    'border-[#00B2FF]'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#00D4FF] text-[#D9E1E8] text-sm pr-8`}
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
              </InputWrapper>

              <InputWrapper id="message" label="Message">
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-[#0D1525] border ${
                    touched.message && errors.message ? 'border-red-400' : 
                    touched.message && !errors.message ? 'border-green-400' : 
                    'border-[#00B2FF]'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#00D4FF] text-[#D9E1E8] text-sm pr-8`}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </InputWrapper>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium shadow-lg hover:bg-[#00D4FF] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#0D1525]"
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
            <div className="bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-[#00B2FF]">
                Contact Information
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                    <FaEnvelope className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Email</h3>
                    <a
                      href="mailto:support@softtouch.dev"
                      className="text-gray-300 hover:text-[#00B2FF] text-xs sm:text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      support@softtouch.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                    <FaDiscord className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Discord</h3>
                    <a
                      href="https://discord.gg/softtouch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#00B2FF] text-xs sm:text-sm"
                    >
                      Join our community
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                    <FaGithub className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">GitHub</h3>
                    <a
                      href="https://github.com/softtouch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-[#00B2FF] text-xs sm:text-sm"
                    >
                      View our repositories
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1A2332] rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-[#00B2FF]">
                Business Hours
              </h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                    <FaClock className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Support Hours</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Monday - Friday: 9:00 AM - 5:00 PM EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-[#00B2FF] mr-3 sm:mr-4 mt-1">
                    <FaDollarSign className="text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">Pricing</h3>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      All our APIs are completely free to use
                    </p>
                  </div>
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