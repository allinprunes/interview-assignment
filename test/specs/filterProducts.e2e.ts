import landingPage from '../pageobjects/landing.page.js';
import productsPage from '../pageobjects/products.page.js';
import { handleCookieConsent } from '../utils.js'

interface TestData {
  Highlights: string;
  Marke: string;
  Produktart: string;
  'Geschenk für': string;
  'Für Wen': string;
}

const keyMappings: { [key: string]: string } = {
  'Highlights': 'Highlights',
  'Marke': 'Marke',
  'Produktart': 'Produktart',
  'Geschenk für': 'Geschenk für',
  'Für Wen': 'Für Wen',
  'FürWen': 'Für Wen',
  'Geschenkfür': 'Geschenk für',
};

const testData: TestData[] = [
  { Highlights: 'Sale', Marke: 'Diesel', Produktart: 'Eau de Parfum', 'Geschenk für': '-', 'Für Wen': 'Unisex' },
  { Highlights: 'NEU', Marke: '-', Produktart: 'Parfum', 'Geschenk für': '-', 'Für Wen': 'Weiblich' },
  { Highlights: 'Limitiert', Marke: 'Givenchy', Produktart: 'Duftset', 'Geschenk für': 'Vatertag', 'Für Wen': 'Männlich' }
];

describe('Douglas De - Filter products', () => {
  it('should open main page', async () => {
    await landingPage.open('de');

    await handleCookieConsent();
    (await landingPage.mainContainer).waitForDisplayed();
  })

  it('should open parfum page', async () => {
    await landingPage.open('de/c/parfum/01');

    await browser.waitUntil(async () =>
      (await browser.getUrl()).includes('de/c/parfum/01'));

    await productsPage.mainContainer.waitForDisplayed();
    await productsPage.productsList.waitForDisplayed();

    expect(await productsPage.allProducts.length).toBeGreaterThanOrEqual(4);
  })

  testData.forEach(({ Highlights, Marke, Produktart, 'Geschenk für': Geschenkfür, 'Für Wen': FürWen }) => {
    Object.entries({ Highlights, Marke, Produktart, Geschenkfür, FürWen }).forEach(([key, value]) => {
      if (value !== '-') {
        const dropdownKey = keyMappings[key];
        const dropdown = productsPage.getFilterDropdown(dropdownKey);

        if (!dropdownKey) {
          throw new Error(`Dropdown key is undefined for test data key: ${key}`);
        }

        it(`should open ${key} dropdown`, async () => {
          await dropdown.openDropdown();
          expect(await dropdown.isDropdownMenuDisplayed()).toBeTruthy();
        });

        it (`should select ${value} from ${key} dropdown`, async () => {
          await dropdown.searchAndSelect(value);
          await dropdown.applySelection();

          expect(await productsPage.allProducts.length).toBeGreaterThan(0);
        });

        it ('should reset all filters', async () => {
          await productsPage.resetFiltersButton.click();
          await browser.waitUntil(async () => (await productsPage.allFilters).length === 0);
        });
      } else {
        console.log(`${key} dropdown value is "-" and is skipped.`);
      }
    });
  });
});
