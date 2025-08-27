"use server";

import { createTransport } from "nodemailer";
import { RescueTeam } from "@/datas/rescueTeams";

// Configure the transport with Gmail credentials
const transport = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export interface ContactFromState {
  message: string;
  link: string;
  fieldValues: {
    sender_name: string;
    sender_email: string;
    sender_message: string;
  };
}

export async function sendQuickMail({
  checkedItems,
  latitude,
  longitude,
  address,
  imageUrl,
}: {
  checkedItems: RescueTeam[];
  latitude: string;
  longitude: string;
  address: string;
  imageUrl: string;
}) {
  // Build Google Maps Link
  const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  // Compose email HTML with embedded image
  const htmlContent = `
    <h3>🚨 Accident Alert</h3>
    <p><strong>Location:</strong> ${address}</p>
    <p><a href="${googleMapLink}" target="_blank">📍 View on Google Maps</a></p>
    ${
      imageUrl
        ? `<p><img src="${imageUrl}" alt="Accident Image" style="max-width:500px; border-radius:8px;" /></p>`
        : `<p><em>No image available.</em></p>`
    }
  `;

  // Filter selected emails
  const recipients = checkedItems
    .filter((item: RescueTeam) => item.isChecked)
    .map((item: RescueTeam) => item.email);

  if (recipients.length === 0) {
    throw new Error("No rescue team members selected.");
  }

  try {
    const mailResponse = await transport.sendMail({
      from: `"Rescue Alert" <${process.env.EMAIL}>`,
      to: recipients,
      subject: "🚨 Accident Alert",
      html: htmlContent,
    });

    return mailResponse;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send accident alert email.");
  }
}
