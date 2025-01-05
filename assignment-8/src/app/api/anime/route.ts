import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?sfw", {
      headers: { "User-Agent": "Anime Insight (contact@animeinsight.com)" },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from Shikimori API");
    }
    const data = await response.json();
    return NextResponse.json(data); 
  } catch (error) {
    console.error("Error fetching manga data:", error);
    return NextResponse.json({ error: "Failed to fetch manga data" }, { status: 500 });
  }
}
