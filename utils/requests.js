const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties({showFeatured = false} = {}) {
  try {
    if (!apiDomain) return [];

    const res = await fetch(`${apiDomain}/properties${(showFeatured) ? '/featured/pageSize=2' : ''}`, { cache: 'no-store'});

    if (!res.ok) {
      throw new Error('Faild to fetch data');
    }

    return res.json();

  } catch (error) {
    console.log(error);
  }
};

export async function fetchProperty(id) {
  try {
    if (!apiDomain) return [];

    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error('Faild to fetch data');
    }

    return res.json();

  } catch (error) {
    console.log(error);
  }
}