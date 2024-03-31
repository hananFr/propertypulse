import connectDB from "@/config/database";
import Message from "@/models/Massage";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const GET = async (req) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();


    if (!sessionUser || !sessionUser.user) return new Response('User ID is required', { status: 401 });
    const { userId } = sessionUser;

    const unreadMessages = await Message.countDocuments({recipient: userId, read: false});

    return new Response(JSON.stringify({count: unreadMessages}), { status: 200 });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
}

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) {
      return new Response('User ID is required', {
        status: 401,
      });
    }

    const { userId } = sessionUser;

    const message = await Message.findById(id);

    if (!message) return new Response('Message Not Found', { status: 404 });


    if (message.recipient.toString() !== userId)  return new Response('Unauthorized', { status: 401 });
    

    await message.deleteOne();

    return new Response('Message Deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
