var mongoose = require('mongoose');
//  Объявляем схему,  как свойство mongoose
var Schema = mongoose.Schema;

// var productSchema = new Schema({
//     imagePath: { type: String, required: true },
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true }
// }, { collection: 'shopping' });
var productSchema = new Schema({
    imagePath: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    size: { type: Array, required: true },
    materials: { type: String, required: true },
    country: { type: String, required: true },
    availability: { type: Boolean, required: true },
    season: { type: Array, required: true }
}, { collection: 'woman_wear' });

// Создаем модель, с помощью которой на основе productSchema создаем документы
module.exports = mongoose.model('Product', productSchema);