import connectDB from "@/config/database";
import Property from "@/models/Property";

export const GET = async (req) => {
  const pageSize = req.nextUrl.searchParams.get('pageSize') || 2;

  try {
    await connectDB();
    const properties = await Property.find({isFeatured: true}).limit(pageSize);

    return new Response(JSON.stringify(properties), {
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return new Response('Somethig went wrong', { status: 500 });
  }
};
