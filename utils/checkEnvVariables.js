export default function () {
  if (!process.env.MONGO_CONNECTION_STRING) {
    console.log('FATAL ERROR - MONGO CONNECTION STRING NOT FOUND');
    process.exit(1);
  }
  if (!process.env.JWT_PVT_KEY) {
    console.log('FATAL ERROR - JWT PRIVATE KEY NOT FOUND');
  }
}
