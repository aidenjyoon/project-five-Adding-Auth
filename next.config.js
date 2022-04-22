module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    env: {
      mongodb_username: "aiden",
      mongodb_password: "mpKZGI6SibJ2JSMy",
      mongodb_cluster: "cluster0",
      mongodb_database: "auth",
    },
  };
  return nextConfig;
};
