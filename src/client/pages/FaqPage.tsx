import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FaQuestionCircle, FaEnvelope, FaDiscord, FaGithub } from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [
    "all",
    "general",
    "technical",
    "apis",
    "contribution"
  ];

  const faqs: FaqItem[] = [
    {
      question: "Are the APIs really free without any limitations?",
      answer: "Yes! All our APIs are completely free to use with no rate limits, usage restrictions, or hidden costs. We don't require any payment information, and there are no premium tiers. SoftTouch believes in providing unlimited access to all developers regardless of project size.",
      category: "general"
    },
    {
      question: "Do I need an API key or registration to use the APIs?",
      answer: "No, you don't need to register or use an API key. All our APIs are freely accessible without any authentication. Just make your requests to our endpoints and start building immediately.",
      category: "general"
    },
    {
      question: "What is SoftTouch?",
      answer: "SoftTouch is a platform providing completely free, unlimited API services for developers. We offer high-quality, reliable APIs that can be used in your projects without any cost or limitations. Our mission is to support the developer community by removing barriers to powerful tools and services.",
      category: "general"
    },
    {
      question: "How do I start using the APIs?",
      answer: "Just visit our API catalog, choose the API you need, and check the documentation for usage examples. Our APIs use standard HTTP requests and return responses in JSON format. Copy the example code into your project and you're good to go - no signup, no authentication, completely hassle-free!",
      category: "technical"
    },
    {
      question: "What programming languages are supported?",
      answer: "Our APIs work with any programming language that supports HTTP requests. We provide specific examples for JavaScript, Python, PHP, Ruby, Java, C#, Go, and other popular languages in our documentation to help you integrate quickly regardless of your tech stack.",
      category: "technical"
    },
    {
      question: "Can I use these APIs in commercial projects?",
      answer: "Absolutely! You can use our APIs in personal, commercial, open-source, or any other type of project without restrictions. There are no attribution requirements, though we always appreciate a mention if you found our services helpful!",
      category: "general"
    },
    {
      question: "How reliable are these APIs?",
      answer: "We strive for high reliability with a 99.9% uptime target. Our infrastructure is designed to be resilient with distributed servers across multiple regions to ensure fast response times. We monitor our services 24/7 to address any issues that may arise.",
      category: "technical"
    },
    {
      question: "What API endpoints are currently available?",
      answer: "We offer APIs for random number generation, user data generation, and quote retrieval. We're continuously adding new endpoints based on community needs and suggestions. Check our API catalog page to see the complete list of available endpoints.",
      category: "apis"
    },
    {
      question: "Do you offer data validation APIs?",
      answer: "Yes! We provide several data validation APIs including email validation, phone number formatting, address verification, and more. These are particularly useful for forms and user registration flows in your applications.",
      category: "apis"
    },
    {
      question: "How often are new APIs added?",
      answer: "We aim to add new APIs monthly based on community feedback and requests. Our roadmap is publicly available on GitHub, and we encourage users to vote for features they'd like to see implemented next.",
      category: "apis"
    },
    {
      question: "How can I contribute to SoftTouch?",
      answer: "We welcome contributions from the community! You can contribute by submitting bug reports, suggesting new features, improving documentation, or developing new APIs. Check our GitHub repository and contribution guidelines for details. You can also support us through donations if you find our services valuable.",
      category: "contribution"
    },
    {
      question: "Will SoftTouch always be free?",
      answer: "Yes, keeping SoftTouch completely free is our core commitment. We're primarily supported by donations from generous users and organizations who believe in our mission of making APIs accessible to everyone.",
      category: "general"
    },
    {
      question: "What happens if I need help implementing an API?",
      answer: "We offer community-based support through our Discord server and GitHub issues. Our active community of developers and maintainers is always ready to help resolve integration issues. For more direct assistance, you can contact our support team via the contact page.",
      category: "technical"
    },
    {
      question: "Can I request a custom API?",
      answer: "Yes! We consider all API requests from the community. Submit your idea through our GitHub repository or contact page, describing the functionality you need. If there's sufficient community interest, we'll prioritize developing it.",
      category: "apis"
    },
    {
      question: "How do I report a bug or issue with an API?",
      answer: "The fastest way to report bugs is through our GitHub issues page. Please include details about the endpoint, the issue you're experiencing, and steps to reproduce. This helps us address the problem quickly and effectively.",
      category: "technical"
    },
    {
      question: "Can I donate to support SoftTouch?",
      answer: "Yes! While all our services are free, we appreciate donations that help cover our server costs and development time. You can contribute through our donation page. Every contribution helps us maintain and expand our services.",
      category: "contribution"
    }
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="animate-fadeIn py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#00B2FF]">Frequently Asked Questions</h1>
          <p className="mt-2 text-xl">Got questions? We've got answers.</p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                activeCategory === category
                  ? "bg-[#00B2FF] text-[#0D1525]"
                  : "bg-[#1A2332] text-[#D9E1E8] hover:bg-[#1A2332]/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-[#1A2332] rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                  >
                    <div className="flex items-center">
                      <FaQuestionCircle className="text-[#00B2FF] mr-3 flex-shrink-0" />
                      <h3 className="text-lg font-medium text-[#00B2FF]">{faq.question}</h3>
                    </div>
                    <ChevronDown 
                      className={`h-6 w-6 text-[#00B2FF] transition-transform duration-200 ${openIndex === index ? 'transform rotate-180' : ''}`} 
                    />
                  </button>
                  <div className={`px-6 pb-6 ${openIndex === index ? 'block' : 'hidden'}`}>
                    <div className="pl-8 border-l-2 border-[#00B2FF] ml-2">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-[#1A2332] rounded-lg">
                <p className="text-lg">No FAQs found in this category.</p>
                <button 
                  onClick={() => setActiveCategory("all")}
                  className="mt-4 px-4 py-2 bg-[#00B2FF] text-[#0D1525] rounded-md"
                >
                  View All FAQs
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="mt-12 bg-[#1A2332] rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="mb-6">If you couldn't find the answer to your question, feel free to contact us.</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <SmoothNavLink 
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#00B2FF] text-[#0D1525] rounded-md font-medium shadow-lg hover:bg-[#00D4FF] transition duration-200 cursor-pointer"
            >
              <FaEnvelope className="mr-2" />
              Contact Us
            </SmoothNavLink>
            
            <a href="https://discord.gg/wAGzpZXexg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md font-medium shadow-lg hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200 cursor-pointer">
              <FaDiscord className="mr-2" />
              Join Discord
            </a>
            
            <a href="https://github.com/softtouch" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-[#00B2FF] text-[#00B2FF] rounded-md font-medium shadow-lg hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200 cursor-pointer">
              <FaGithub className="mr-2" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
