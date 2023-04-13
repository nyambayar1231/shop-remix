module.exports = {
  name: "prisma-studio",
  script: "npx",
  args: ["prisma", "studio"],
  interpreter: "none",
  env: {
    DATABASE_URL: "postgresql://nyamka:as4dfqwezxc@localhost:5432/mydatabase",
  },
};
