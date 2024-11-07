import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Adjust the path based on your project structure

export async function POST(request) {
  try {
    const data = await request.json();

    // Create a new application in the database
    const application = await prisma.application.create({
      data: {
        userId: data.userId,
        personalInfo: data.personalInfo,
        w4I9Info: data.w4I9Info,
        employmentHistory: data.employmentHistory,
        skills: data.skills,
        applicantQuestions: data.applicantQuestions,
        isComplete: false,
      },
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save application." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const applications = await prisma.application.findMany();
    return NextResponse.json({ applications }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch applications." }, { status: 500 });
  }
}