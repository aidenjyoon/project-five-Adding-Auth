import { MongoClient } from "mongodb";

const connectToDatabase = async () => {
  url = `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}-shard-00-00.4lj4l.mongodb.net:27017,${process.env.mongodb_cluster}-shard-00-01.4lj4l.mongodb.net:27017,${process.env.mongodb_cluster}-shard-00-02.4lj4l.mongodb.net:27017/${process.env.mongodb_database}?ssl=true&replicaSet=atlas-q1n2xs-shard-0&authSource=admin&retryWrites=true&w=majority`;

  const client = await MongoClient.connect(url);

  return client;
};

export default connectToDatabase;
