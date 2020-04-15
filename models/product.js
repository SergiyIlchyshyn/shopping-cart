var mongoose = require('mongoose');
//  Объявляем схему,  как свойство mongoose
var Schema = mongoose.Schema;

var productSchema = new Schema({
    imagePath: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
}, { collection: 'shopping' });

// Создаем модель, с помощью которой на основе productSchema создаем документы
module.exports = mongoose.model('Product', productSchema);