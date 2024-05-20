import { db } from '@/lib/db';
import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
) {
    const body = await request.json();
    const { email, username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!email) return NextResponse.json('Email is required', { status: 400 });
    
    const EmailValidate = await db.user.findUnique({
        where: {
            email
        }
    })

    if (EmailValidate) return NextResponse.json('Email already exists', { status: 400});

    const user = await db.user.create({
        data: {
            email,
            name: username,
            username,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}