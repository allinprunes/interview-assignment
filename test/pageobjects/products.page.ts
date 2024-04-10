import { $ } from '@wdio/globals'
import Page from './page.js';
import DropdownComponent from '../components/dropdown.js';

class ProductsPage extends Page {
    get mainContainer () {
        return $('.product-overview-page__layout');
    }

    get productsList () {
        return $('#productlisting');
    }

    get allProducts () {
        return this.productsList.$$('.product-grid-column');
    }

    get resetFiltersButton () {
        return this.mainContainer.$('.selected-facets__reset');
    }

    get allFilters () {
        return this.mainContainer.$$('.selected-facets__value')
    }

    getFilterDropdown(name: string) {
        return new DropdownComponent(name);
    }
}

export default new ProductsPage();
