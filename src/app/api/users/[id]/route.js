import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"; // Adjust the path based on your project structure

export async function GET(request, { params }) {
  try {
    const { id } = params; // Extract userId from the URL parameters

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: "Failed to fetch user." }, { status: 500 });
  }
}
