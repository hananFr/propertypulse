'use client';
import { useState, useEffect } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import Map,{ Marker} from 'react-map-gl';
import { setDefaults, fromAddress } from "react-geocode";
import Spinner from "./Spinner";
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';

const PropertyMap = ({property}) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: 1000,
    heigt:500
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY, 
    language: "en",
    region: "es"
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try{
      const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);
      if(!res.results.length) {
        throw new Error('Geocode error');
      }
      const {lat, lng} = res.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
      setViewPort({
        ...viewport,
        latitude:lat,
        longitude:lng
      });}catch(error){ 
        console.log(error)
        setGeocodeError(true);
      }
      setLoading(false);
    }
    fetchCoords();
  }, [])

  if(loading) return <Spinner loading={loading}/>
  if(geocodeError) return <div className="text-xl">No location data found</div>
  return (
    <Map mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    mapLib={import('mapbox-gl')}
    initialViewState={{
      latitude:lat,
      longitude:lng,
      zoom: 15
    }}
    style={{width:'100%', height:500}}
    mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Marker longitude={lng} latitude={lat} anchor='bottom'>
          <Image src={pin} alt='location' width={40} height={40}/>
        </Marker>
      </Map>
  )
}

export default PropertyMap