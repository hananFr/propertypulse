import { useGlobalContext } from '@/context/GlobalContext';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const { read } = await res.json();
        setIsRead(read)
        if (read) {
          toast.success('Marked as read');
          setUnreadCount(prev => prev - 1)
        } else {
          toast.success('Marked as new');
          setUnreadCount(prev => prev + 1)
        }
      };
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    };
  };

  const handleDeleteClick = async () => {
    try {
      console.log(message._id);
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setIsDeleted(true);
        if(!message.read) setUnreadCount((prevCount) => prevCount - 1);
        toast.success('Message Deleted');
      }
    } catch (error) {
      console.log(error);
      toast.error('Message was not deleted');
    }
  };

  if (isDeleted) return null;

  return (
    <div
      className="relative bg-white p-4 rounded-md shadow-md border border-gray-200"
    >
      {!isRead && (<div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounde-md'>
        New
      </div>)}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">
        {message.body}
      </p>

      <ul className="mt-4">
        <li><strong>Name: </strong> {message.sender.username}</li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500"
          >{message.email}</a
          >
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500"
          >{message.phone}</a
          >
        </li>
        <li><strong>Received: </strong>{new Date(message.createdAt).toLocaleDateString()}</li>
      </ul>
      <button
        onClick={handleReadClick}
        className={`mt-4 mr-3 ${!isRead ? 'bg-blue-500 text-white' : 'bg-gray-500'}  py-1 px-3 rounded-md`}
      >
        {!isRead ? ' Mark As Read' : 'Mark As New'}
      </button>
      <button onClick={handleDeleteClick} className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
        Delete
      </button>
    </div>
  )
}

export default Message