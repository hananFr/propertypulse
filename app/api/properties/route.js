import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database"
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";


export const GET = async (req) => {
  const page = req.nextUrl.searchParams.get('page') || 1;
  const pageSize = req.nextUrl.searchParams.get('pageSize') || 3;
  
  const skip = (page - 1) * pageSize;

  try {
    await connectDB();
    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      properties,
    }

    return new Response(JSON.stringify(result), {
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return new Response('Somethig went wrong', { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) return new Response("Unauthorized", { status: 401 });

    const { userId } = sessionUser;

    const formData = await req.formData();

    const propertyData = {};
    formData.forEach((value, key) => {
      if (key !== 'amenities' && key !== 'images') {
        if (key.includes('.')) {
          const [outerKey, innerKey] = key.split('.');
          propertyData[outerKey] = { ...propertyData[outerKey], [innerKey]: value };
        } else {
          propertyData[key] = value;
        }
      }
    });

    propertyData.amenities = formData.getAll('amenities');

    const images = formData.getAll('images').filter((image) => image.name !== '');

    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageBase64 = imageData.toString('base64');
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'propertypulse' }
      );
      imageUploadPromises.push(result.secure_url);
    }

    const uploadedImages = await Promise.all(imageUploadPromises);
    propertyData.images = uploadedImages;
    propertyData.owner = userId;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
  } catch (error) {
    console.error(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

