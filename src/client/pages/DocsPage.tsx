import { useState, useEffect, useRef, useCallback } from "react";
import { ApiType, apis } from "../data/apis";
import { Link, useLocation } from "wouter";
import {
  FaBookOpen,
  FaCode,
  FaPlayCircle,
  FaArrowRight,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaInfoCircle,
} from "react-icons/fa";
import { toast } from "../../hooks/use-toast";
import CodeSnippet from "@/components/CodeSnippet";
import Spinner from "@/components/Spinner";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";

export default function DocsPage() {
  const [results, setResults] = useState<Record<string, any>>({});
  const [activeSection, setActiveSection] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    {
      section: string;
      type: "general" | "api";
      title: string;
      id: string;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  // Show all APIs without pagination
  const [apiData, setApiData] = useState<ApiType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch API data
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

  // Function to handle example API requests with optional parameters
  const handleExampleRequest = useCallback(
    async (api: ApiType, params?: Record<string, string>) => {
      try {
        toast({
          title: "Requesting API",
          description: `Sending ${api.method || "GET"} request to ${
            api.name
          }...`,
        });

        let url = api.endpoint;
        const fetchOptions: RequestInit = {
          method: api.method || "GET", // Use the method from api, default to GET
          headers: {
            Accept: "application/json",
          } as Record<string, string>,
        };

        const effectiveParams =
          params && Object.keys(params).length > 0
            ? params
            : api.sample_request;

        // Handle query parameters for GET requests or body for POST/PUT
        if (effectiveParams && Object.keys(effectiveParams).length > 0) {
          if ((fetchOptions.method || "GET").toUpperCase() === "GET") {
            const queryParams = new URLSearchParams();
            Object.entries(effectiveParams).forEach(([key, value]) => {
              if (value) queryParams.append(key, value);
            });
            url = `${url}?${queryParams.toString()}`;
          } else {
            // For POST, PUT, etc., send params as JSON body
            (fetchOptions.headers as Record<string, string>)["Content-Type"] =
              "application/json";
            if (typeof effectiveParams === "string") {
              fetchOptions.body = effectiveParams;
            } else {
              fetchOptions.body = JSON.stringify(effectiveParams);
            }
          }
        } else if (
          api.params?.length &&
          (fetchOptions.method?.toUpperCase() || "GET") === "GET"
        ) {
          // Fallback to default params from api.params if no sample_request
          const queryParams = new URLSearchParams();
          api.params.forEach((param) => {
            if (param.type === "number") {
              if (param.name === "page") queryParams.append(param.name, "1");
              else if (param.name === "pageSize" || param.name === "limit")
                queryParams.append(param.name, "10");
              else if (param.name === "min")
                queryParams.append(param.name, "1");
              else if (param.name === "max")
                queryParams.append(param.name, "100");
            }
          });
          if (queryParams.toString()) {
            url = `${url}?${queryParams.toString()}`;
          }
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! Status: ${response.status} - ${errorText}`
          );
        }

        const data = await response.json();
        setResults(prev => ({
          ...prev,
          [api.name]: data
        }));

        toast({
          title: "Request successful!",
          description: (
            <div className="mt-2">
              <p className="mb-2 font-medium text-green-500">
                Status: {response.status} {response.statusText}
              </p>
              <p className="mb-2 text-xs">
                <span className="font-semibold">URL:</span> {url}
              </p>
              <p className="mb-2 text-xs">
                <span className="font-semibold">Method:</span>{" "}
                {fetchOptions.method}
              </p>
            </div>
          ),
          duration: 8000,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to make request: ${
            error instanceof Error ? error.message : String(error)
          }`,
          variant: "destructive",
          duration: 4000,
        });
        setResults({});
      }
    },
    []
  );

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [location] = useLocation();

  useEffect(() => {
    // Check for hash in URL and scroll to that section
    const hash = window.location.hash.substring(1);
    if (hash) {
      // First, find which page this API is on
      if (!isLoading && apiData.length > 0) {
        const apiIndex = apiData.findIndex((api) => {
          const apiHash = api.name.toLowerCase().replace(/\s+/g, "");
          return apiHash === hash;
        });

        if (apiIndex !== -1 || true) {
          setTimeout(() => {
            scrollToSection(hash);
          }, 100);
        }
      }
    }
  }, [apiData, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find which section is currently visible
      let currentActive = "";
      Object.keys(sectionRefs.current).forEach((id) => {
        const section = sectionRefs.current[id];
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentActive = id;
        }
      });

      if (currentActive !== activeSection) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check for the visible section
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(id);

      section.classList.add("highlight-section");
      setTimeout(() => {
        section.classList.remove("highlight-section");
      }, 1500);
    }
  };

  // Handle search query changes with debouncing
  useEffect(() => {
    // Clear results only if search query is empty
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    // Add longer debounce for better performance and user experience
    const searchTimer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results: {
        section: string;
        type: "general" | "api";
        title: string;
        id: string;
      }[] = [];

      // Search in general sections
      const generalSections = [
        { id: "introduction", title: "Introduction" },
        { id: "free-usage", title: "Free Usage" },
        { id: "error-handling", title: "Error Handling" },
      ];

      generalSections.forEach((section) => {
        if (section.title.toLowerCase().includes(query)) {
          results.push({
            section: section.title,
            type: "general" as const,
            title: section.title,
            id: section.id,
          });
        }
      });

      // Only search in API sections if data is loaded
      if (!isLoading && apiData.length > 0) {
        // Search in API sections
        apiData.forEach((api) => {
          const id = api.name.toLowerCase().replace(/\s+/g, "");

          // Check if API name, description, or endpoint matches the query
          if (
            api.name.toLowerCase().includes(query) ||
            api.description.toLowerCase().includes(query) ||
            api.endpoint.toLowerCase().includes(query)
          ) {
            results.push({
              section: "API",
              type: "api" as const,
              title: api.name,
              id,
            });
          }

          // Check if any parameters match the query
          if (api.params) {
            api.params.forEach((param) => {
              if (
                param.name.toLowerCase().includes(query) ||
                param.description.toLowerCase().includes(query)
              ) {
                // Only add this API once if we haven't already added it
                if (!results.some((r) => r.id === id)) {
                  results.push({
                    section: "API",
                    type: "api" as const,
                    title: `${api.name} (${param.name} parameter)`,
                    id,
                  });
                }
              }
            });
          }
        });
      }

      setSearchResults(results);
    }, 300); // Increased delay for better user experience

    return () => clearTimeout(searchTimer);
  }, [searchQuery, apiData, isLoading]);

  return (
    <section className="animate-fadeIn py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-2 sm:px-3 lg:px-4">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00B2FF]">
            Documentation
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">Everything you need to use our APIs</p>

          {/* Search Component */}
          <div className="max-w-2xl mx-auto mt-4 sm:mt-6">
            <div className="relative">
              <Command className="border border-[#00B2FF]/30 rounded-xl shadow-xl bg-gradient-to-br from-[#1A2332] to-[#131d2c] overflow-hidden transition-all duration-200 w-full">
                <div className="flex items-center border-b border-[#00B2FF]/20 px-2 sm:px-3 py-1.5 sm:py-2 w-full">
                  <FaSearch
                    className="text-[#00B2FF] mr-1.5 sm:mr-2 flex-shrink-0"
                    size={12}
                  />
                  <CommandInput
                    placeholder="Search the docs"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="text-[#D9E1E8] w-full flex-grow bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-[#6B7280] placeholder:text-xs sm:placeholder:text-sm text-xs sm:text-sm"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-[#6B7280] hover:text-[#00B2FF] transition-colors p-1 rounded-full hover:bg-[#0D1525]/50 flex-shrink-0"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Command list - only shown when there are search results */}
                <CommandList className="text-[#D9E1E8] max-h-[250px] sm:max-h-[300px] overflow-auto">
                  {searchQuery &&
                    (searchResults.length > 0 ? (
                      <CommandGroup heading="Search Results" className="px-0">
                        {searchResults.map((result, index) => (
                          <CommandItem
                            key={index}
                            value={result.id}
                            onSelect={() => {
                              scrollToSection(result.id);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 cursor-pointer hover:bg-[#00B2FF]/10 transition-colors duration-150 rounded-md my-0.5"
                          >
                            {result.type === "api" ? (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#00325A] flex items-center justify-center flex-shrink-0 border border-[#00B2FF]/30">
                                <FaCode className="text-[#00B2FF]" size={10} />
                              </div>
                            ) : (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0A3A3A] flex items-center justify-center flex-shrink-0 border border-[#00B2FF]/30">
                                <FaBookOpen className="text-[#00B2FF]" size={10} />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="font-medium text-xs sm:text-sm text-[#00B2FF]">
                                {result.title}
                              </span>
                              <span className="text-xs text-[#6B7280]">
                                {result.type === "api"
                                  ? "API Endpoint"
                                  : "Documentation Section"}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    ) : (
                      <CommandEmpty className="py-4 sm:py-6 text-center">
                        <div className="flex flex-col items-center">
                          <FaSearch
                            className="text-[#00B2FF]/40 mb-1.5 sm:mb-2"
                            size={16}
                          />
                          <p className="text-sm sm:text-base font-medium">
                            No results found for "{searchQuery}"
                          </p>
                          <p className="text-xs text-[#6B7280] mt-1.5">
                            Try using different keywords or check our API
                            catalog
                          </p>
                        </div>
                      </CommandEmpty>
                    ))}
                </CommandList>
              </Command>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6">
          {/* Enhanced Sidebar/Navigation */}
          <div className="lg:w-1/4">
            <div className="bg-gradient-to-b from-[#1A2332] to-[#151e2c] p-2 sm:p-3 rounded-xl shadow-lg sticky top-20 border border-[#00B2FF]/10 max-h-[calc(100vh-90px)] overflow-auto hidden-scrollbar">
              <h3 className="text-base sm:text-lg font-semibold flex items-center mb-3 sm:mb-4 text-[#00B2FF] pb-1.5 sm:pb-2 border-b border-[#00B2FF]/20">
                <FaBookOpen className="mr-1.5 sm:mr-2 text-[#00B2FF]" size={14} />
                API Documentation
              </h3>

              {/* Documentation Sections */}
              <div className="mb-3 sm:mb-4">
                <h4 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-1.5 sm:mb-2 font-medium flex items-center">
                  <FaInfoCircle className="mr-1.5 text-[#00B2FF]/70" size={10} />
                  Getting Started
                </h4>
                <ul className="space-y-0.5 sm:space-y-1 ml-1.5">
                  <li>
                    <div
                      onClick={() => scrollToSection("introduction")}
                      className={`px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center
                        ${
                          activeSection === "introduction"
                            ? "bg-[#00B2FF]/10 text-[#00B2FF] shadow-sm"
                            : "hover:bg-[#0D1525] text-[#D9E1E8]"
                        }`}
                    >
                      <span className="relative flex items-center">
                        <span
                          className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1.5 ${
                            activeSection === "introduction"
                              ? "bg-[#00B2FF]"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        <span className="text-xs sm:text-sm">Introduction</span>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => scrollToSection("free-usage")}
                      className={`px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center
                        ${
                          activeSection === "free-usage"
                            ? "bg-[#00B2FF]/10 text-[#00B2FF] shadow-sm"
                            : "hover:bg-[#0D1525] text-[#D9E1E8]"
                        }`}
                    >
                      <span className="relative flex items-center">
                        <span
                          className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1.5 ${
                            activeSection === "free-usage"
                              ? "bg-[#00B2FF]"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        <span className="text-xs sm:text-sm">Free Usage</span>
                      </span>
                    </div>
                  </li>
                  <li>
                    <div
                      onClick={() => scrollToSection("error-handling")}
                      className={`px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center
                        ${
                          activeSection === "error-handling"
                            ? "bg-[#00B2FF]/10 text-[#00B2FF] shadow-sm"
                            : "hover:bg-[#0D1525] text-[#D9E1E8]"
                        }`}
                    >
                      <span className="relative flex items-center">
                        <span
                          className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1.5 ${
                            activeSection === "error-handling"
                              ? "bg-[#00B2FF]"
                              : "bg-gray-500"
                          }`}
                        ></span>
                        <span className="text-xs sm:text-sm">Error Handling</span>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* API Endpoints Section */}
              <div className="mt-1.5">
                <h4 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2 sm:mb-3 font-medium flex items-center">
                  <FaCode className="mr-1.5 text-[#00B2FF]/70" size={10} />
                  API Endpoints
                  <span className="ml-1.5 bg-[#00B2FF]/10 text-[#00B2FF] px-1 sm:px-1.5 py-0.5 rounded-full text-xs">
                    {isLoading ? "..." : apiData.length}
                  </span>
                </h4>

                {isLoading ? (
                  <div className="flex justify-center p-3 sm:p-4 bg-[#0D1525]/40 rounded-lg">
                    <div className="flex flex-col items-center">
                      <Spinner size="sm" />
                      <span className="text-xs text-gray-400 mt-1.5">
                        Loading APIs...
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="pr-0.5">
                    <div className="space-y-0.5 sm:space-y-1 max-h-[calc(100vh-350px)] pr-1.5">
                      {apiData.map((api) => {
                        const id = api.name.toLowerCase().replace(/\s+/g, "");

                        // Determine method badge color
                        const methodColors = {
                          GET: "bg-green-900/40 text-green-300 border-green-800",
                          POST: "bg-blue-900/40 text-blue-300 border-blue-800",
                          PUT: "bg-amber-900/40 text-amber-300 border-amber-800",
                          DELETE: "bg-red-900/40 text-red-300 border-red-800",
                          PATCH:
                            "bg-purple-900/40 text-purple-300 border-purple-800",
                        };

                        const methodColor =
                          methodColors[
                            api.method as keyof typeof methodColors
                          ] || "bg-gray-900/40 text-gray-300 border-gray-800";

                        return (
                          <div
                            key={id}
                            onClick={() => scrollToSection(id)}
                            className={`px-1.5 sm:px-2 py-1.5 sm:py-2 rounded-lg transition-all duration-200 cursor-pointer
                              ${
                                activeSection === id
                                  ? "bg-[#00B2FF]/10 shadow-sm border border-[#00B2FF]/20"
                                  : "hover:bg-[#0D1525]/70 border border-transparent"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span
                                  className={`mr-1.5 text-xs font-mono px-1 sm:px-1.5 py-0.5 rounded-md border ${methodColor}`}
                                >
                                  {api.method}
                                </span>
                                <span
                                  className={`font-sm text-xs whitespace-nowrap ${
                                    activeSection === id
                                      ? "text-[#00B2FF]"
                                      : "text-[#D9E1E8]"
                                  }`}
                                >
                                  {api.name}
                                </span>
                              </div>
                              <div className="ml-1.5 transform transition-transform duration-200">
                                <FaArrowRight
                                  size={8}
                                  className={`${
                                    activeSection === id
                                      ? "text-[#00B2FF]"
                                      : "text-gray-500"
                                  } 
                                    ${
                                      activeSection === id
                                        ? "translate-x-1"
                                        : ""
                                    }`}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Introduction */}
            <div
              ref={(el) => (sectionRefs.current["introduction"] = el)}
              id="introduction"
              className="bg-[#1A2332] rounded-lg shadow-lg p-3 sm:p-4 mb-4 sm:mb-6"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-[#00B2FF] mb-2 sm:mb-3">
                Introduction
              </h2>
              <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                Welcome to the SoftTouch API documentation. Our APIs are
                designed to be easy to use, reliable, and developer-friendly.
                All of our APIs use REST architecture and return responses in
                JSON format.
              </p>
              <p className="text-xs sm:text-sm">
                Before diving into specific endpoints, please take a moment to
                understand how our free usage works and check out our error
                handling to ensure smooth integration with your applications.
              </p>
            </div>

            {/* Free Usage */}
            <div
              ref={(el) => (sectionRefs.current["free-usage"] = el)}
              id="free-usage"
              className="bg-[#1A2332] rounded-lg shadow-lg p-3 sm:p-4 mb-4 sm:mb-6"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-[#00B2FF] mb-2 sm:mb-3">
                Free Usage
              </h2>
              <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                All SoftTouch APIs are completely free to use for everyone, with
                no rate limits or restrictions. You can integrate our APIs into
                your applications, websites, or tools without worrying about
                authentication or usage limits.
              </p>
              <div className="mb-2 sm:mb-3">
                <h3 className="text-sm sm:text-base font-medium mb-1.5">Simple Integration</h3>
                <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                  Our APIs are designed to be easy to integrate with minimal
                  setup. No signup or API keys are required. Simply make a
                  request to the endpoint, and you'll receive your data in JSON
                  format.
                </p>
                <CodeSnippet
                  language="javascript"
                  code={`fetch('https://api.softtouch.dev/v1/endpoint')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
                  title="Simple API Request"
                />
              </div>
              <div className="mb-2 sm:mb-3">
                <h3 className="text-sm sm:text-base font-medium mb-1.5">No Usage Limits</h3>
                <p className="text-xs sm:text-sm">
                  Unlike many other API providers, we don't impose any rate
                  limits on our APIs. Use them as much as you need for your
                  projects without restrictions.
                </p>
              </div>
            </div>

            {/* Error Handling */}
            <div
              ref={(el) => (sectionRefs.current["error-handling"] = el)}
              id="error-handling"
              className="bg-[#1A2332] rounded-lg shadow-lg p-3 sm:p-4 mb-4 sm:mb-6"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-[#00B2FF] mb-2 sm:mb-3">
                Error Handling
              </h2>
              <p className="text-xs sm:text-sm mb-2 sm:mb-3">
                When an error occurs, our APIs return appropriate HTTP status
                codes along with a JSON response containing details about the
                error:
              </p>
              <CodeSnippet
                language="json"
                code={`{
  "error": {
    "code": "invalid_parameter",
    "message": "The parameter 'max' must be an integer greater than 'min'.",
    "status": 400
  }
}`}
                title="Error Response"
              />
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#0D1525]">
                    <th className="py-1.5 sm:py-2 px-2 sm:px-3">Status Code</th>
                    <th className="py-1.5 sm:py-2 px-2 sm:px-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#0D1525]">
                    <td className="py-1.5 sm:py-2 px-2 sm:px-3">400</td>
                    <td className="py-1.5 sm:py-2 px-2 sm:px-3">
                      Bad Request - Invalid parameters or request
                    </td>
                  </tr>
                  <tr className="border-b border-[#0D1525]">
                    <td className="py-1.5 sm:py-2 px-2 sm:px-3">403</td>
                    <td className="py-1.5 sm:py-2 px-2 sm:px-3">Forbidden - Access denied</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 sm:py-2 px-2 sm:px-3">500</td>
                    <td className="py-1.5 sm:py-2 px-2 sm:px-3">
                      Internal Server Error - Something went wrong on our end
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* API Endpoints */}
            {isLoading ? (
              <div className="bg-[#1A2332] rounded-lg shadow-lg p-6 sm:p-8 mb-4 sm:mb-6 flex justify-center items-center">
                <Spinner size="md" />
              </div>
            ) : (
              apiData.map((api) => {
                const id = api.name.toLowerCase().replace(/\s+/g, "");
                return (
                  <div
                    key={api.name}
                    ref={(el) => (sectionRefs.current[id] = el)}
                    id={id}
                    className={`bg-gradient-to-br from-[#1A2332] to-[#151e2c] rounded-xl shadow-xl overflow-hidden mb-8 sm:mb-10 transition-all duration-300 ${
                      activeSection === id
                        ? "shadow-[0_5px_30px_rgba(0,178,255,0.15)]"
                        : ""
                    }`}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6">
                        <div className="mb-3 sm:mb-4 md:mb-0">
                          <div className="flex items-center">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#00B2FF]/10 border border-[#00B2FF]/20 flex items-center justify-center mr-2 sm:mr-3 shadow-sm">
                              <FaCode className="text-[#00B2FF]" size={16} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#00B2FF] to-[#00D4FF]">
                              {api.name} API
                            </h2>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 mt-1.5 sm:mt-2 md:max-w-lg">
                            {api.part_description}
                          </p>
                        </div>

                        <div className="flex flex-col items-start">
                          {/* Method Badge */}
                          <div
                            className={`
                          px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-mono rounded-lg shadow-sm mb-1.5 sm:mb-2
                          ${
                            api.method === "GET"
                              ? "bg-green-900/30 text-green-300 border border-green-800"
                              : api.method === "POST"
                              ? "bg-blue-900/30 text-blue-300 border border-blue-800"
                              : api.method === "PUT"
                              ? "bg-amber-900/30 text-amber-300 border border-amber-800"
                              : api.method === "DELETE"
                              ? "bg-red-900/30 text-red-300 border border-red-800"
                              : "bg-purple-900/30 text-purple-300 border border-purple-800"
                          }
                        `}
                          >
                            {api.method}
                          </div>

                          {/* Endpoint */}
                          <code className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs rounded-lg bg-[#0D1525] text-[#00D4FF] font-mono border border-[#00B2FF]/10">
                            {api.endpoint}
                          </code>
                        </div>
                      </div>

                      <div className="mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg font-medium mb-1.5 sm:mb-2 flex items-center">
                          <FaCode className="text-[#00B2FF] mr-1.5" size={14} /> Description
                        </h3>
                        <p className="text-xs sm:text-sm">{api.description}</p>
                      </div>

                      {api.params && api.params.length > 0 && (
                        <div className="mb-4 sm:mb-6">
                          <h3 className="text-base sm:text-lg font-medium mb-1.5 sm:mb-2 flex items-center">
                            <FaInfoCircle className="text-[#00B2FF] mr-1.5" size={14} />{" "}
                            Query Parameters
                          </h3>
                          <div className="max-h-[150px] sm:max-h-[180px] overflow-auto custom-scrollbar border border-[#0D1525]/50 rounded-lg bg-[#0D1525]/20">
                            <table className="w-full text-left text-xs">
                              <thead className="sticky top-0 bg-[#0D1525] text-[#00B2FF]">
                                <tr>
                                  <th
                                    className="py-1 sm:py-1.5 px-1.5 sm:px-2 font-medium"
                                    style={{ width: "20%" }}
                                  >
                                    Parameter
                                  </th>
                                  <th
                                    className="py-1 sm:py-1.5 px-1.5 sm:px-2 font-medium"
                                    style={{ width: "15%" }}
                                  >
                                    Type
                                  </th>
                                  <th
                                    className="py-1 sm:py-1.5 px-1.5 sm:px-2 font-medium"
                                    style={{ width: "65%" }}
                                  >
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {api.params.map((param) => (
                                  <tr
                                    key={param.name}
                                    className="border-b border-[#0D1525]/30 hover:bg-[#0D1525]/40 transition-colors"
                                  >
                                    <td className="py-1 px-1.5 sm:px-2 align-top">
                                      <code className="bg-[#0D1525] px-1 sm:px-1.5 py-0.5 rounded-md text-[#00D4FF] text-xs inline-block">
                                        {param.name}
                                      </code>
                                    </td>
                                    <td className="py-1 px-1.5 sm:px-2 text-[#0DE5A2] font-mono text-xs align-top">
                                      {param.type}
                                    </td>
                                    <td className="py-1 px-1.5 sm:px-2 text-gray-300 align-top">
                                      {param.description}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      <div className="mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg font-medium mb-1.5 sm:mb-2 flex items-center">
                          <FaCode className="text-[#00B2FF] mr-1.5" size={14} /> Example
                          Request
                        </h3>
                        <CodeSnippet
                          language="javascript"
                          code={`// Basic request
fetch('https://api.softtouch.dev/v1${api.endpoint}')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

${
  api.params?.some((p) => p.name === "page" || p.name === "pageSize")
    ? `// With pagination parameters
fetch('https://api.softtouch.dev/v1${api.endpoint}?page=1&pageSize=10')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
    : ""
}

${
  api.params?.length
    ? `// With all available parameters
fetch('https://api.softtouch.dev/v1${api.endpoint}?${api.params
        .map((p) => {
          if (p.type === "number") {
            if (p.name === "page") return "page=1";
            else if (p.name === "pageSize") return "pageSize=10";
            else if (p.name === "min") return "min=1";
            else if (p.name === "max") return "max=100";
            else return `${p.name}=10`;
          } else if (p.type === "string") {
            return `${p.name}=example`;
          } else {
            return `${p.name}=true`;
          }
        })
        .join("&")}')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`
    : ""
}`}
                          title="Example API Call"
                        />
                      </div>

                      <div className="mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-lg font-medium mb-1.5 sm:mb-2 flex items-center">
                          <FaCode className="text-[#00B2FF] mr-1.5" size={14} /> Response
                          Format
                        </h3>
                        <div className="flex items-center mb-1.5 sm:mb-2">
                          <span className="text-xs sm:text-sm font-medium mr-1.5">
                            Content-Type:
                          </span>
                          <code className="bg-[#0D1525] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[#00D4FF] text-xs sm:text-sm">
                            application/json
                          </code>
                        </div>
                        <div className="max-h-[250px] sm:max-h-[300px]">
                          <CodeSnippet
                            language="json"
                            code={
                              typeof api.sample_response === "string"
                                ? JSON.stringify(
                                    JSON.parse(api.sample_response),
                                    null,
                                    2
                                  )
                                : JSON.stringify(api.sample_response, null, 2)
                            }
                            title="Response Format"
                          />
                        </div>
                      </div>

                      {/* Test API Section for all APIs */}
                      <div className="mt-3 sm:mt-4 border-t border-gray-700 pt-3 sm:pt-4">
                        <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center">
                          <FaPlayCircle className="text-[#00B2FF] mr-1.5" size={14} /> Test
                          This API
                        </h3>

                        {api.params && api.params.length > 0 ? (
                          <div className="mb-3 sm:mb-4">
                            <div className="bg-gradient-to-r from-[#0D1525] to-[#0D1525]/70 border border-[#0D1525]/90 rounded-lg shadow-inner mb-3 sm:mb-4">
                              <div className="flex items-center p-2 sm:p-3 border-b border-[#00B2FF]/20">
                                <FaInfoCircle
                                  className="text-[#00B2FF] mr-1.5 flex-shrink-0"
                                  size={12}
                                />
                                <h4 className="text-xs sm:text-sm font-medium">
                                  Query Parameters
                                </h4>
                              </div>

                              <div className="p-1.5 sm:p-2 max-h-[180px] sm:max-h-[200px] overflow-y-auto custom-scrollbar">
                                <table className="w-full text-left text-xs border-collapse">
                                  <tbody>
                                    {api.params.map((param, idx) => {
                                      const paramId = `${api.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "")}-param-${
                                        param.name
                                      }`;
                                      return (
                                        <tr
                                          key={idx}
                                          className="border-b border-[#0D1525]/30"
                                        >
                                          <td className="py-1 px-1.5 sm:px-2 align-top w-1/4">
                                            <label
                                              htmlFor={paramId}
                                              className="flex items-center gap-1"
                                            >
                                              <code className="bg-[#0D1525] px-1 sm:px-1.5 py-0.5 rounded text-[#0DE5A2] text-xs inline-block font-mono">
                                                {param.name}
                                              </code>
                                              <span className="text-xs text-gray-400 px-1 py-0.5 bg-[#0D1525] rounded">
                                                {param.type}
                                              </span>
                                            </label>
                                          </td>
                                          <td className="py-1 px-1.5 sm:px-2 align-top w-3/4">
                                            <input
                                              id={paramId}
                                              type={
                                                param.type === "number"
                                                  ? "number"
                                                  : "text"
                                              }
                                              placeholder={param.description}
                                              className="w-full px-1.5 sm:px-2 py-0.5 sm:py-1 bg-[#0D1525] text-[#D9E1E8] rounded border border-[#00B2FF]/20 focus:outline-none focus:ring-1 focus:border-[#00B2FF] focus:ring-[#00D4FF] text-xs"
                                            />
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <button
                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00B2FF] text-[#0D1525] rounded hover:bg-[#00D4FF] transition duration-200 flex items-center text-xs sm:text-sm font-medium"
                                onClick={() => {
                                  // Collect parameters from inputs
                                  const params: Record<string, string> = {};
                                  api.params?.forEach((param) => {
                                    const paramId = `${api.name
                                      .toLowerCase()
                                      .replace(/\s+/g, "")}-param-${
                                      param.name
                                    }`;
                                    const input = document.getElementById(
                                      paramId
                                    ) as HTMLInputElement;
                                    if (input && input.value) {
                                      params[param.name] = input.value;
                                    }
                                  });

                                  // Call API with parameters
                                  handleExampleRequest(api, params);
                                }}
                              >
                                Send with Parameters{" "}
                                <FaPlay className="ml-1.5" size={10} />
                              </button>

                              <button
                                className="px-2 sm:px-3 py-1 sm:py-1.5 bg-[#1A2332] text-[#00B2FF] rounded hover:bg-[#00B2FF]/10 transition duration-200 flex items-center text-xs sm:text-sm border border-[#00B2FF]/30"
                                onClick={() => handleExampleRequest(api)}
                              >
                                Send Default
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex">
                            <button
                              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00B2FF] text-[#0D1525] rounded hover:bg-[#00D4FF] transition duration-200 flex items-center text-xs sm:text-sm"
                              onClick={() => handleExampleRequest(api)}
                            >
                              Send Request <FaPlay className="ml-1.5" size={10} />
                            </button>
                          </div>
                        )}

                        {/* Results display for all APIs */}
                        <div className="mt-3 sm:mt-4 bg-gradient-to-r from-[#0D1525] to-[#0D1525]/70 border border-[#0D1525]/90 rounded-lg shadow-inner">
                          <div className="flex items-center p-2 sm:p-3 border-b border-[#00B2FF]/20">
                            <FaArrowRight
                              className="text-[#00B2FF] mr-1.5 flex-shrink-0"
                              size={12}
                            />
                            <h4 className="text-xs sm:text-sm font-medium">
                              Response Result
                            </h4>
                          </div>
                          <div className="p-2 sm:p-3">
                            <CodeSnippet
                              language="json"
                              code={
                                results[api.name]
                                  ? (() => {
                                      try {
                                        return typeof results[api.name] === "string"
                                          ? JSON.stringify(
                                              JSON.parse(results[api.name]),
                                              null,
                                              2
                                            )
                                          : JSON.stringify(results[api.name], null, 2);
                                      } catch (e) {
                                        return "// Invalid JSON response";
                                      }
                                    })()
                                  : "// Send a request to see the response here"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
