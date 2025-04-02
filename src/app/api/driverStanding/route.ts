import puppeteer from "puppeteer";

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      //@ts-ignore
      headless: "true",
    });
    const page = await browser.newPage();
    await page.goto("https://www.formula1.com/en/results/2025/drivers", { waitUntil: "domcontentloaded", timeout: 0 });
  
    // Extract and map data into IDriverStanding format
    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll(".f1-table tbody tr");
  
      return Array.from(rows).map(row => {
        const cells = row.querySelectorAll("td p"); // Selects <p> tags inside <td>
  
        return {
          //@ts-ignore
          position: parseInt(cells[0]?.innerText.trim() || "0"),
          //@ts-ignore
          name: cells[1]?.innerText.trim() || "",
          //@ts-ignore
          nationality: cells[2]?.innerText.trim() || "",
          //@ts-ignore
          team: cells[3]?.innerText.trim() || "",
          //@ts-ignore
          points: parseFloat(cells[4]?.innerText.trim() || "0"),
        };
      });
    });
  
    await browser.close();
    return Response.json({ result: data });
  } catch (error:any) {
    console.error("Error launching Puppeteer or fetching data:", error);
    return Response.json({ error: error.message });
  }
}
