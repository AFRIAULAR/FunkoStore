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

const validatePassword = (password,storedPassword) => {
    /*console.log(password)
    console.log(storedPassword)
    return match = await bcrypt.compare(password, storedPassword);*/
    console.log(password + " y " + storedPassword)
    const result = password === storedPassword 
    return result;
};

module.exports = {
    validationInput,
    validatePassword
}