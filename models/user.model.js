const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phoneNumber: { type: String, required: true, unique: true },
    address: { type: String, trim: true },
    role: { type: String, enum: ['admin', 'coreTeam', 'user'], default: 'user' },
    password: { type: String, required: true, select: false },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
