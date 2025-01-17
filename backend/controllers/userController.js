import asyncHandler from '../middleware/asyncHandler.js';  
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        // console.log('User matched');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        });
    } else {
        // console.log('Invalid email or password');
        res.status(401);
        throw new Error('Invalid email or password');
    }
    // res.send('authUser');
});

const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
}
);

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
        res.status(404);
        throw new Error('User already exists');
    }

    const user= await User.create({
            name,
            email,
            password
        });

    if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        });
    } else {
        res.status(404);
        throw new Error('Invalid userdata');
    }

    res.send('registerUser');
}
);

const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
    
    // res.send('updateUserProfile');
}
);

const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', 'none', {
        httpOnly: true,
        expires: new Date(0),
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
    });
    res.send('logoutUser');
}
);

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
}
);

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error('You cannot delete admin user');
        }
        await User.deleteOne({_id: user._id});
        res.status(200).json({message: 'User removed'});
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
}
);

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
}
);

const updateUser = asyncHandler(async (req, res) => {
    const user= await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.status(200).json(
            {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            }
        );
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
}
);

export { authUser, getUserProfile, registerUser, updateUserProfile, logoutUser, getUsers, deleteUser, getUserById, updateUser };


