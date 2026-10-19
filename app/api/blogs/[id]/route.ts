import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import Blog from '../../../../models/Blog';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const blog = await Blog.findById(params.id)
      .populate('topics', 'name slug')
      .populate('templateUsed', 'name')
      .populate('publishedBy', 'name');

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { action, ...updateData } = await request.json();

    if (action === 'publish') {
      // Get current user from session/auth - simplified for now
      const publishedBy = 'admin'; // This should come from auth

      const blog = await Blog.findByIdAndUpdate(
        params.id,
        {
          status: 'published',
          publishedAt: new Date(),
          publishedBy
        },
        { new: true }
      );

      if (!blog) {
        return NextResponse.json(
          { success: false, error: 'Blog not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Blog published successfully',
        blog
      });
    }

    if (action === 'unpublish') {
      const blog = await Blog.findByIdAndUpdate(
        params.id,
        {
          status: 'unpublished',
          publishedAt: null,
          publishedBy: null
        },
        { new: true }
      );

      if (!blog) {
        return NextResponse.json(
          { success: false, error: 'Blog not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Blog unpublished successfully',
        blog
      });
    }

    // General update
    const blog = await Blog.findByIdAndUpdate(params.id, updateData, { new: true });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const blog = await Blog.findByIdAndDelete(params.id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}