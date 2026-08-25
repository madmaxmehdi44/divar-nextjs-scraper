import { NextResponse } from "next/server";
import { scrapeDivar } from "@/lib/divar";

export async function GET() {
  try {
    const ads = await scrapeDivar();

    return NextResponse.json({
      success: true,
      count: ads.length,
      ads,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
