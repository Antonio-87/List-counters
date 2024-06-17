export interface shemaMeter {
  count?: number;
  address?: string;
  id: string;
  _type: string[];
  installation_date: string;
  is_automatic: boolean;
  area: { id: string };
  initial_values: number[];
  description: string;
}

export interface MeterAdress {
  str_number_full: string;
  house: {
    address: string;
  };
}

const fetchMeters = async (
  limit?: number,
  offset?: number
): Promise<{ meters: shemaMeter[]; count: number | null }> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL_METERS}${
        limit ? `?limit=${limit}` : ''
      }${offset ? `&offset=${offset}` : ''}`
    );
    const data = await response.json();
    const count = data.count;
    const meters: shemaMeter[] = data.results;
    return { meters, count };
  } catch (error) {
    console.error('Error fetching meters', error);
    return { meters: [], count: null };
  }
};

const fetchAddress = async (addressId: string): Promise<MeterAdress> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL_AREAS}${addressId}`
    );
    const data = await response.json();
    const address: MeterAdress = data;
    return address;
  } catch (error) {
    console.error('Error fetching addreses', error);
    throw new Error('Failed to fetch address');
  }
};

const fetchDeleteMeter = async (meterId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL_METERS}${meterId}`,
      { method: 'DELETE' }
    );
    if (response.ok) {
      console.log(`Meter ${meterId} has been deleted`);
    }
  } catch (error) {
    console.error('Error fetching delete meter', error);
  }
};

export { fetchMeters, fetchAddress, fetchDeleteMeter };
