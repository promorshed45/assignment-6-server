// // pages/api/generate-pdf.js
// import puppeteer from 'puppeteer';

// export async function GET() {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.setContent(`
//         <h1>Tour of Chattagram</h1>
//         <p>Plan your travels smarter with these must-know tips...</p>
//         <p>Category: Business Travel</p>
//     `);
//     const pdfBuffer = await page.pdf({ format: 'A4' });
//     await browser.close();

//     const response = new NextResponse(pdfBuffer);
//     response.headers.set('Content-Type', 'application/pdf');
//     response.headers.set('Content-Disposition', 'attachment; filename="tour_of_chattagram.pdf"');
//     return response;
// }
