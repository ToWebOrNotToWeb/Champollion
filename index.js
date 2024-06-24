// Nouvelle tentative de bot, cette fois via l'api d'openai (gpt-4-vision)
import OpenAI from "openai";
import fs from "fs";
import pdfkit from "pdfkit";

const openai = new OpenAI();

//All : "germany", "france", "luxembourg", "belgium", "switzerland", "italy", "spain", "norway", "sweden", "united-kingdom" "turkey", "portugal", "poland", "ireland", "iceland", "hungary", "greece", "finland", "czechia", "algeria", "albania", "australia", "china", "cote-divoire", "denmark", "hong-kong", "india", "japan", "south-korea", "monaco", "croatia", "qatar", "the-united-states-of-america", "the-russian-federation", "singapore"


// Special case : "china" need this url = `https://raw.githubusercontent.com/ToWebOrNotToWeb/digitalReportData${Country}/blob/main/${country}_data/${country}_data_${i}.png`

const countrys = [];

const highestNb = 104;

async function imgToText(country, i) {

    try {

        const Country = country.charAt(0).toUpperCase() + country.slice(1);

        const url = `https://raw.githubusercontent.com/ToWebOrNotToWeb/digitalReportData${Country}/blob/main/china_data/${country}_data_${i}.png`;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "user",
                    content: [
                    { type: "text", text: "retranscrit l'images suivante de maniére textuel." },
                    {
                        type: "image_url",
                        image_url: {
                        "url": url,
                        },
                    },
                    ],
                },
            ],
        });
        // console.log(response.choices[0].message.content);
        fs.appendFile(`./${country}.txt`, response.choices[0].message.content, (err) => {
            if (err) throw err;
            console.log(`Image ${i} translated !`);
        });

    } catch (error) {
        console.error(error.status);
        if (error.status === 429) {
            console.log("Rate limit reached, waiting 2 second before retrying...");
            setTimeout(() => {
                imgToText(country, i);
            }, 2000);
        }
    };

};

async function textToPdf(country){

    try {

        if (!fs.existsSync(`./${country}.txt`)) {
            throw new Error('Text file not found');
        };

        const content = fs.readFileSync(`./${country}.txt`, 'utf8');

        const doc = new pdfkit();

        doc.pipe(fs.createWriteStream(`./${country}.pdf`));

        doc.text(content);

        doc.end();
        console.log("Pdf created !");

    } catch (error) {
        console.error(error);
    };

};

async function processCountries(countrys, highestNb) {

    for (const country of countrys) {

        const promises = [];

        for (let i = 1; i < highestNb; i++) {

            promises.push(

                new Promise((resolve) => {

                    setTimeout(() => {

                        imgToText(country, i);
                        resolve();

                    }, i * 2000);

                })
            );
        };

        await Promise.all(promises);
        textToPdf(country);

    }
}

processCountries(countrys, highestNb);