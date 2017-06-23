import { NavierStokesWebgl2Page } from './app.po';

describe('navier-stokes-webgl2 App', () => {
  let page: NavierStokesWebgl2Page;

  beforeEach(() => {
    page = new NavierStokesWebgl2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
