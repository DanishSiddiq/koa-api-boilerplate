const mongoose = require('mongoose');

const schemaEmployee = new mongoose.Schema(
    {
            firstName: {
                    type: String,
                    trim: true
            },
            lastName: {
                    type: String,
                    trim: true
            },
            email: {
                    type: String,
                    required: true,
                    unique: true,
                    trim: true
            },
            registrationNumber: {
                    type: Number,
                    unique: true,
                    required: true
            },
            password: {
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            isEnabled: {
                    type: Boolean,
            }
    },
    {
            strict: false,
            versionKey: false,
            bufferCommands: false,
            validateBeforeSave: true,
            timestamps: true,
    },
);

module.exports = mongoose.model('employee', schemaEmployee, 'employee');
