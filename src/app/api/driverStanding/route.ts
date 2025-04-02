import * as cheerio from "cheerio";

export async function GET() {
  try {
    const response = await fetch("https://www.formula1.com/en/results/2025/drivers");
    if (!response.ok) throw new Error("Failed to fetch page");

    const html = await response.text();
    const $ = cheerio.load(html);

    // Select all table rows in the driver standings table
    const data = $(".f1-table tbody tr")
      .map((_, row) => {
        const cells = $(row).find("td p"); // Selecting <p> tags inside <td>

        return {
          position: parseInt($(cells[0]).text().trim() || "0"),
          name: $(cells[1]).text().trim().split(/(\s+)/)[2].slice(0, -3) || "",
          nationality: $(cells[2]).text().trim() || "",
          team: $(cells[3]).text().trim() || "",
          points: parseFloat($(cells[4]).text().trim() || "0"),
        };
      })
      .get(); // Convert to array

    return Response.json({ result: data });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return Response.json({ error: error.message });
  }
}
  