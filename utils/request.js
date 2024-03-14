const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
  try {
    if (!apiDomain) return [];

    const res = await fetch(`${apiDomain}/properties`, {
      method: 'GET',
      body: ''
    });

    if (!res.ok) {
      throw new Error('Faild to fetch data');
    }
    // const data = await res.json();
    // console.log(data);
    return res.json();

  } catch (error) {
    console.log(error);
  }
}