import { Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FaBolt, FaLock, FaCode, FaGlobe, FaRocket, FaUserFriends,
  FaArrowRight, FaDatabase, FaCloud, FaShieldAlt, FaTools,
  FaClock, FaChartLine, FaServer, FaLightbulb, FaCogs, FaBook,
  FaLaptopCode, FaVideo, FaStar, FaCheck
} from "react-icons/fa";

import { apis, ApiType } from "../data/apis";
import { features } from "../data/features";

import Spinner from "@/components/Spinner";
import TabPanel from "@/components/TabPanel";
import CodeSnippet from "@/components/CodeSnippet";

export default function HomePage() {
  const [apiData, setApiData] = useState<ApiType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeDeveloperTool, setActiveDeveloperTool] = useState(0);
  const [activeCodeTab, setActiveCodeTab] = useState('javascript');

  // Refs for scroll behavior
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const apisRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const documentationRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Get API data
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setIsLoading(true);
        const data = await apis;
        setApiData(data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiData();
  }, []);

  // Cycle through feature highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Display 3 most recent APIs
  const latestApis = apiData.slice(0, 3);

  // Tool tabs content
  const toolTabs = [
    {
      id: 'playground',
      label: 'API Playground',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">API Playground</h3>
            <p className="text-gray-400 mb-4">Test our Language Detection API in real-time with a simple, browser-based interface. No setup required, accessible to all developers.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">Instant API testing</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">No authentication needed</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">Clear response preview</span>
              </li>
            </ul>
            <Link href="/tools/playground" className="inline-flex items-center text-primary hover:text-primary-light">
              Try the Playground <FaArrowRight className="ml-2 text-xs" />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <div className="code-window w-full max-w-lg shadow-2xl rounded-lg overflow-hidden">
              <div className="code-header bg-[#1A2332] p-2.5 flex justify-between items-center">
                <div className="flex">
                  <div className="code-dot bg-red-500 w-3 h-3 rounded-full mr-1.5"></div>
                  <div className="code-dot bg-yellow-500 w-3 h-3 rounded-full mr-1.5"></div>
                  <div className="code-dot bg-green-500 w-3 h-3 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-400">playground.js</div>
              </div>
              <div className="p-4 text-sm font-mono text-gray-300 overflow-x-auto bg-[#0D1525]">
                <pre className="language-javascript">
                  {`// Detect language using Fetch API
  async function detectLanguage(text) {
    try {
      const response = await fetch('https://softtouch.onrender.com/api/v1/translate/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Detected language:', data);
      return data;
    } catch (error) {
      console.error('Error detecting language:', error);
    }
  }
  
  // Example usage
  detectLanguage('Hello, world!');
  `}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'docs',
      label: 'Documentation Hub',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Documentation Hub</h3>
            <p className="text-gray-400 mb-4">Access clear, comprehensive guides and tutorials to get started with our APIs, contributed by our team and community.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">Step-by-step tutorials</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">Community-contributed examples</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">Regularly updated guides</span>
              </li>
            </ul>
            <Link href="/docs" className="inline-flex items-center text-primary hover:text-primary-light">
              Explore Documentation <FaArrowRight className="ml-2 text-xs" />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-[#1A2332] to-[#0D1525] p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                  <span className="text-gray-300 text-sm">Language Detection API</span>
                  <span className="text-xs text-gray-400">v1.0</span>
                </div>
                <div className="flex-1 bg-[#0D1525] rounded-md p-3 font-mono text-xs text-gray-300 overflow-auto">
                  {`# Language Detection API
  Detects the language of provided text with high accuracy.
  
  ## Endpoint
  POST https://softtouch.onrender.com/api/v1/translate/detect
  
  ## Parameters
  - **text** (string): The text to analyze.
  
  ## Example Request
  {
    "text": "Hello, world!"
  }
  
  ## Example Response
  {
    "language": "en",
    "confidence": 0.99
  }`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'forum',
      label: 'Community Forum',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-primary">Community Forum</h3>
            <p className="text-gray-400 mb-4">Join our vibrant developer community to share ideas, ask questions, and collaborate on projects.</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">Active discussion threads</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">Expert Q&A sessions</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center mt-1">
                  <FaCheck className="text-green-500 text-xs" />
                </div>
                <span className="ml-2 text-gray-300">Open-source project showcases</span>
              </li>
            </ul>
            <Link href="/community/forum" className="inline-flex items-center text-primary hover:text-primary-light">
              Join the Community <FaArrowRight className="ml-2 text-xs" />
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-[#1A2332] to-[#0D1525] p-4 flex flex-col">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                  <span className="text-gray-300 text-sm">Community Forum</span>
                  <span className="text-xs text-gray-400">Recent Posts</span>
                </div>
                <div className="flex-1 bg-[#0D1525] rounded-md p-3 text-sm text-gray-300 overflow-auto space-y-3">
                  <div className="border-b border-gray-700 pb-2">
                    <div className="text-gray-200 font-semibold">How to integrate Language Detection API?</div>
                    <div className="text-xs text-gray-400">Posted by JaneDoe • 2h ago</div>
                  </div>
                  <div className="border-b border-gray-700 pb-2">
                    <div className="text-gray-200 font-semibold">Tips for optimizing API calls</div>
                    <div className="text-xs text-gray-400">Posted by DevGuru • 1d ago</div>
                  </div>
                  <div>
                    <div className="text-gray-200 font-semibold">Join our open-source project!</div>
                    <div className="text-xs text-gray-400">Posted by CodeMaster • 3d ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Code examples by language
  const codeExamples = {
    javascript: `// Detect language using Fetch API
async function detectLanguage(text) {
  try {
    const response = await fetch('https://softtouch.onrender.com/api/v1/translate/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Detected language:', data);
    return data;
  } catch (error) {
    console.error('Error detecting language:', error);
  }
}

// Example usage
detectLanguage('Hello, world!');
`,
    python: `# Detect language using requests
import requests

def detect_language(text):
    try:
        response = requests.post(
            'https://softtouch.onrender.com/api/v1/translate/detect',
            headers={'Content-Type': 'application/json'},
            json={'text': text}
        )
        response.raise_for_status()  # Raises an HTTPError for bad responses
        data = response.json()
        print('Detected language:', data)
        return data
    except requests.RequestException as error:
        print('Error detecting language:', error)

# Example usage
detect_language('Hello, world!')
`,
    ruby: `# Detect language using Net::HTTP
require 'net/http'
require 'json'

def detect_language(text)
  uri = URI('https://softtouch.onrender.com/api/v1/translate/detect')
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true

  request = Net::HTTP::Post.new(uri.path, 'Content-Type' => 'application/json')
  request.body = { text: text }.to_json

  begin
    response = http.request(request)
    if response.is_a?(Net::HTTPSuccess)
      data = JSON.parse(response.body)
      puts "Detected language: #{data}"
      return data
    else
      puts "Error detecting language: #{response.code} #{response.message}"
    end
  rescue StandardError => error
    puts "Error detecting language: #{error}"
  end
end

# Example usage
detect_language('Hello, world!')
`,
    php: `<?php
// Detect language using cURL
function detectLanguage($text) {
    $url = 'https://softtouch.onrender.com/api/v1/translate/detect';
    $data = json_encode(['text' => $text]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

    $response = curl_exec($ch);
    if ($response === false) {
        echo 'Error detecting language: ' . curl_error($ch);
        curl_close($ch);
        return;
    }

    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 300) {
        $data = json_decode($response, true);
        echo 'Detected language: ' . json_encode($data);
        return $data;
    } else {
        echo 'Error detecting language: HTTP ' . $httpCode;
    }
}

// Example usage
detectLanguage('Hello, world!');
?>
`
  };

  // Documentation cards
  const documentationCards = [
    {
      icon: FaBook,
      title: "Getting Started",
      description: "Everything you need to begin integrating with our APIs.",
      link: "/docs"
    },
    {
      icon: FaCode,
      title: "API Reference",
      description: "Complete API documentation with examples and use cases.",
      link: "/docs"
    },
    {
      icon: FaLaptopCode,
      title: "Tutorials",
      description: "Step-by-step guides for implementing common features.",
      link: "/docs"
    },
    {
      icon: FaVideo,
      title: "Video Guides",
      description: "Visual walkthroughs of our platform and features.",
      link: "/join"
    }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>

      <section className="py-12 md:py-20 lg:py-24 relative overflow-hidden" id="hero" ref={heroRef}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Blobs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#00B2FF]/10 to-[#00D4FF]/10 blur-3xl -top-64 -left-64"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-l from-[#00B2FF]/10 to-[#00D4FF]/10 blur-3xl -bottom-64 -right-64"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />

          {/* Floating Particles */}
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-[#00BFFF]/20 blur-3xl top-1/4 left-1/3"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-[#00B2FF]/20 blur-3xl bottom-1/4 right-1/3"
            animate={{
              y: [20, -20, 20],
              x: [10, -10, 10]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          />

          {/* Small Floating Elements */}
          <motion.div
            className="absolute top-1/4 right-[15%] w-12 h-12 bg-[#00B2FF]/30 rounded-full blur-xl"
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-1/3 left-[10%] w-16 h-16 bg-[#00D4FF]/20 rounded-full blur-md"
            animate={{ y: [15, -15, 15] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
          <motion.div
            className="absolute top-1/3 left-1/4 w-3 h-8 bg-[#00B2FF]/40 rounded-full blur-sm"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-[#00B2FF]/30 rounded-full blur-md"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
          />

          {/* Grid Pattern */}
          <motion.div
            style={{ y: backgroundY }}
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYTM2OGIiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16 md:mb-24 relative"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="relative z-10">
              <motion.div
                variants={fadeInUp}
                className="inline-block p-2 px-4 rounded-full bg-[#00B2FF]/10 text-[#00B2FF] mb-6 text-sm font-medium border border-[#00B2FF]/20"
              >
                <span className="bg-gradient-to-r from-[#00B2FF] to-[#00D4FF] text-[#0D1525] px-2 py-0.5 rounded-full font-bold mr-2">100% FREE</span>
                New APIs Released! <Link href="/apis" className="underline ml-1">Check them out</Link>
              </motion.div>

              <motion.h1
                variants={fadeInLeft}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00B2FF] to-[#00D4FF]">SoftTouch</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl md:text-2xl mb-4 max-w-3xl mx-auto opacity-90 text-[#D9E1E8]"
              >
                Empower your applications with our enterprise-grade APIs.
                Build faster, scale better, and innovate without limits.
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="text-lg mb-8 max-w-3xl mx-auto text-[#00D4FF] font-medium"
              >
                All our APIs are 100% free. No hidden fees, no rate limits, no credit card required.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <motion.div variants={fadeInUp}>
                  <Link href="/apis">
                    <span className="w-full sm:w-auto inline-block px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#00B2FF] bg-[#00B2FF] text-[#0D1525] rounded-md text-base sm:text-lg font-medium shadow-lg shadow-[#00B2FF]/20 hover:bg-transparent hover:text-[#00B2FF] transition-all duration-300 transform hover:scale-105">
                      Get Started
                    </span>
                  </Link>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Link href="/docs">
                    <span className="w-full sm:w-auto inline-block px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#00B2FF] text-[#00B2FF] rounded-md text-base sm:text-lg font-medium shadow-lg hover:bg-[#00B2FF] hover:text-[#0D1525] transition-all duration-300 transform hover:scale-105">
                      View Documentation
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* API Platform Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16 md:mb-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-[#1A2332] to-[#121929] rounded-xl p-6 border border-[#00B2FF]/20 shadow-lg"
              >
                <div className="p-3 bg-[#00B2FF]/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <FaRocket className="text-[#00B2FF] text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#00D4FF] mb-3">Accessible Development</h3>
                <p className="text-gray-300 mb-4">
                  Build your applications without financial barriers. Our free APIs and intuitive tools empower developers of all levels to create innovative solutions effortlessly.
                </p>
                <ul className="space-y-2">
                  {['No-cost API access', 'Beginner-friendly SDKs', 'Comprehensive guides'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-400">
                      <div className="w-5 h-5 rounded-full bg-[#00B2FF]/10 flex items-center justify-center mr-2">
                        <FaCheck className="text-[#00B2FF] text-xs" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-gradient-to-br from-[#1A2332] to-[#121929] rounded-xl p-6 border border-[#00B2FF]/20 shadow-lg"
              >
                <div className="p-3 bg-[#00B2FF]/10 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-[#00B2FF] text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-[#00D4FF] mb-3">Community-Driven Growth</h3>
                <p className="text-gray-300 mb-4">
                  Join a vibrant network of developers to share knowledge, collaborate, and grow. Our platform fosters a supportive environment to help you succeed.
                </p>
                <ul className="space-y-2">
                  {['Active developer forums', 'Collaborative tutorials', 'Community events'].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-400">
                      <div className="w-5 h-5 rounded-full bg-[#00B2FF]/10 flex items-center justify-center mr-2">
                        <FaCheck className="text-[#00B2FF] text-xs" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Code examples preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-8 bg-[#0D1525] rounded-xl overflow-hidden border border-gray-800 shadow-xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-400 font-mono">softtouch-api-example.js</div>
              </div>
              <div className="p-4">
                <pre className="font-mono text-sm text-[#00D4FF] overflow-x-auto">
                  {`// Initialize the SoftTouch SDK
const softtouch = new SoftTouch({
  apiKey: 'YOUR_API_KEY',
  environment: 'production'
});

// Use the Data API to fetch records
async function fetchUserData() {
  try {
    const response = await softtouch.data.query({
      collection: 'users',
      where: { active: true },
      limit: 10
    });
    
    console.log(\`Found \${response.count} active users\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}`}
                </pre>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-16 md:mb-24"
          >
            {[
              { icon: FaServer, value: "99.9%", label: "Uptime" },
              { icon: FaChartLine, value: "50M+", label: "API Calls" },
              { icon: FaUserFriends, value: "10K+", label: "Developers" },
              { icon: FaGlobe, value: "150+", label: "Countries" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="bg-[#1A2332]/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg text-center transform transition-all duration-300 border border-gray-800 hover:border-[#00B2FF]/30"
              >
                <stat.icon className="text-[#00B2FF] text-2xl sm:text-3xl mx-auto mb-2 sm:mb-3" />
                <div className="text-xl sm:text-2xl font-bold text-[#00B2FF] mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="mb-20 md:mb-32"
            id="features"
            ref={featuresRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="text-center mb-12 md:mb-16" variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#00B2FF]">Why Choose SoftTouch?</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                Our platform offers everything developers need to build, deploy, and scale applications with ease.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={staggerContainer}
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#1A2332]/80 backdrop-blur-sm p-6 md:p-8 rounded-lg transform transition-all duration-500 hover:bg-[#1A2332] border border-gray-800 hover:border-[#00B2FF]/30 group"
                >
                  <div className="feature-icon bg-[#00B2FF]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform duration-500 group-hover:transform group-hover:translate-y-[-8px] group-hover:rotate-[8deg]">
                    <feature.icon className="text-[#00B2FF] text-xl" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[#00B2FF]">{feature.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Interactive Tools Showcase */}
          <motion.div
            className="mb-20 md:mb-32"
            id="tools"
            ref={toolsRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div className="text-center mb-12" variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#00B2FF]">Powerful Developer Tools</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                Our integrated suite of developer tools helps you work faster and more efficiently.
              </p>
            </motion.div>

            {/* Feature Tabs */}
            <motion.div
              variants={fadeIn}
              className="bg-[#1A2332]/50 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-800"
            >
              <TabPanel
                tabs={[
                  { id: 'playground', label: 'API Playground' },
                  { id: 'docs', label: 'Documentation Hub' },
                  { id: 'forum', label: 'Community Forum' }
                ]}
                activeTab={activeDeveloperTool}
                setActiveTab={setActiveDeveloperTool}
                content={toolTabs[activeDeveloperTool].content}
              />
            </motion.div>
          </motion.div>

          {/* Latest APIs Section */}
          <motion.div
            className="mb-20 md:mb-32"
            id="apis"
            ref={apisRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row justify-between items-center mb-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-[#00B2FF] mb-4 sm:mb-0">Latest APIs</h2>
              <Link href="/apis">
                <span className="inline-flex items-center text-[#00B2FF] hover:text-[#00D4FF] transition-colors group">
                  View all APIs <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            </motion.div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#1A2332]/80 backdrop-blur-sm rounded-lg p-6 h-[200px] flex items-center justify-center">
                    <Spinner size="md" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {latestApis.map((api) => (
                  <motion.div
                    key={api.name}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="api-card"
                  >
                    <Link href={`/docs#${api.name.toLowerCase()}`}>
                      <div className="bg-[#1A2332]/80 backdrop-blur-sm p-6 rounded-lg border border-gray-800 hover:border-[#00B2FF]/30 transition-all duration-300 group cursor-pointer h-full">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-semibold text-[#00B2FF] group-hover:text-[#00D4FF]">{api.name}</h3>
                          <span className={`px-3 py-1 text-xs rounded-full ${api.method === 'GET'
                            ? 'bg-green-900/50 text-green-300 border border-green-700'
                            : 'bg-blue-900/50 text-blue-300 border border-blue-700'
                            }`}>{api.method}</span>
                        </div>
                        <p className="text-gray-400 mb-4">{api.description || api.part_description}</p>
                        <code className="block bg-[#0D1525] p-3 rounded text-[#00D4FF] text-sm font-mono overflow-x-auto hidden-scrollbar">
                          {api.endpoint}
                        </code>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Code examples section */}
            <motion.div
              variants={fadeInUp}
              className="mt-16"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-[#00B2FF] mb-6">Quick Implementation</h3>

              <div className="bg-[#1A2332] rounded-lg overflow-hidden">
                <div className="flex border-b border-gray-800 overflow-x-auto">
                  {['javascript', 'python', 'ruby', 'php'].map((lang) => (
                    <button
                      key={lang}
                      className={`px-4 py-2 whitespace-nowrap ${activeCodeTab === lang
                        ? 'text-[#00B2FF] border-b-2 border-[#00B2FF] font-medium'
                        : 'text-gray-400 hover:text-gray-200'
                        }`}
                      onClick={() => setActiveCodeTab(lang)}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="p-6 text-sm font-mono text-gray-300 overflow-x-auto hidden-scrollbar">
                  <CodeSnippet code={codeExamples[activeCodeTab as keyof typeof codeExamples]} language={activeCodeTab} />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Advanced Use Cases */}
          <motion.div
            className="mb-20 md:mb-32"
            id="usecases"
            ref={testimonialsRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#00B2FF]">Explore SoftTouch's Potential</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                Discover how SoftTouch’s free and reliable APIs empower developers to build innovative, accessible, and community-driven applications.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Accessible App Development",
                  description: "Create applications that reach everyone, using our free APIs to build inclusive solutions without cost barriers, from prototypes to production.",
                  icon: FaGlobe,
                  color: "from-blue-500/20 to-cyan-500/20"
                },
                {
                  title: "Reliable Service Integration",
                  description: "Integrate dependable APIs with 99.9% uptime to power your applications, ensuring consistent performance for users worldwide.",
                  icon: FaServer,
                  color: "from-green-500/20 to-emerald-500/20"
                },
                {
                  title: "Community-Powered Innovation",
                  description: "Collaborate with our developer community to share ideas, build open-source projects, and create solutions that inspire and grow together.",
                  icon: FaUserFriends,
                  color: "from-purple-500/20 to-pink-500/20"
                }
              ].map((useCase, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="p-6 rounded-xl bg-gradient-to-br border border-gray-800 h-full flex flex-col"
                  style={{
                    background: `linear-gradient(135deg, #1A2332 0%, #121929 100%)`,
                    boxShadow: `0 0 40px 5px rgba(0, 178, 255, 0.05)`
                  }}
                >
                  <div className={`w-14 h-14 rounded-full bg-[#00B2FF]/10 flex items-center justify-center mb-6`}>
                    <useCase.icon className="text-[#00B2FF] text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-gray-300 flex-grow">{useCase.description}</p>
                  <Link href={`/join`}>
                    <span className="mt-4 inline-flex items-center text-[#00B2FF] hover:text-[#00D4FF] transition-colors group">
                      Learn more <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>

          {/* Integration Ecosystem */}
          <motion.div
            className="mb-20 md:mb-32"
            id="integrations"
            ref={pricingRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#00B2FF]">Integration Ecosystem</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                Connect with your existing tools and services without friction
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-[#1A2332]/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[
                  "AWS", "Google Cloud", "Azure", "Stripe", "Twilio", "Salesforce",
                  "Slack", "GitHub", "Jira", "Shopify", "HubSpot", "MongoDB"
                ].map((integration, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#0D1525]/80 rounded-lg p-4 aspect-square flex flex-col items-center justify-center border border-gray-800 hover:border-[#00B2FF]/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#00B2FF]/10 rounded-full flex items-center justify-center mb-3">
                      <FaCode className="text-[#00B2FF]" />
                    </div>
                    <span className="text-gray-300 font-medium text-center">{integration}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>


          {/* Documentation Section */}
          <motion.div
            className="mb-20 md:mb-32"
            id="documentation"
            ref={documentationRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#00B2FF]">Comprehensive Documentation</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto">
                Get started quickly with our detailed guides, tutorials, and reference materials.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {documentationCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#1A2332]/80 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-[#00B2FF]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#00B2FF]/10 flex items-center justify-center mb-4">
                    <card.icon className="text-[#00B2FF] text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-200">{card.title}</h3>
                  <p className="text-gray-400 mb-4">{card.description}</p>
                  <Link href={card.link} className="text-[#00B2FF] hover:text-[#00D4FF] inline-flex items-center">
                    Read Guide <FaArrowRight className="ml-1 text-xs" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            className="text-center bg-[#1A2332]/80 backdrop-blur-sm p-8 sm:p-12 rounded-xl border border-gray-800 relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute w-[400px] h-[400px] rounded-full bg-[#00B2FF]/5 blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>

            <div className="relative z-10">
              <motion.h2
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#00B2FF]"
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-gray-300"
              >
                Join thousands of developers building amazing applications with SoftTouch APIs.
              </motion.p>
              <motion.div
                variants={staggerContainer}
                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <motion.div variants={fadeInUp}>
                  <Link href="#documentation">
                    <span className="w-full sm:w-auto inline-block px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#00B2FF] text-[#00B2FF] rounded-md text-base sm:text-lg font-medium hover:bg-[#00B2FF] hover:text-[#0D1525] transition-all duration-300 transform hover:scale-105">
                      Read Documentation
                    </span>
                  </Link>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Link href="#apis">
                    <span className="w-full sm:w-auto inline-block px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#00B2FF] bg-[#00B2FF] text-[#0D1525] rounded-md text-base sm:text-lg font-medium hover:bg-transparent hover:text-[#00B2FF] transition-all duration-300 transform hover:scale-105">
                      Start Building
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}