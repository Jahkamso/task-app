const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./User.model");
const Note = require("./Note.model")
const { sendMagicLinkEmail } = require("./mailer");

const app = express();

app.use(
  cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"], // Allow only GET and POST requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only specific headers
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret_key";

if (!process.env.JWT_SECRET) {
  console.error(
    "Warning: JWT_SECRET environment variable is not set. Using default secret."
  );
}



// login endpoint
app.post("/login", async (req, res) => {
  const email = req.body.email;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      user = new User({ email: email });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });
    await sendMagicLinkEmail({ email: user.email, token });

    // Include the token in the response
    return res.json({ message: "Message sent!", token });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Error logging in. Please try again!" });
  }
});

// verify endpoint
app.get("/verify", async (req, res) => {
  const token = req.query.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const user = await User.findOne({ _id: decodedToken.userId });

    if (user) {
      return res.send({ message: "Authorized" }).sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.error("Token verification error:", error);
    return res.sendStatus(401);
  }
});



// === Notes creation endpoint ===
app.post("/create-note", async (req, res) => {
  const {title, content} = req.body
  try {
    const note = new Note({
      title,
      content,
      userId: "667719f7197d5163400b6855",
    });
  await note.save()
  console.log("Notes Created: ", note)
  return res.status(200).json({message: "Notes successfully created."})
  } catch (error) {
    return res.status(401).json({message: "Failed to add new note."})
  }
})

// === Notes fetching endpoint ===
app.get("/notes", async (req, res) => {
  try {
    const getNotes = await Note.find({
      userId: "66742f0a1a1d38bed00ccfe1",
    });
    return res.status(200).json({message: getNotes})
  } catch (error) {
    return res.status(401).json({message: "Failed to fetch notes"})
  }
})

// Connect to database
mongoose
  .connect("mongodb://localhost/Note-taking-app")
  .then(() => {
    console.log("Database connected.");
    app.listen(3001, () => {
      console.log("Listening on port http://localhost:3001/");
    });
  })
  .catch((error) => {
    console.log("Database connection failed: ", error);
  });
