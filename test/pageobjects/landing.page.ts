import { $ } from '@wdio/globals'
import Page from './page.js';

class LandingPage extends Page {
    get mainContainer () {
        return $('[data-testid="grid"]');
    }

    get cookiesModal () {
        return $('.modal-overlay__display');
    }

    get acceptCookiesButton () {
        return this.cookiesModal.$('.uc-list-button__accept-all');
    }

    get rejectCookiesButton () {
        return this.cookiesModal.$('.uc-list-button__deny-all');
    }

    get parfumLink () {
        return $('.navigation-main__entry-slide a[href="/de/c/parfum/01"]');
    }
}

export default new LandingPage();
