const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add description']
    },
    price: {
        type: Number,
        required: [true, 'Please add price'],
        min: 0
    },
    category: {
        type: String,
        required: [true, 'Please add category'],
        enum: ['Casual', 'Formal', 'Sports', 'Sandals', 'Heels', 'Flats', 'Boots']
    },
    brand: {
        type: String,
        trim: true
    },
    sizes: [{
        size: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    }],
    colors: [{
        type: String
    }],
    images: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual for total stock
productSchema.virtual('totalStock').get(function() {
    return this.sizes.reduce((total, size) => total + size.stock, 0);
});

module.exports = mongoose.model('Product', productSchema);