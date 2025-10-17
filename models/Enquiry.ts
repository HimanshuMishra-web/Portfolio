import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  status: 'pending' | 'contacted' | 'in-progress' | 'completed' | 'declined';
  adminNotes?: string;
  adminReply?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  projectType: {
    type: String,
    enum: ['web-development', 'mobile-app', 'e-commerce', 'consulting', 'other'],
    default: 'other'
  },
  budget: {
    type: String,
    enum: ['under-5k', '5k-15k', '15k-50k', '50k-100k', 'over-100k', 'not-specified'],
    default: 'not-specified'
  },
  timeline: {
    type: String,
    enum: ['asap', '1-month', '2-3-months', '3-6-months', 'flexible', 'not-specified'],
    default: 'not-specified'
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in-progress', 'completed', 'declined'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  adminReply: {
    type: String,
    maxlength: [2000, 'Admin reply cannot exceed 2000 characters']
  },
  repliedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for better query performance
EnquirySchema.index({ createdAt: -1 });
EnquirySchema.index({ status: 1 });
EnquirySchema.index({ email: 1 });

const Enquiry = mongoose.models?.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
export default Enquiry;