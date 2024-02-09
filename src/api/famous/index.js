const baseURL = 'http://localhost:5100/api/v1';

export const getAllFamous = async () => {
  const response = await fetch(`${baseURL}/famous`);
  const data = await response.json();
  return data;
};

export const createFamous = async(famous) => {
  const response = await fetch(`${baseURL}/famous`, { body: JSON.stringify(famous), method: 'POST', headers: {
    'Content-Type': 'application/json'
  }
});
  const data = await response.json();
  return data;
};
