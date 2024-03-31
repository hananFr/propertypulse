'use client';
import { useEffect, useState } from 'react'
import { toats } from 'react-toastify';
import PropertyCard from '@/components/PropertyCard';
import Spinner from '@/components/Spinner';
import Pagination from './Pagination';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [PageSize, setPageSize] = useState(3);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`/api/properties?page=${page}&pageSize=${PageSize}`);

        if (res.ok) {
          const data = await res.json();
          data.properties.sort((a, b) => a.createdAt - b.createdAt);
          setProperties(data.properties);
          setTotalItem(data.total);
        }
      } catch (error) {
        console.log(error)
        toats.error('Faild to fetch!')
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page]);

  if (loading) return <Spinner />
  return (<>
    <section className='px-4 py-6'>
      <div className="container-xl lg:container m-auto px-4 py-6">
        {(!properties.length) ? <p>No properties found</p>
          :
          (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map(property => <PropertyCard key={property._id} property={property} />)}
          </div>)
        }
      </div>
    </section>
    <Pagination
    page={page}
    setPage={setPage}
    pageSize={PageSize}
    totalItems={totalItem}
    />
  </>
  )
}

export default Properties