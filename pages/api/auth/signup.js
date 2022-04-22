import { hashPassword } from "../../../helpers/auth";
import connectToDatabase from "../../../helpers/db";

const handler = async (req, res) => {
  const data = req.body;
  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().lengh < 7
  ) {
    req.status(422).json({
      message:
        "Invalid input - password should be at leeast 7 characters long.",
    });
  }

  const hashedPassword = hashPassword(password);

  const client = await connectToDatabase();
  const db = client.db();

  db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created user!" });
};

export default handler;
