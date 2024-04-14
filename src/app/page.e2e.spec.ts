
import { Locator, Page, expect, test } from "@playwright/test";
import { DATA_TESTID as DATA_TESTID_HEADER_FAVBUTTON } from "./_layout/header/favorites/Favorites";
import { DATA_TESTID as DATA_TESTID_CHARACTERS_LIST } from "#modules/characters/listing/List/List";
import { DATA_TESTID as DATA_TESTID_SEARCH_INPUT } from "#modules/search/Search/Search";

test.describe.configure( {
  mode: "parallel",
} );

test("Inicialmente la página debe mostrar los primeros 50 personajes.", async ( { page } ) => {
  await page.goto("/");

  await page.waitForSelector(SELECTORS.FIRST_CARD);

  const cards = await page.locator(SELECTORS.CARDS).count();

  expect(cards).toBe(50);
} );

test.describe("Al hacer clic en el icono de favoritos en cada resultado", ()=> {
  let favButton: Locator;

  test.beforeEach(async ( { page } ) => {
    await page.goto("/");
    await page.waitForSelector(SELECTORS.FIRST_CARD);
    const firstCard = page.locator(SELECTORS.FIRST_CARD);

    favButton = firstCard.locator("*:has(> svg)");
  } );

  test("deberá cambiar de color", async ( { page } ) => {
    const getCurrentColor = () => favButton.locator("svg").evaluate((svg) => {
      return window.getComputedStyle(svg).color;
    } );
    const colorOfSvgBefore = await getCurrentColor();

    await favButton.click();

    await waitForUnhover(page);

    await page.waitForTimeout(1000);

    const colorOfSvgAfter = await getCurrentColor();

    expect(colorOfSvgBefore).not.toBe(colorOfSvgAfter);
  } );

  test("se deberá añadir una unidad al contador de la zona superior", async ( { page } ) => {
    const counterBefore = await getFavoritesCounter(page);

    await favButton.click();

    const counterAfter = await getFavoritesCounter(page);

    expect(counterAfter).toBe(counterBefore + 1);
  } );

  test("Debe de existir la posibilidad de eliminar los personajes favoritos, modificando  el contador.", async ( { page } ) => {
    await favButton.click();

    const counterBefore = await getFavoritesCounter(page);

    await favButton.click();

    const counterAfter = await getFavoritesCounter(page);

    expect(counterAfter).toBe(counterBefore - 1);
  } );
} );

test.describe("navigation", () => {
  test("should navigate to the fav page", async ( { page } ) => {
    await page.goto("/");

    const favButton = page.getByTestId(DATA_TESTID_HEADER_FAVBUTTON);

    await favButton.click();
    await expect(page).toHaveURL("?resultType=favorites");
    await expect(page.locator("h1")).toContainText(/favorites/i);
  } );

  test("Al hacer clic en un resultado, se deberá de redirigir a la vista de detalle del personaje", async ( { page } ) => {
    await page.goto("/");

    const firstCardElement = await page.waitForSelector(SELECTORS.FIRST_CARD);

    await firstCardElement.click();
    await expect(page).toHaveURL(/\/detail\/\d+/);
  } );
} );

test("should search for a characters", async ( { page } ) => {
  await page.goto("/");

  await page.waitForSelector(SELECTORS.FIRST_CARD);

  const searchInput = page.getByTestId(DATA_TESTID_SEARCH_INPUT);

  await searchInput.fill("Spider");

  await waitForSearchResults(page);

  const firstCard = page.locator(SELECTORS.FIRST_CARD);

  await expect(firstCard).toContainText(/Spider/i);
} );

const SELECTORS = {
  CARDS: getSelectorByDataTestId(DATA_TESTID_CHARACTERS_LIST) + " > *",
  FIRST_CARD: getSelectorByDataTestId(DATA_TESTID_CHARACTERS_LIST) + " > *:first-child",
} as const;

function getSelectorByDataTestId(dataTestId: string) {
  return "[data-testid=\"" + dataTestId + "\"]";
}

function waitForSearchResults(page: Page) {
  return page.waitForFunction(() => !document.body.innerText.includes("50 RESULTS"));
}

async function waitForUnhover(page: Page) {
  await page.mouse.move(0, 0);
  await page.waitForTimeout(100);
}

async function getFavoritesCounter(page: Page) {
  return +(await page.getByTestId(DATA_TESTID_HEADER_FAVBUTTON).innerText());
}
