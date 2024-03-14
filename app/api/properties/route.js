import connectDB from "@/config/database"
import Property from "@/models/Property";

export const GET = async (req, res) => {
  console.log(res);
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(null), {
      status: 200,
    });

  } catch (error) {
    console.log(error);
  }
};