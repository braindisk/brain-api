export default function () {
  if (!Bun.env.MONGO_CONNECTION_STRING) {
    console.log('FATAL ERROR - MONGO CONNECTION STRING NOT FOUND');
    process.exit(1);
  }
  if (!Bun.env.JWT_PVT_KEY) {
    console.log('FATAL ERROR - JWT PRIVATE KEY NOT FOUND');
  }
}
