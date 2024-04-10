
export default class DropdownComponent {
    private menuSelector: string;
    dropdownContainer: string;

    constructor(dropdownSelector: string) {
        this.dropdownContainer = dropdownSelector;
        this.menuSelector = '.facet__menu-content';
    }

    async openDropdown() {
        const dropdown = await $(`//*[text()="${this.dropdownContainer}"]`);

        await dropdown.waitForDisplayed();
        await dropdown.click();
        await browser.pause(1000);
    }

    async isDropdownMenuDisplayed() {
        const dropdownMenu = await $(this.menuSelector);
        return await dropdownMenu.waitForDisplayed();
    }

    async searchAndSelect(value: string) {
        const option = await $(this.menuSelector).$(`.facet-option=${value}`);

        if (await (await $(this.menuSelector).$('.input__container input')).isDisplayed()) {
            await $(this.menuSelector).$('.input__container input').setValue(value);
        }

        await option.click();

    }

    async applySelection() {
        const applyButton = await $(`${this.menuSelector} .facet__close-button`);
        await applyButton.click();
    }
}
