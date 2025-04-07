const endpointUrl: string = import.meta.env.VITE_API_URL + '/endpoints'

export interface ApiType {
  name: string;
  method: string;
  endpoint: string;
  response_type: string;
  sample_response: Record<string, any>;
  part_description: string;
  description: string;
  params?: {
    name: string;
    type: string;
    description: string;
  }[];
  sample_request?: Record<string, string>;
}

async function fetchApis(): Promise<ApiType[]> {
  try {
    const response = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }
    const data: ApiType[] = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching API data:');
    return [];
  }
}

export const apis: Promise<ApiType[]> = fetchApis();