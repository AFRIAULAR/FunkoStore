const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt');

const validationInput = (req,res,next) =>{
    const errors = validationInput(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }
};

const validatePasswords = (password1, password2) => {
    const result = password1 === password2;
    return result;
};

const validatePassword = async (password,storedPassword) => {
    return match = await bcrypt.compare(password, storedPassword);
};

module.exports = {
    validationInput,
    validatePasswords,
    validatePassword
}