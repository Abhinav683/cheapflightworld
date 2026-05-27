import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  createAdminSessionToken,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const adminUser = await prisma.adminUser.findUnique({
      where: {
        username,
      },
    });

    if (!adminUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password.",
        },
        {
          status: 401,
        }
      );
    }

    const isPasswordValid = await verifyPassword(
      password,
      adminUser.passwordHash
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password. ",
        },
        {
          status: 401,
        }
      );
    }

    const token = createAdminSessionToken(adminUser.id);

    const response = NextResponse.json({
      success: true,
      message: "Logged in.",
    });

    response.cookies.set({
      name: "admin_session",
      value: token,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to authenticate.",
      },
      {
        status: 500,
      }
    );
  }
}