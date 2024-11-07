import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  try {
    const { action } = await request.json(); // Read the action type from the request body

    const admins = await prisma.admins.findMany();
    const adminEmails = admins.map((admin) => admin.email);

    // Determine email content based on the action type
    let subject, text;

    switch (action) {
      case "new":
        subject = "New Applicant Started Application";
        text = "A new application has been started. Please check for any updates.";
        break;
      case "continue":
        subject = "Applicant Continued Application";
        text = "A user has logged in to continue their application. Please check for any updates.";
        break;
      case "submit":
        subject = "New Application Submitted";
        text = "A new application has been submitted. Please review it in the admin dashboard.";
        break;
      default:
        return NextResponse.json({ error: "Invalid action type." }, { status: 400 });
    }

    // Prepare the email message
    const msg = {
      to: adminEmails,
      from: "chinmaysk1@gmail.com",
      subject: subject,
      text: text,
    };

    // Send the email
    await sgMail.sendMultiple(msg);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
