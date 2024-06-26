import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Message from "../../../models/Message.js"

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.6zbyzt8.mongodb.net/Journalize?retryWrites=true&w=majority&appName=BackendDB`;

export const GET = async (req: NextRequest) => {
    let retrieveData;
  try {
    retrieveData = await mongoose.connect(MONGO_URI);
    // access all products in the database
    const journals = await Message.find({});
    mongoose.disconnect()
    return NextResponse.json({message: journals}, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: error }, {status: 500});
  }
};

export const POST = async (req: NextRequest) => {
  let client;

  try {
    // connect to database
    client = await mongoose.connect(MONGO_URI);
    console.log("DB connected!");
  } catch (error) {
    console.log("There was an error connecting to the database.", error);
    return NextResponse.json(
      { message: "Database connection failed!" },
      { status: 500 }
    );
  }

  const data = await req.json();
  const { name, email, company, message } = data;

  if (
    !name ||
    !company ||
    !message ||
    !email ||
    !email.includes("@") ||
    message.trim() === "" ||
    name.trim() === ""
  ) {
    return NextResponse.json(
      { message: "Invalid input - fill all the fields" },
      { status: 422 }
    );
  }

  const newData = {
    ...data,
    date: new Date()
  }

  try {
    // create new data in database
    await Message.create(newData)
    console.log("Message sent!")
    return NextResponse.json({message: "Message sent!"}, {status: 201})
  } catch(error) {
    console.log("Message couldn't be sent: ", error)
    return NextResponse.json({ message: "Error sending the message" }, { status: 500 });
  }
};
