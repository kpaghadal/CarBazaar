import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME || "Super Admin";

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not set in server .env");
  process.exit(1);
}

if (!adminEmail || !adminPassword) {
  console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in server .env");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        role: String
    });
    const User = mongoose.models.User || mongoose.model("User", userSchema);
    
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
        console.log("No admin found. Creating one...");
        const hashed = await bcrypt.hash(adminPassword, 10);
        admin = await User.create({
            name: adminName,
            email: adminEmail,
            password: hashed,
            role: "admin"
        });
        console.log(`Admin created: ${adminEmail}`);
    } else {
        const hashed = await bcrypt.hash(adminPassword, 10);
        admin.password = hashed;
        await admin.save();
        console.log(`Admin found. Email: ${admin.email} | Password reset from ADMIN_PASSWORD`);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
