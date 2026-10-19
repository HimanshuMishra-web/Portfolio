import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import BlogTemplate from '../../../models/BlogTemplate';
import { verifyToken } from '../../../lib/auth';

export async function GET(request: NextRequest) {
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

    const templates = await BlogTemplate.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      templates: templates.map(template => ({
        _id: template._id,
        name: template.name,
        description: template.description,
        structure: template.structure,
        createdAt: template.createdAt,
        updatedAt: template.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
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

    const template = new BlogTemplate({
      name,
      description: description || '',
      structure,
    });

    await template.save();

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
    console.error('Error creating template:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}