const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema(
    {
        name: String, 
        date: Date, 
        amount: Number, 
        category: String, 
        type: String, 
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
    );

    module.exports = mongoose.model('Transaction', transactionSchema)