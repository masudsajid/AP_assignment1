import mongoose from 'mongoose';

const DirectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  biography: {
    type: String,
    default: 'Film director known for their work in cinema.'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

export default mongoose.models.Director || mongoose.model('Director', DirectorSchema); 