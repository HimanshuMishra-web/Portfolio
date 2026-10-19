import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogTemplate extends Document {
  name: string;
  description: string;
  jsonStructure: object;
  associatedTopics: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BlogTemplateSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [200, 'Template name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Template description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  jsonStructure: {
    type: Schema.Types.Mixed,
    required: [true, 'JSON structure is required']
  },
  associatedTopics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Created by user is required']
  }
}, {
  timestamps: true
});

// Index for better query performance
BlogTemplateSchema.index({ createdBy: 1 });
BlogTemplateSchema.index({ associatedTopics: 1 });

const BlogTemplate = mongoose.models?.BlogTemplate || mongoose.model<IBlogTemplate>('BlogTemplate', BlogTemplateSchema);
export default BlogTemplate;