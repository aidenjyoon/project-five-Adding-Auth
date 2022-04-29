import { hashPassword } from "../../../helpers/auth";
import connectToDatabase from "../../../helpers/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    // check emails
    if (!email || !email.includes("@")) {
      res.status(422).json({
        message: "Invalid input - check your email address.",
      });
    }

    // check password
    if (!password || password.trim().length < 7) {
      res.status(422).json({
        message:
          "Invalid input - password should be at leeast 7 characters long.",
      });
      return;
    }

    let client;
    let db;

    // connect to database
    try {
      client = await connectToDatabase();
      // db = client.db(`${process.env.mongodb_database}`);
      db = client.db("auth");
    } catch (error) {
      console.log("unable to connect to db");
    }

    // add item to database
    try {
      const hashedPassword = await hashPassword(password);

      db.collection("users").insertOne({
        email: email,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Created user!" });
    } catch (error) {
      res.status(500).json({ message: "Not able to add to database." });
    }

    // client.close();
  }
};

export default handler;
