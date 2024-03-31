'use client';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import Message from '@/components/Message';

const Messages = () => {
  const [messages, setmessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');

        if(res.ok){
          const data = await res.json();
          setmessages(data);
        }
      } catch (error) {
        console.log('Error fetching message: ', error);
      } finally{
        setLoading(false);
      }
    }
    getMessages();
  },[])
  if(loading) return <Spinner/>;

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {!messages.length ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <Message key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Messages