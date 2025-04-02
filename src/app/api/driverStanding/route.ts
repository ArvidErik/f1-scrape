import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export async function GET() {
  try {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      //@ts-ignore
      headless: "new",
    });

    const page = await browser.newPage();
    await page.goto("https://www.formula1.com/en/results/2025/drivers", {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    const data = await page.evaluate(() => {
      const rows = document.querySelectorAll(".f1-table tbody tr");

      return Array.from(rows).map(row => {
        const cells = row.querySelectorAll("td p");
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
  } catch (error: any) {
    console.error("Error launching Puppeteer or fetching data:", error);
    return Response.json({ error: error.message });
  }
}
