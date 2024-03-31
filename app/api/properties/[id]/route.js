import connectDB from "@/config/database"
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);

    if (!property) return new Response('No property found', { status: 404 });
    return new Response(JSON.stringify(property), {
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return new Response('Somethig went wrong', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const propertyID = params.id;
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }
    const { userId } = sessionUser;

    await connectDB();
    const property = await Property.findById(propertyID);

    if (!property) return new Response('No property found', { status: 404 });

    if (property.owner.toString() !== userId) return new Response('Unathorized', { status: 401 });

    await property.deleteOne();
    return new Response('Deleted', {
      status: 200,
    });

  } catch (error) {
    console.log(error);
    return new Response('Somethig went wrong', { status: 500 });
  };
};

export const PUT = async (req, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;

    const formData = await req.formData();

    const propertyData = {};
    for (const [key, value] of formData.entries()) {
      

      const keys = key.split('.');
      if (keys.length === 1) {
  
        propertyData[key] = value;
      } else {
  
        let obj = propertyData;
        for (let i = 0; i < keys.length - 1; i++) {
          const currentKey = keys[i];
          obj[currentKey] = obj[currentKey] || {};
          obj = obj[currentKey];
        }
        obj[keys[keys.length - 1]] = value;
      }
    }

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return new Response('Property does not exist', { status: 404 });
    }

    if (existingProperty.owner.toString() !== userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Failed to add property', { status: 500 });
  }
  };
