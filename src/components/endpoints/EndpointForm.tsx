import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ApiEndpoint, ApiParam, createEndpoint, updateEndpoint } from "@/lib/api";

interface EndpointFormProps {
  isOpen: boolean;
  endpoint: ApiEndpoint | null;
  onClose: () => void;
  onSuccess: () => void;
}

type FormValues = {
  name: string;
  method: string;
  endpoint: string;
  response_type: string;
  part_description: string;
  description: string;
  enabled: boolean;
  is_visible_in_stats: boolean;
  sample_request: string;
  sample_response: string;
};

const EndpointForm = ({ isOpen, endpoint, onClose, onSuccess }: EndpointFormProps) => {
  const { toast } = useToast();
  const [params, setParams] = useState<ApiParam[]>([]);
  const isEditing = !!endpoint;

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: '',
      method: 'GET',
      endpoint: '',
      response_type: 'JSON',
      part_description: '',
      description: '',
      enabled: true,
      is_visible_in_stats: true,
      sample_request: '',
      sample_response: ''
    }
  });

  useEffect(() => {
    if (endpoint) {
      setValue('name', endpoint.name);
      setValue('method', endpoint.method);
      setValue('endpoint', endpoint.endpoint);
      setValue('response_type', endpoint.response_type);
      setValue('part_description', endpoint.part_description);
      setValue('description', endpoint.description);
      setValue('enabled', endpoint.enabled);
      setValue('is_visible_in_stats', endpoint.is_visible_in_stats);
      setValue('sample_request', endpoint.sample_request || '');
      setValue('sample_response', endpoint.sample_response || '');
      setParams(endpoint.params || []);
    } else {
      reset();
      setParams([{ name: '', type: 'string', description: '' }]);
    }
  }, [endpoint, setValue, reset]);

  const createMutation = useMutation({
    mutationFn: (data: Omit<ApiEndpoint, "id">) => createEndpoint(data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Endpoint created successfully",
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ApiEndpoint }) => updateEndpoint(id, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Endpoint updated successfully",
      });
      onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addParam = () => {
    setParams([...params, { name: '', type: 'string', description: '' }]);
  };

  const removeParam = (index: number) => {
    if (params.length > 1) {
      setParams(params.filter((_, i) => i !== index));
    }
  };

  const updateParam = (index: number, field: keyof ApiParam, value: string) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    setParams(newParams);
  };

  const validateAndFormatJSON = (input: string): string => {
    if (!input.trim()) return '';
    try {
      const parsed = JSON.parse(input);
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: `Invalid JSON in ${input.includes('sample_request') ? 'Sample Request' : 'Sample Response'}: ${(error as Error).message}`,
        variant: "destructive",
      });
      throw new Error("Invalid JSON");
    }
  };

  const onSubmit = (data: FormValues) => {
    const filteredParams = params.filter(p => p.name.trim() !== '');

    try {
      const formattedRequest = validateAndFormatJSON(data.sample_request);
      const formattedResponse = validateAndFormatJSON(data.sample_response);

      const endpointData = {
        ...data,
        params: filteredParams,
        sample_request: formattedRequest,
        sample_response: formattedResponse
      };

      if (isEditing && endpoint) {
        updateMutation.mutate({ id: endpoint.id, data: { ...endpointData, id: endpoint.id } as ApiEndpoint });
      } else {
        createMutation.mutate(endpointData as Omit<ApiEndpoint, "id">);
      }
    } catch (error) {
      return;
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#1B263B] text-white max-h-[80vh] flex flex-col">
        <DialogHeader className="pt-6">
          <DialogTitle className="text-xl font-medium text-white">
            {isEditing ? 'Edit Endpoint' : 'Create New Endpoint'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="name" className="text-[#D3D3D3]">Name</Label>
                <Input
                  id="name"
                  className="w-full bg-[#0A1533] text-white border-gray-700"
                  placeholder="API name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="method" className="text-[#D3D3D3]">Method</Label>
                <Select
                  defaultValue={watch('method')}
                  onValueChange={value => setValue('method', value)}
                >
                  <SelectTrigger className="w-full bg-[#0A1533] text-white border-gray-700">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A1533] text-white border-gray-700">
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="endpoint" className="text-[#D3D3D3]">Endpoint</Label>
              <Input
                id="endpoint"
                className="w-full bg-[#0A1533] text-white border-gray-700"
                placeholder="API path"
                {...register('endpoint', { required: 'Endpoint path is required' })}
              />
              {errors.endpoint && <p className="text-red-500 text-sm mt-1">{errors.endpoint.message}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="response_type" className="text-[#D3D3D3]">Response Type</Label>
              <Select
                defaultValue={watch('response_type')}
                onValueChange={value => setValue('response_type', value)}
              >
                <SelectTrigger className="w-full bg-[#0A1533] text-white border-gray-700">
                  <SelectValue placeholder="Select response type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0A1533] text-white border-gray-700">
                  <SelectItem value="JSON">JSON</SelectItem>
                  <SelectItem value="XML">XML</SelectItem>
                  <SelectItem value="TEXT">TEXT</SelectItem>
                  <SelectItem value="HTML">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="part_description" className="text-[#D3D3D3]">Part Description</Label>
              <Input
                id="part_description"
                className="w-full bg-[#0A1533] text-white border-gray-700"
                placeholder="Short description"
                {...register('part_description', { required: 'Part description is required' })}
              />
              {errors.part_description && <p className="text-red-500 text-sm mt-1">{errors.part_description.message}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="description" className="text-[#D3D3D3]">Description</Label>
              <Textarea
                id="description"
                rows={3}
                className="w-full bg-[#0A1533] text-white border-gray-700"
                placeholder="Description"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>
            <div className="mb-4">
              <Label htmlFor="sample_request" className="text-[#D3D3D3]">Sample Request (JSON)</Label>
              <Textarea
                id="sample_request"
                rows={4}
                className="w-full bg-[#0A1533] text-white border-gray-700 font-mono text-sm whitespace-pre"
                placeholder='Sample Request'
                {...register('sample_request')}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="sample_response" className="text-[#D3D3D3]">Sample Response (JSON)</Label>
              <Textarea
                id="sample_response"
                rows={4}
                className="w-full bg-[#0A1533] text-white border-gray-700 font-mono text-sm whitespace-pre"
                placeholder='Sample Response'
                {...register('sample_response')}
              />
            </div>
            <div className="mb-4">
              <Label className="text-[#D3D3D3] block mb-2">Parameters</Label>
              <div className="space-y-2">
                {params.map((param, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start">
                    <div className="md:col-span-4">
                      <Input
                        value={param.name}
                        onChange={(e) => updateParam(index, 'name', e.target.value)}
                        className="w-full bg-[#0A1533] text-white border-gray-700"
                        placeholder="Name"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <Input
                        value={param.type}
                        onChange={(e) => updateParam(index, 'name', e.target.value)}
                        className="w-full bg-[#0A1533] text-white border-gray-700"
                        placeholder="Type"
                      />
                    </div>
                    <div className="md:col-span-4">
                      <Input
                        value={param.description}
                        onChange={(e) => updateParam(index, 'description', e.target.value)}
                        className="w-full bg-[#0A1533] text-white border-gray-700"
                        placeholder="Description"
                      />
                    </div>
                    <div className="md:col-span-1">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeParam(index)}
                        disabled={params.length === 1}
                        className="w-full bg-red-900 hover:bg-red-800 text-white border border-red-700"
                      >
                        <i className="fas fa-minus"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                type="button"
                onClick={addParam}
                variant="outline"
                size="sm"
                className="mt-2 bg-gray-700 hover:bg-gray-600 text-white"
              >
                <i className="fas fa-plus mr-1"></i> Add Parameter
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="text-[#D3D3D3] block mb-2">Enabled</Label>
                <RadioGroup
                  value={watch('enabled').toString()}
                  onValueChange={value => setValue('enabled', value === 'true')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="true"
                      id="enabled-true"
                      className="border-2 border-[#00BFFF] text-[#00BFFF] focus:ring-[#00BFFF] w-5 h-5"
                    />
                    <Label
                      htmlFor="enabled-true"
                      className="text-white font-medium cursor-pointer"
                    >
                      On
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="false"
                      id="enabled-false"
                      className="border-2 border-gray-500 text-[#00BFFF] focus:ring-[#00BFFF] w-5 h-5"
                    />
                    <Label
                      htmlFor="enabled-false"
                      className="text-white font-medium cursor-pointer"
                    >
                      Off
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label className="text-[#D3D3D3] block mb-2">Visible in Stats</Label>
                <RadioGroup
                  value={watch('is_visible_in_stats').toString()}
                  onValueChange={value => setValue('is_visible_in_stats', value === 'true')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="true"
                      id="stats-true"
                      className="border-2 border-[#00BFFF] text-[#00BFFF] focus:ring-[#00BFFF] w-5 h-5"
                    />
                    <Label
                      htmlFor="stats-true"
                      className="text-white font-medium cursor-pointer"
                    >
                      On
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="false"
                      id="stats-false"
                      className="border-2 border-gray-500 text-[#00BFFF] focus:ring-[#00BFFF] w-5 h-5"
                    />
                    <Label
                      htmlFor="stats-false"
                      className="text-white font-medium cursor-pointer"
                    >
                      Off
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="bg-gray-700 hover:bg-gray-600 text-white"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#00BFFF] hover:bg-[#00A3D6] text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 mr-2 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save mr-2"></i> Save Endpoint
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EndpointForm;