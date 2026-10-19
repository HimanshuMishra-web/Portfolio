import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb';
import BlogTemplate from '../../../../models/BlogTemplate';
import { verifyToken } from '../../../../lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const template = await BlogTemplate.findById(params.id);

    if (!template) {
      return NextResponse.json({ success: false, message: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      template: {
        _id: template._id,
        name: template.name,
        description: template.description,
        structure: template.structure,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const { name, description, structure } = await request.json();

    if (!name || !structure) {
      return NextResponse.json({ success: false, message: 'Name and structure are required' }, { status: 400 });
    }

    const template = await BlogTemplate.findByIdAndUpdate(
      params.id,
      {
        name,
        description: description || '',
        structure,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!template) {
      return NextResponse.json({ success: false, message: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      template: {
        _id: template._id,
        name: template.name,
        description: template.description,
        structure: template.structure,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const template = await BlogTemplate.findByIdAndDelete(params.id);

    if (!template) {
      return NextResponse.json({ success: false, message: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}