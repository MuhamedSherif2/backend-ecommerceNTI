const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const signIn = (user) => {
    return jwt.sign(
        { id: user._id, name: user.name, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    )
}

exports.createUser = async (req, res) => {
    try {
        const { name, email, phoneNumber, address, password, role } = req.body;

        const userRole = role ? role.trim() : 'user';

        if (!['admin', 'coreTeam', 'user'].includes(userRole)) {
            return res.status(400).json({ Error: 'Invalid Role' })
        }
        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(400).json({ message: 'Email is Existing' })
        }
        const user = await userModel.create({ name, email, phoneNumber, address, password, role })

        res.status(200).json({ message: 'Created User Successfully', data: user })
    } catch (error) {
        res.status(500).json({ message: `error in createUser : ${error}` })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'Invalid Email or Password' });
        };

        const isCorrect = await user.correctPassword(password)
        if (isCorrect) {
            const token = signIn(user);
            return res.status(200).json({ message: 'login successfully', data: token })
        };

        if (user.isDeleted) {
            return res.status(403).json({ message: 'This account is deleted' });
        }

        return res.status(404).json({ message: 'Invalid Email or Password' });
    } catch (error) {
        res.status(500).json({ message: `error in login : ${error}` })
    }
}

exports.getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User fetched successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: `error in getUserProfile : ${error}` });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json({ data: users })
    } catch (error) {
        res.status(500).json({ message: `error in getAllUsers : ${error}` })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndUpdate(id, { isDeleted: true })
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: `error in deleteUser : ${error}` })
    }
}