import { PasswordKeeperPage } from './app.po';

describe('password-keeper App', () => {
  let page: PasswordKeeperPage;

  beforeEach(() => {
    page = new PasswordKeeperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
