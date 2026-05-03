import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

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
        const hashed = await bcrypt.hash("admin123", 10);
        admin = await User.create({
            name: "Super Admin",
            email: "admin@carbazaar.com",
            password: hashed,
            role: "admin"
        });
        console.log("Admin created: admin@carbazaar.com / admin123");
    } else {
        const hashed = await bcrypt.hash("admin123", 10);
        admin.password = hashed;
        await admin.save();
        console.log(`Admin found. Email: ${admin.email} | Password reset to: admin123`);
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
