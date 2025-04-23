import { Link } from "wouter";
import { apis, ApiType } from "../data/apis";
import { useState, useEffect, useCallback } from "react";
import {
  FaCode,
  FaServer,
  FaCheck,
  FaClock,
  FaArrowRight,
  FaGithub,
  FaSearch,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
} from "react-icons/fa";
import SmoothNavLink from "@/components/SmoothNavLink";
import Spinner from "@/components/Spinner";
import { toast } from "@/hooks/use-toast";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";

export default function ApiPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState<ApiType[]>([]);
  const [filteredApis, setFilteredApis] = useState<ApiType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch API data
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        setIsLoading(true);
        const data = await apis;
        setApiData(data);
        setFilteredApis(data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiData();
  }, []);

  // No pagination, show all APIs

  // Function to handle example API requests with optional parameters
  const handleExampleRequest = useCallback(
    async (api: ApiType, e?: React.MouseEvent | Record<string, string>) => {
      // If e is a MouseEvent, prevent default and stop propagation
      if (
        e &&
        typeof e === "object" &&
        "stopPropagation" in e &&
        typeof e.stopPropagation === "function"
      ) {
        e.stopPropagation();
        e = undefined; // Clear e so it's not used as params
      }

      try {
        // Show loading toast
        toast({
          title: "Requesting API",
          description: `Sending request to ${api.name}...`,
        });

        // Construct URL with any provided parameters
        let url = api.endpoint;
        const params = e as Record<string, string> | undefined;

        if (params && Object.keys(params).length > 0) {
          const queryParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
          });
          url = `${url}?${queryParams.toString()}`;
        } else if (api.params?.length) {
          // Add default parameters if API has parameters but none were provided
          const queryParams = new URLSearchParams();
          api.params.forEach((param) => {
            // Add some reasonable defaults based on param type
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

        // Make the API request
        const response = await fetch(url);
        const data = await response.json();

        // Show success toast with response
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
              <div className="bg-[#0D1525] p-3 rounded text-xs font-mono overflow-hidden text-[#00D4FF]">
                {JSON.stringify(data, null, 2)}
              </div>
            </div>
          ),
          duration: 8000,
        });
      } catch (error) {
        // Show error toast
        toast({
          title: "Error",
          description: `Failed to make request: ${
            error instanceof Error ? error.message : String(error)
          }`,
          variant: "destructive",
          duration: 4000,
        });
      }
    },
    []
  );

  // No pagination functions needed

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredApis(apiData);
    } else {
      const query = searchQuery.toLowerCase();
      const results = apiData.filter(
        (api) =>
          api.name.toLowerCase().includes(query) ||
          api.description.toLowerCase().includes(query) ||
          api.endpoint.toLowerCase().includes(query)
      );
      setFilteredApis(results);
    }
  }, [searchQuery, apiData]);

  return (
    <section className="animate-fadeIn py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#00B2FF]">
            SoftTouch API Hub
          </h1>
          <p className="mt-2 text-base sm:text-lg md:text-xl mb-6 sm:mb-8">
            Free APIs for Professional Applications
          </p>

          {/* Search Component */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="relative">
              <Command className="border border-[#00B2FF]/30 rounded-xl shadow-xl bg-gradient-to-br from-[#1A2332] to-[#131d2c] overflow-hidden transition-all duration-200">
                <div className="flex w-full items-center border-b border-[#00B2FF]/20 px-3 sm:px-4 py-2 sm:py-3">
                  <FaSearch className="text-[#00B2FF] mr-2 sm:mr-3" size={14} />
                  <CommandInput
                    placeholder="Search our free API's"
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    className="text-[#D9E1E8] w-full bg-transparent border-none focus:ring-0 focus:outline-none placeholder:text-[#6B7280] placeholder:text-xs sm:placeholder:text-sm text-sm sm:text-base"
                    autoComplete="off"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-[#6B7280] hover:text-[#00B2FF] transition-colors p-1 rounded-full hover:bg-[#0D1525]/50"
                    >
                      ×
                    </button>
                  )}
                </div>

                <CommandList className="text-[#D9E1E8] max-h-[300px] sm:max-h-[350px] overflow-auto">
                  {searchQuery && filteredApis.length === 0 && (
                    <CommandEmpty className="py-6 sm:py-8 text-center">
                      <div className="flex flex-col items-center">
                        <FaSearch
                          className="text-[#00B2FF]/40 mb-2 sm:mb-3"
                          size={20}
                        />
                        <p className="text-base sm:text-lg font-medium">
                          No APIs found matching "{searchQuery}"
                        </p>
                        <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
                          Try using different keywords or check our API catalog
                        </p>
                      </div>
                    </CommandEmpty>
                  )}
                </CommandList>
              </Command>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
          <div className="bg-[#1A2332] p-3 sm:p-4 rounded-lg shadow-md text-center">
            <div className="text-[#00B2FF] text-lg sm:text-xl mb-1 sm:mb-2">
              <FaServer />
            </div>
            {isLoading ? (
              <div className="flex justify-center">
                <Spinner size="sm" />
              </div>
            ) : (
              <p className="text-lg sm:text-xl font-bold">{apiData.length}</p>
            )}
            <p className="text-xs sm:text-sm text-gray-400">Available APIs</p>
          </div>
          <div className="bg-[#1A2332] p-3 sm:p-4 rounded-lg shadow-md text-center">
            <div className="text-[#00B2FF] text-lg sm:text-xl mb-1 sm:mb-2">
              <FaCheck />
            </div>
            <p className="text-lg sm:text-xl font-bold">99.9%</p>
            <p className="text-xs sm:text-sm text-gray-400">Uptime</p>
          </div>
          <div className="bg-[#1A2332] p-3 sm:p-4 rounded-lg shadow-md text-center">
            <div className="text-[#00B2FF] text-lg sm:text-xl mb-1 sm:mb-2">
              <FaClock />
            </div>
            <p className="text-lg sm:text-xl font-bold">~50ms</p>
            <p className="text-xs sm:text-sm text-gray-400">Average Response</p>
          </div>
          <div className="bg-[#1A2332] p-3 sm:p-4 rounded-lg shadow-md text-center">
            <div className="text-[#00B2FF] text-lg sm:text-xl mb-1 sm:mb-2">
              <FaGithub />
            </div>
            <p className="text-lg sm:text-xl font-bold">Open Source</p>
            <p className="text-xs sm:text-sm text-gray-400">MIT License</p>
          </div>
        </div>

        {/* Loading State or API List */}
        {isLoading ? (
          <div className="bg-[#1A2332] rounded-lg shadow-lg p-12 sm:p-20 mb-6 sm:mb-8 flex justify-center items-center">
            <Spinner size="lg" />
          </div>
        ) : filteredApis.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {filteredApis.map((api, index) => (
              <div
                key={api.name}
                className="bg-[#1A2332] rounded-lg shadow-lg overflow-hidden border border-[#1A2332] hover:border-[#00B2FF] hover:shadow-[0_0_15px_rgba(0,178,255,0.15)] transition-all duration-300 animate-slideIn cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  const hash = api.name.toLowerCase().replace(/\s+/g, "");
                }}
              >
                <div className="p-4 sm:p-6">
                  <div className="md:flex md:justify-between md:items-start">
                    {/* API Info */}
                    <div className="md:w-1/2 mb-4 sm:mb-6 md:mb-0 md:pr-4 sm:md:pr-6">
                      <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-[#00B2FF]">
                          {api.name}
                        </h3>
                        <span
                          className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full ${
                            api.method === "GET"
                              ? "bg-green-900/50 text-green-300 border border-green-700"
                              : api.method === "POST"
                              ? "bg-blue-900/50 text-blue-300 border border-blue-700"
                              : "bg-purple-900/50 text-purple-300 border border-purple-700"
                          }`}
                        >
                          {api.method}
                        </span>
                      </div>

                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-[#D9E1E8]/90">
                          {api.part_description}
                        </p>
                      </div>

                      <div className="mb-3 sm:mb-4 flex flex-wrap gap-2 items-center">
                        <span className="text-xs sm:text-sm text-gray-400">Response:</span>
                        <span className="inline-block bg-[#0D1525]/80 border border-[#1A2332] text-[#00B2FF] px-2 py-0.5 sm:py-1 rounded-md text-xs">
                          {api.response_type}
                        </span>
                      </div>

                      <div className="mb-3 sm:mb-4">
                        <h4 className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                          Endpoint:
                        </h4>
                        <div className="group relative">
                          <code className="block bg-[#0D1525] p-2 sm:p-3 rounded-md text-[#00D4FF] overflow-hidden text-xs sm:text-sm font-mono border border-[#1A2332]">
                            {api.endpoint}
                          </code>
                          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              className="bg-[#1A2332] p-1 rounded-md hover:bg-[#00B2FF]/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(api.endpoint);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 sm:h-4 sm:w-4 text-[#00B2FF]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {api.params && api.params.length > 0 && (
                        <div className="mb-3 sm:mb-4">
                          <h4 className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                            Parameters:
                          </h4>
                          <div className="bg-[#0D1525] rounded-md border border-[#1A2332] overflow-hidden">
                            <table className="min-w-full text-xs sm:text-sm">
                              <thead>
                                <tr className="bg-[#0D1525]/50 border-b border-[#1A2332]">
                                  <th className="px-2 sm:px-3 py-1 sm:py-2 text-left text-xs text-gray-400">
                                    Name
                                  </th>
                                  <th className="px-2 sm:px-3 py-1 sm:py-2 text-left text-xs text-gray-400">
                                    Type
                                  </th>
                                  <th className="px-2 sm:px-3 py-1 sm:py-2 text-left text-xs text-gray-400">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {api.params.map((param, idx) => (
                                  <tr
                                    key={idx}
                                    className="border-b border-[#1A2332] last:border-b-0"
                                  >
                                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-[#00B2FF] font-mono">
                                      {param.name}
                                    </td>
                                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-green-400 font-mono">
                                      {param.type}
                                    </td>
                                    <td className="px-2 sm:px-3 py-1 sm:py-2 text-[#D9E1E8]/80">
                                      {param.description}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Sample Response */}
                    <div className="md:w-1/2">
                      <h4 className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                        Sample Response:
                      </h4>
                      <div className="relative">
                        <pre className="bg-[#0D1525] p-2 sm:p-4 rounded-md overflow-auto text-xs text-[#D9E1E8] max-h-48 sm:max-h-60 border border-[#1A2332] font-mono custom-scrollbar">
                          {typeof api.sample_response === "string"
                            ? JSON.stringify(
                                JSON.parse(api.sample_response),
                                null,
                                2
                              )
                            : JSON.stringify(api.sample_response, null, 2)}
                        </pre>
                        <div className="absolute top-1 sm:top-2 right-2 sm:right-3">
                          <button
                            className="bg-[#1A2332] p-1 rounded-md hover:bg-[#00B2FF]/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(
                                JSON.stringify(api.sample_response, null, 2)
                              );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 sm:h-4 sm:w-4 text-[#00B2FF]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#0D1525] flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <span className="text-xs sm:text-sm text-gray-400">
                      Completely free • No rate limits • No API key required
                    </span>
                    <div className="flex gap-2 sm:gap-3">
                      <SmoothNavLink
                        to="/docs"
                        hash={api.name.toLowerCase().replace(/\s+/g, "")}
                      >
                        <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00B2FF] text-[#0D1525] rounded hover:bg-[#00D4FF] transition duration-200 cursor-pointer text-xs sm:text-sm font-medium">
                          View Documentation & Test{" "}
                          <FaArrowRight className="ml-1 sm:ml-2" />
                        </span>
                      </SmoothNavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* No pagination */}
          </div>
        ) : (
          <div className="bg-[#1A2332] rounded-lg shadow-lg p-8 sm:p-16 mb-6 sm:mb-8 flex flex-col items-center justify-center">
            <FaSearch className="text-[#00B2FF]/40 mb-3 sm:mb-5" size={32} />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">No APIs found</h3>
            <p className="text-xs sm:text-sm text-gray-400 text-center max-w-md mb-3 sm:mb-4">
              We couldn't find any APIs matching your search criteria. Try
              adjusting your search terms or browse our complete catalog.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#00B2FF] text-[#0D1525] rounded-md hover:bg-[#00D4FF] transition duration-200 text-xs sm:text-sm"
            >
              View all APIs
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6">Ready to start building with our APIs?</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Link
              to="/docs"
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 border border-[#00B2FF] bg-transparent text-[#00B2FF] rounded-md text-sm sm:text-base md:text-lg font-medium hover:bg-[#00B2FF] hover:text-[#0D1525] transition duration-200 cursor-pointer"
            >
              Read Documentation
            </Link>
            <Link
              to="/join"
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 border border-[#00B2FF] bg-[#00B2FF] text-[#0D1525] rounded-md text-sm sm:text-base md:text-lg font-medium hover:bg-transparent hover:text-[#00B2FF] transition duration-200 cursor-pointer"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
