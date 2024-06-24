import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { connect } from 'puppeteer-real-browser'

const email = "silvia.carter@gmail.com";
const password = "PuK$-f6QDJ7VVip";

puppeteer.use(StealthPlugin());


connect({

    headless: 'auto',

    args: [],

    customConfig: {},

    skipTarget: [],

    fingerprint: false,

    turnstile: true,

    connectOption: {},

    fpconfig: {},



})
.then(async response => {
    (async () => {

        console.log('Ready to go!');


        const {browser, page} = response;
        
        await page.setViewport({
            width: 1920 + Math.floor(Math.random() * 100),
            height: 1080 + Math.floor(Math.random() * 100),
            deviceScaleFactor: 1,
            hasTouch: false,
            isLandscape: false,
            isMobile: false,
        });
    
        await page.goto('https://chatgpt.com');
    

        await page.waitForSelector('[data-testid="login-button"]');
        await page.click('[data-testid="login-button"]');
    

        await page.waitForSelector('#email-input');
        await page.type('#email-input', email);
    

        await page.keyboard.press('Enter');

        await page.waitForSelector('#password');
        await page.type('#password', password);

        
        let form = await page.$('[data-form-primary="true"]');
        
        await form.evaluate(form => {
            form.style.backgroundColor = 'red';
            form.submit();
            // console.log(form);
            // console.log(form.children.length);
            // let target = form.children[3]
            // console.log(target);
            // target.click();
            // let trueTarget = target.children[0];
            // trueTarget.style.backgroundColor = 'blue';
            // trueTarget.focus();
            // let event = new MouseEvent('click', {
            //     view: window,
            //     bubbles: true,
            //     cancelable: true
            // });
            // trueTarget.dispatchEvent(event);


        });

        
    })();
    
})
.catch(error=>{
    console.log(error.message)
})


