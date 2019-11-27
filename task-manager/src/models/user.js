const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Wrong email!');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        },
    }]
});

userSchema.statics.findByCredentionals = async (email, password) => {
    const user = await User.findOne({ email });
    
    if(!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Wrong password!');
    }

    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, 'thismyapp');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;