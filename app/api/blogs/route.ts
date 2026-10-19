import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Blog from '../../../models/Blog';
import { generateBlogsFromTrends } from '../../../lib/blogGenerator';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const topic = searchParams.get('topic');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let query: any = {};

    if (status) {
      query.status = status;
    }

    if (topic) {
      query.topics = topic; // Assuming topic is an ObjectId
    }

    const skip = (page - 1) * limit;

    const blogs = await Blog.find(query)
      .populate('topics', 'name slug')
      .populate('templateUsed', 'name')
      .populate('publishedBy', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Blog.countDocuments(query);

    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, geo, customPrompt } = await request.json();

    if (action === 'generate_from_trends') {
      const results = await generateBlogsFromTrends(geo || 'US', customPrompt);

      return NextResponse.json({
        success: true,
        message: `Generated ${results.filter(r => r.success).length} blogs from trending topics`,
        results
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in blog operation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to perform blog operation' },
      { status: 500 }
    );
  }
}