import puppeteer from "puppeteer";

export async function GET() {
    //@ts-ignore
  const browser = await puppeteer.launch({ headless: "new" }); // Launch headless browser
  const page = await browser.newPage();
  await page.goto("https://nextjs.org/docs/app/getting-started/fetching-data"); // Replace with the target website

  // Scrape the first <h1> text from the page
  const data = await page.evaluate(() => {
    return document.querySelector("h1")?.innerText || "No data found";
  });

  await browser.close();

  return Response.json({ result: data });
}