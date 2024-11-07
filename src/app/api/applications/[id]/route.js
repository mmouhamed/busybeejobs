import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"; 

export async function GET(request, { params }) {
  const { id } = params; 

  try {
    const application = await prisma.application.findFirst({
      where: {
        userId: id, 
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ application }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch application data:", error);
    return NextResponse.json({ error: "Failed to fetch application data" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
    const { id } = params; // Extract the application ID from the URL params
  
    try {
      const data = await request.json();
  
      // Find the application to update
      const application = await prisma.application.update({
        where: { userId: id },
        data: {
          personalInfo: data.personalInfo,
          w4I9Info: data.w4I9Info,
          employmentHistory: data.employmentHistory,
          skills: data.skills,
          applicantQuestions: data.applicantQuestions,
          isComplete: data.isComplete,
          siteLocation: data.siteLocation ? data.siteLocation : null,
          position: data.position ? data.position : null,
          hireDate: data.hireDate ? new Date(data.hireDate) : null, 
          supervisorStatus: data.supervisorStatus ? data.supervisorStatus : false,
        },
      });
  
      return NextResponse.json({ application }, { status: 200 });
    } catch (error) {
      console.error("Failed to update application:", error);
      return NextResponse.json({ error: "Failed to update application." }, { status: 500 });
    }
  }