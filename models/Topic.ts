import mongoose, { Schema, Document } from 'mongoose';

export interface ITopic extends Document {
  name: string;
  slug: string;
  description?: string;
  googleTrendsKeyword?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TopicSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Topic name is required'],
    trim: true,
    maxlength: [100, 'Topic name cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: [true, 'Topic slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  googleTrendsKeyword: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
TopicSchema.index({ slug: 1 });
TopicSchema.index({ isActive: 1 });

const Topic = mongoose.models?.Topic || mongoose.model<ITopic>('Topic', TopicSchema);
export default Topic;