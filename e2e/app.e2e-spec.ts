import { AngularCognitoDemoPage } from './app.po';

describe('angular-cognito-demo App', function() {
  let page: AngularCognitoDemoPage;

  beforeEach(() => {
    page = new AngularCognitoDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
