import express from "express";
import cors from "cors";
import { connectToDatabase } from "./services/database.js";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5010;

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/comments", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const comments = database.collection("comments");

    const allComments = await comments.find({}).limit(50).toArray();

    res.json(allComments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


app.patch("/api/comments/:id", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const comments = database.collection("comments");

    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { text: req.body.text, date: new Date() } };

    const result = await comments.updateOne(filter, updateDoc);
    res.json({ message: "Comment updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/users/changePassword", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const users = database.collection("users");

    const filter = { email: req.body.email, password: req.body.oldPassword };
    const updateDoc = { $set: { password: req.body.newPassword } };

    const result = await users.updateOne(filter, updateDoc);
    res.json({ message: "Password updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const movies = database.collection("movies");

    const allMovies = await movies.find({}).limit(50).toArray();

    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/movies/rate/:id", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const movies = database.collection("movies");

    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $push: { ratings: req.body.rating } };

    const result = await movies.updateOne(filter, updateDoc);
    res.json({ message: "Movie rating updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/theaters/:id", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const theaters = database.collection("theaters");

    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { address: req.body.address } };

    const result = await theaters.updateOne(filter, updateDoc);
    res.json({ message: "Theater address updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/users/changeEmail", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const users = database.collection("users");

    const filter = { _id: new ObjectId(req.body.userId), email: req.body.oldEmail };
    const updateDoc = { $set: { email: req.body.newEmail } };

    const result = await users.updateOne(filter, updateDoc);
    res.json({ message: "Email updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/movies/status/:id", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const movies = database.collection("movies");

    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { status: req.body.status } };

    const result = await movies.updateOne(filter, updateDoc);
    res.json({ message: "Movie status updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/sessions/:id", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const sessions = database.collection("sessions");

    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { status: req.body.status } };

    const result = await sessions.updateOne(filter, updateDoc);
    res.json({ message: "Session updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/reviews/:id", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const reviews = database.collection("reviews");

    const filter = { _id: new ObjectId(req.params.id) };
    const updateDoc = { $set: { text: req.body.text } };

    const result = await reviews.updateOne(filter, updateDoc);
    res.json({ message: "Review updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.patch("/api/watchlist/remove", async (req, res) => {
  try {
    const database = await connectToDatabase();
    const watchlist = database.collection("watchlist");

    const filter = { userId: req.body.userId };
    const updateDoc = { $pull: { movies: req.body.movieId } };

    const result = await watchlist.updateOne(filter, updateDoc);
    res.json({ message: "Movie removed from watchlist", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
