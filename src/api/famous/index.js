const baseURL = 'http://localhost:5000/api/v1/';

export const getAllFamous = async () => {
  const response = await fetch(`${baseURL}/famous`);
  const data = await response.json();
  return data;
}