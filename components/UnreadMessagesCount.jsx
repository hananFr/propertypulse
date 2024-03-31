'use client';
import {toast} from 'react-toastify';
import { useEffect, useState } from "react";
import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessagesCount = () => {
  const {unreadCount, setUnreadCount} = useGlobalContext();

  useEffect(() => {
    const getUnreadMessagesCount = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');
        if (res.ok) {
          const {count}  = await res.json();
          setUnreadCount(count);
        }
      } catch (error) {
        console.log(error);
        toast.error('Somethig went wrong');
      }
    }
    getUnreadMessagesCount();
  },[]);

  if(!unreadCount) return null;
  
  return (
    <span className='absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
      {unreadCount}
    </span>
  )
}

export default UnreadMessagesCount