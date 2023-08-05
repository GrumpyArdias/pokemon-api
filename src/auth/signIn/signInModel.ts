import { IUser } from "./user";
import mongoose from "mongoose";
// import bcrypt from "bcrypt";

export const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
          value
        );
      },
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit",
    },
  },
});

// userSchema.pre<IUser>("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(this.password, salt);
//     this.password = hash;
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

export const userModel = mongoose.model<IUser>("user", userSchema);
