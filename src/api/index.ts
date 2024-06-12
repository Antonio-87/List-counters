interface Meter {
  id: string;
  _type: string[];
  installation_date: string;
  is_automatic: boolean;
  area: { id: string };
  initial_values: number[];
  description: string;
}

interface MeterAdress {
  id: string;
  str_number_full: string;
  house: {
    address: string;
  };
}

const fetchMeters = async (
  limit: number,
  offset: number
): Promise<{ meters: Meter[] }> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL_METERS}?${limit}&${offset}`
    );
    const data = await response.json();
    const meters: Meter[] = data.results;
    return { meters };
  } catch (error) {
    console.error('Error fetching meters', error);
    return { meters: [] };
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
