import qs from 'query-string';

const perform = async (url: string, data: object, config: object) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/${url}`, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

const getCounters = async (path: string, searchParams = {}) => {
  return await perform(`${path}/?${qs.stringify(searchParams)}`, {}, {});
};

const getAdress = async (path: string, searchParams = {}) => {
  return await perform(`${path}/?${qs.stringify(searchParams)}`, {}, {});
};

const deleteCounter = async (path: string, metersId: number) => {
  return await perform(`${path}/${metersId}`, {}, { method: 'DELETE' });
};
export { getCounters, getAdress, deleteCounter };
