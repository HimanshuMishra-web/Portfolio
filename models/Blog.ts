import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  jsonContent: object;
  renderedHtml: string;
  excerpt: string;
  topics: mongoose.Types.ObjectId[];
  templateUsed: mongoose.Types.ObjectId;
  status: 'draft' | 'pending_approval' | 'published' | 'unpublished';
  generatedAt: Date;
  publishedAt?: Date;
  publishedBy?: mongoose.Types.ObjectId;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Blog slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
  },
  jsonContent: {
    type: Schema.Types.Mixed,
    required: [true, 'JSON content is required']
  },
  renderedHtml: {
    type: String,
    required: [true, 'Rendered HTML is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  topics: [{
    type: Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  }],
  templateUsed: {
    type: Schema.Types.ObjectId,
    ref: 'BlogTemplate',
    required: [true, 'Template used is required']
  },
  status: {
    type: String,
    enum: ['draft', 'pending_approval', 'published', 'unpublished'],
    default: 'draft'
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  publishedAt: {
    type: Date
  },
  publishedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot exceed 60 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot exceed 160 characters']
  },
  featuredImage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1 });
BlogSchema.index({ topics: 1 });
BlogSchema.index({ publishedAt: -1 });
BlogSchema.index({ createdAt: -1 });

const Blog = mongoose.models?.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;