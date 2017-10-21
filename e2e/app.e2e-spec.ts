import { MovieWorldPage } from './app.po';

describe('movie-world App', function() {
  let page: MovieWorldPage;

  beforeEach(() => {
    page = new MovieWorldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
