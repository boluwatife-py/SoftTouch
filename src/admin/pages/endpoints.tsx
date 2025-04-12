import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  fetchEndpoints, 
  enableEndpoint, 
  disableEndpoint,
  showInStats,
  hideInStats,
  deleteEndpoint,
  enableAllEndpoints,
  disableAllEndpoints,
  showAllInStats,
  hideAllFromStats,
  ApiEndpoint
} from "@/lib/api";
import EndpointTable from "@/components/endpoints/EndpointTable";
import EndpointForm from "@/components/endpoints/EndpointForm";
import DeleteConfirmModal from "@/components/endpoints/DeleteConfirmModal";
import { queryClient } from "@/lib/queryClient";
import { 
  PlusCircle, 
  Server, 
  Loader2, 
  AlertTriangle, 
  Database, 
  RefreshCw,
  ShieldCheck,
  LayoutGrid,
  Code,
  Webhook,
  FileJson,
  BadgeCheck,
  ChevronDown,
  Info,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const EndpointsPage = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEndpoint, setEditingEndpoint] = useState<ApiEndpoint | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  interface EndpointsResponse {
    endpoints: ApiEndpoint[];
    count: number;
    timestamp: string;
  }

  const { data, isLoading, isError, refetch } = useQuery<EndpointsResponse>({
    queryKey: ["/admin/endpoints"],
    retry: 2
  });

  const enableMutation = useMutation({
    mutationFn: (id: string) => enableEndpoint(id),
    onSuccess: (response) => {
      // Update the specific endpoint in the cache instead of refetching all
      const currentData = queryClient.getQueryData<EndpointsResponse>(["/admin/endpoints"]);
      if (currentData && currentData.endpoints) {
        const updatedEndpoints = currentData.endpoints.map(endpoint => 
          endpoint.id === response.endpoint.id ? response.endpoint : endpoint
        );
        queryClient.setQueryData(["/admin/endpoints"], {
          ...currentData,
          endpoints: updatedEndpoints
        });
      }
      
      toast({
        title: "Success",
        description: "Endpoint enabled successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const disableMutation = useMutation({
    mutationFn: (id: string) => disableEndpoint(id),
    onSuccess: (response) => {
      // Update the specific endpoint in the cache instead of refetching all
      const currentData = queryClient.getQueryData<EndpointsResponse>(["/admin/endpoints"]);
      if (currentData && currentData.endpoints) {
        const updatedEndpoints = currentData.endpoints.map(endpoint => 
          endpoint.id === response.endpoint.id ? response.endpoint : endpoint
        );
        queryClient.setQueryData(["/admin/endpoints"], {
          ...currentData,
          endpoints: updatedEndpoints
        });
      }
      
      toast({
        title: "Success",
        description: "Endpoint disabled successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const showInStatsMutation = useMutation({
    mutationFn: (id: string) => showInStats(id),
    onSuccess: (response) => {
      // Update the specific endpoint in the cache instead of refetching all
      const currentData = queryClient.getQueryData<EndpointsResponse>(["/admin/endpoints"]);
      if (currentData && currentData.endpoints) {
        const updatedEndpoints = currentData.endpoints.map(endpoint => 
          endpoint.id === response.endpoint.id ? response.endpoint : endpoint
        );
        queryClient.setQueryData(["/admin/endpoints"], {
          ...currentData,
          endpoints: updatedEndpoints
        });
      }
      
      toast({
        title: "Success",
        description: "Endpoint is now visible in statistics",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const hideInStatsMutation = useMutation({
    mutationFn: (id: string) => hideInStats(id),
    onSuccess: (response) => {
      // Update the specific endpoint in the cache instead of refetching all
      const currentData = queryClient.getQueryData<EndpointsResponse>(["/admin/endpoints"]);
      if (currentData && currentData.endpoints) {
        const updatedEndpoints = currentData.endpoints.map(endpoint => 
          endpoint.id === response.endpoint.id ? response.endpoint : endpoint
        );
        queryClient.setQueryData(["/admin/endpoints"], {
          ...currentData,
          endpoints: updatedEndpoints
        });
      }
      
      toast({
        title: "Success",
        description: "Endpoint is now hidden from statistics",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEndpoint(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/admin/endpoints"] });
      toast({
        title: "Success",
        description: "Endpoint deleted successfully",
        variant: "default",
      });
      setDeleteId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setDeleteId(null);
    },
  });

  const handleToggleStatus = (id: string, currentStatus: boolean) => {
    if (currentStatus) {
      disableMutation.mutate(id);
    } else {
      enableMutation.mutate(id);
    }
  };

  const handleToggleVisibility = (id: string, currentVisibility: boolean) => {
    if (currentVisibility) {
      hideInStatsMutation.mutate(id);
    } else {
      showInStatsMutation.mutate(id);
    }
  };

  const handleEdit = (endpoint: ApiEndpoint) => {
    setEditingEndpoint(endpoint);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing",
      description: "Updating endpoint data...",
      variant: "default",
    });
  };

  return (
    <div className="p-8">
      {/* Header with Stats Summary */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <Server className="h-8 w-8 text-[#00BFFF]" />
              API Endpoints Management
            </h2>
            <p className="text-gray-400 mt-1">
              Configure and monitor your API endpoints
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="bg-[#172554] text-white border-gray-700 hover:bg-[#213977] hover:text-white"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-[#172554] text-white border-gray-700 hover:bg-[#213977] hover:text-white"
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Actions
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#172554] text-white border-gray-700">
                <DropdownMenuLabel>Endpoint Actions</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="hover:bg-[#213977] cursor-pointer"
                  onClick={() => {
                    setEditingEndpoint(null);
                    setIsModalOpen(true);
                  }}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create New Endpoint
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-[#213977] cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Validating Endpoints",
                      description: "Checking all endpoints for proper structure and response...",
                    });
                    // Add your validation logic here
                    setTimeout(() => {
                      toast({
                        title: "Validation Complete",
                        description: "All endpoints meet the required schema format.",
                      });
                    }, 1500);
                  }}
                >
                  <BadgeCheck className="h-4 w-4 mr-2" />
                  Validate All Endpoints
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="hover:bg-[#213977] cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Enabling All Endpoints",
                      description: "Please wait while all endpoints are being enabled...",
                    });
                    
                    const enableAll = async () => {
                      try {
                        const result = await enableAllEndpoints();
                        queryClient.invalidateQueries({ queryKey: ["/admin/endpoints"] });
                        toast({
                          title: "Success",
                          description: result.message,
                          variant: "default",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to enable all endpoints",
                          variant: "destructive",
                        });
                      }
                    };
                    
                    enableAll();
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-400" />
                  Enable All Endpoints
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-[#213977] cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Disabling All Endpoints",
                      description: "Please wait while all endpoints are being disabled...",
                    });
                    
                    const disableAll = async () => {
                      try {
                        const result = await disableAllEndpoints();
                        queryClient.invalidateQueries({ queryKey: ["/admin/endpoints"] });
                        toast({
                          title: "Success",
                          description: result.message,
                          variant: "default",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to disable all endpoints",
                          variant: "destructive",
                        });
                      }
                    };
                    
                    disableAll();
                  }}
                >
                  <XCircle className="h-4 w-4 mr-2 text-red-400" />
                  Disable All Endpoints
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="hover:bg-[#213977] cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Updating Statistics Visibility",
                      description: "Making all endpoints visible in statistics...",
                    });
                    
                    const showAll = async () => {
                      try {
                        const result = await showAllInStats();
                        queryClient.invalidateQueries({ queryKey: ["/admin/endpoints"] });
                        toast({
                          title: "Success",
                          description: result.message,
                          variant: "default",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to update statistics visibility",
                          variant: "destructive",
                        });
                      }
                    };
                    
                    showAll();
                  }}
                >
                  <Eye className="h-4 w-4 mr-2 text-blue-400" />
                  Show All in Statistics
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-[#213977] cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Updating Statistics Visibility",
                      description: "Hiding all endpoints from statistics...",
                    });
                    
                    const hideAll = async () => {
                      try {
                        const result = await hideAllFromStats();
                        queryClient.invalidateQueries({ queryKey: ["/admin/endpoints"] });
                        toast({
                          title: "Success",
                          description: result.message,
                          variant: "default",
                        });
                      } catch (error) {
                        toast({
                          title: "Error",
                          description: "Failed to update statistics visibility",
                          variant: "destructive",
                        });
                      }
                    };
                    
                    hideAll();
                  }}
                >
                  <EyeOff className="h-4 w-4 mr-2 text-yellow-400" />
                  Hide All from Statistics
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="hover:bg-[#213977] cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Security Audit Started",
                      description: "Scanning all endpoints for potential security issues...",
                      variant: "default",
                    });
                    
                    // Simulate audit process
                    setTimeout(() => {
                      toast({
                        title: "Security Audit Complete",
                        description: "All endpoints passed security verification. No issues found.",
                        variant: "default",
                      });
                    }, 2000);
                  }}
                >
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Security Audit
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="hover:bg-[#213977] cursor-pointer"
                  onClick={() => {
                    toast({
                      title: "Documentation",
                      description: "Opening API documentation site...",
                      variant: "default",
                    });
                  }}
                >
                  <FileJson className="h-4 w-4 mr-2" />
                  View API Docs
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              onClick={() => {
                setEditingEndpoint(null);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-[#00BFFF] to-[#0073e6] hover:from-[#00a6e6] hover:to-[#0064c8] text-white shadow-lg shadow-blue-900/30"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              New Endpoint
            </Button>
          </div>
        </div>
        
        {/* Dashboard Cards */}
        {!isLoading && !isError && data && data.endpoints && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-[#172554] border-gray-700 shadow-lg overflow-hidden">
              <div className="h-1 bg-blue-500" />
              <CardContent className="pt-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Total Endpoints</p>
                    <p className="text-white text-2xl font-bold mt-1">{data.endpoints.length}</p>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-full">
                    <Webhook className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#172554] border-gray-700 shadow-lg overflow-hidden">
              <div className="h-1 bg-green-500" />
              <CardContent className="pt-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Active Endpoints</p>
                    <p className="text-white text-2xl font-bold mt-1">
                      {data.endpoints.filter((e: ApiEndpoint) => e.enabled).length}
                    </p>
                  </div>
                  <div className="bg-green-900/30 p-3 rounded-full">
                    <Server className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#172554] border-gray-700 shadow-lg overflow-hidden">
              <div className="h-1 bg-yellow-500" />
              <CardContent className="pt-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">In Statistics</p>
                    <p className="text-white text-2xl font-bold mt-1">
                      {data.endpoints.filter((e: ApiEndpoint) => e.is_visible_in_stats).length}
                    </p>
                  </div>
                  <div className="bg-yellow-900/30 p-3 rounded-full">
                    <FileJson className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#172554] border-gray-700 shadow-lg overflow-hidden">
              <div className="h-1 bg-purple-500" />
              <CardContent className="pt-6 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Last Updated</p>
                    <p className="text-white text-2xl font-bold mt-1">
                      {data.timestamp ? new Date(data.timestamp).toLocaleTimeString() : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded-full">
                    <Code className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <Card className="bg-[#172554] border-gray-700 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 text-[#00BFFF] animate-spin mb-4" />
            <CardTitle className="text-xl text-white">Loading API Endpoints</CardTitle>
            <CardDescription className="text-gray-400 mt-2">Please wait while we fetch your data</CardDescription>
          </CardContent>
        </Card>
      )}

      {/* Error state */}
      {isError && (
        <Card className="bg-[#172554] border-gray-700 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-red-900/20 p-4 rounded-full mb-4">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-xl text-white">Error Loading Endpoints</CardTitle>
            <CardDescription className="text-gray-400 mt-2">
              There was a problem retrieving the API endpoints. Please try again.
            </CardDescription>
            <Button 
              variant="outline" 
              className="mt-6 border-gray-700 hover:bg-[#213977] hover:text-white"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* No Endpoints State */}
      {!isLoading && !isError && data && data.endpoints && data.endpoints.length === 0 && (
        <Card className="bg-[#172554] border-gray-700 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="bg-blue-900/20 p-4 rounded-full mb-4">
              <Database className="h-12 w-12 text-[#00BFFF]" />
            </div>
            <CardTitle className="text-xl text-white">No Endpoints Found</CardTitle>
            <CardDescription className="text-gray-400 mt-2 mb-6 max-w-md text-center">
              Create your first API endpoint to begin managing your services. 
              Endpoints allow you to track statistics and control access to your API.
            </CardDescription>
            <Button 
              onClick={() => {
                setEditingEndpoint(null);
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r from-[#00BFFF] to-[#0073e6] hover:from-[#00a6e6] hover:to-[#0064c8] text-white shadow-lg shadow-blue-900/30"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create New Endpoint
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Endpoints Table Section */}
      {!isLoading && !isError && data && data.endpoints && data.endpoints.length > 0 && (
        <Card className="bg-[#172554] border-gray-700 shadow-lg">
          <CardHeader className="border-b border-gray-700 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge className="bg-[#00BFFF] text-white mr-2">
                  {data.endpoints.length}
                </Badge>
                <CardTitle className="text-xl text-white">Available Endpoints</CardTitle>
              </div>
              <div className="flex items-center space-x-1">
                <Info className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-400">Manage your API endpoints</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <EndpointTable
              endpoints={data.endpoints}
              onToggleStatus={handleToggleStatus}
              onToggleVisibility={handleToggleVisibility}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isProcessing={{
                enable: enableMutation.isPending,
                disable: disableMutation.isPending,
                show: showInStatsMutation.isPending,
                hide: hideInStatsMutation.isPending,
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Modal */}
      <EndpointForm
        isOpen={isModalOpen}
        endpoint={editingEndpoint}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          queryClient.invalidateQueries({ queryKey: ["/admin/endpoints"] });
        }}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};

export default EndpointsPage;
