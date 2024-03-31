import connectDB from "@/config/database";
import Message from "@/models/Massage";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) return new Response('User ID is required', { status: 401 });
    const { userId } = sessionUser;

    const unreadMessages = await Message.find({ recipient: userId, read: false })
      .populate('sender', 'username')
      .populate('property', 'name')
      .sort({ createdAt: -1 });

    const readMessages = await Message.find({ recipient: userId, read: true })
      .populate('sender', 'username')
      .populate('property', 'name')
      .sort({ createdAt: -1 });

      const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });

  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
}

export const POST = async (req) => {
  try {
    const { name, email, phone, message, property, recipient } =
      await req.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.user) return new Response('You must be logged in to send a message!', { status: 401 });

    const { user } = sessionUser;
    if (user.id === recipient) return new Response(JSON.stringify({
      message: 'Can not send a message to yourself'
    }), { status: 400 });

    const newMessage = new Message({
      name,
      email,
      phone,
      body: message,
      property,
      recipient,
      sender: user.id
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: "Message Sent" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
}