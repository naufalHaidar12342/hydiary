import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
	const resend = new Resend(process.env.RESEND_API_KEY);
	try {
		const { data } = await resend.emails.send({});
	} catch (error) {}
}
