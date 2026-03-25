describe('Landing page main section and footer elements', () => {
  const socialLinks = [
    'facebook.com',
    't.me',
    'youtube.com',
    'instagram.com',
    'linkedin.com',
  ];

  beforeEach(() => {
    cy.visit('/', {
      auth: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    });
  });

  it('should find Sign up button in hero section', () => {
    cy.contains('button', 'Sign up').should('be.visible');
  });

  it('should find all footer social links', () => {
    cy.get('#contactsSection').within(() => {
      socialLinks.forEach((socialLink) => {
        cy.get(`a.socials_link[href*="${socialLink}"]`).should('be.visible');
      });
    });
  });

  it('should find footer site link and support email', () => {
    cy.get('#contactsSection').within(() => {
      cy.contains('a.contacts_link', 'ithillel.ua')
        .should('be.visible')
        .and('have.attr', 'href', 'https://ithillel.ua');

      cy.contains('a.contacts_link.h4', 'support@ithillel.ua')
        .should('be.visible')
        .and('have.attr', 'href', 'mailto:developer@ithillel.ua');
    });
  });
});