import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// ❌ Wrong: models.export = mongoose.model("User", userSchema);
// ✅ Correct:
export default mongoose.model("User", userSchema);