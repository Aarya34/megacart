import asyncHandler from '../middleware/asyncHandler.js';  
import User from '../models/userModel.js';


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
    res.send('authUser');
});

const getUserProfile = asyncHandler(async (req, res) => {
    res.send('getUserProfile');
}
);

const registerUser = asyncHandler(async (req, res) => {
    res.send('registerUser');
}
);

const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('updateUserProfile');
}
);

const logoutUser = asyncHandler(async (req, res) => {
    res.send('logoutUser');
}
);

const getUsers = asyncHandler(async (req, res) => {
    res.send('getUsers');
}
);

const deleteUser = asyncHandler(async (req, res) => {
    res.send('deleteUser');
}
);

const getUserById = asyncHandler(async (req, res) => {
    res.send('getUserById');
}
);

const updateUser = asyncHandler(async (req, res) => {
    res.send('updateUser');
}
);

export { authUser, getUserProfile, registerUser, updateUserProfile, logoutUser, getUsers, deleteUser, getUserById, updateUser };


