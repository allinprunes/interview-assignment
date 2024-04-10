import landingPage from "./pageobjects/landing.page.js";

export async function handleCookieConsent(accept = true) {
    try {
        await browser.waitUntil(async () => {
            const consentPopup = await landingPage.cookiesModal;
            return await consentPopup.isDisplayed();
        }, { timeout: 10000, timeoutMsg: 'Consent popup did not appear within 10 seconds' });

        if (accept) {
            await landingPage.acceptCookiesButton.click();
        } else {
            await landingPage.rejectCookiesButton.click();
        }
    } catch (error) {
        console.error('Cannot find or interact with cookies modal!', error);
    }
}
