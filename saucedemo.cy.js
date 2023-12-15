
describe('Teste de Login', () => {

beforeEach(() => {
  cy.visit('https://www.saucedemo.com/v1/index.html')
})

// Login com credenciais válidas
 it('Login com credenciais válidas', () => {
  cy.get('#user-name').type('standard_user')
  cy.get('input#password').type('secret_sauce')
  cy.get('input#login-button').click()
  // Assert para verificar se a url está correta
  cy.url().should('include','inventory')
  .and('not.contain','product')
  })

// Login com username inválido  
 it('Login com username inválido', () => {
  cy.get('#user-name').type('standard',{ log: false })
  cy.get('input#password').type('secret_sauce')
  cy.get('input#login-button').click()
    // Verificar se a mensagem de erro está correta e está visivel
  cy.get('[data-test="error"]').should('include.text', 'Username and password do not match any user in this service')
  .and('be.visible')  
  })

// Login com senha inválida
  it('Login com senha inválida', () => {
  cy.get('#user-name').type('standard_user')
  cy.get('input#password').type('secret123',{ log: false })
  cy.get('input#login-button').click()
  // Verificar se a mensagem de erro está correta e está visivel
  cy.get('[data-test="error"]').should('include.text', 'Username and password do not match any user in this service')
  .and('be.visible')
})

// Login com username vazio  
  it('Login com username vazio', () => {
    cy.get('#user-name').click().clear()
    cy.get('input#password').type('secret_sauce')
    cy.get('input#login-button').click()

    // Verificar se a mensagem de erro está visivel - should
    cy.get('[data-test="error"]').should('be.visible')

    //Verfificar se a mensagem de erro estpa correta - BDD
    let experroname = 'Epic sadface: Username is required'
    cy.get('[data-test="error"]').then( (x) => {
      let acterroname = x.text ()
       //BDD
      expect(acterroname).to.equal(experroname)
      })

  })


// Login com username vazio  
  it('Login com senha vazia', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('input#password').click().clear()
    cy.get('input#login-button').click()

    // Verificar se a mensagem de erro está visivel - should
    cy.get('[data-test="error"]').should('be.visible')

    //Verfificar se a mensagem de erro estpa correta - TDD
    let experropass = 'Epic sadface: Password is required'
    cy.get('[data-test="error"]').then( (x) => {
      let acterropass = x.text ()
      assert.equal(acterropass , experropass)
     }) 
  
  })

})

///////////////////////////////////////////// Teste Add to Cart////////////////////////////////////////////////

describe('Teste Add to Cart', () => {

  beforeEach(() => {

//Acessar o site
  cy.visit('https://www.saucedemo.com/v1/index.html')

//Login com credenciais válidas
  cy.get('#user-name').type('standard_user')
  cy.get('input#password').type('secret_sauce')
  cy.get('input#login-button').click()
  cy.url().should('include','inventory')
  .and('not.contain','product')
  })

  // Dado que estou logado com credenciais válidas
it('Adicionar um item ao carrinho', () => {
 //Quando clico no ADDtoCart do item Sauce Labs Backpack
  cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').should('have.text', 'ADD TO CART')
  cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
//Então no icone carrinho é add o valor 1
  cy.xpath('//*[@id="shopping_cart_container"]/a/span').should('contain.text', '1')
  .and('be.visible')
  
  })

// Dado que estou logado com credenciais válidas
//Quanto clico no Add to cart do item Sauce Labs Backpack
//Então no icone carrinho é add o valor 1
//Quando clico no REMOVE do item Sauce Labs Backpack
//Então no icone carrinho é excluido o valor

it('Remover um item do carrinho', () => {
  cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').should('have.text', 'ADD TO CART')
  cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
  cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').should('contain.text','REMOVE')
  cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
  cy.xpath('//*[@id="shopping_cart_container"]/a/span').should('not.exist')
  cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').should('have.text', 'ADD TO CART')
  .and('be.visible')
    
  })

})

///////////////////////////////////////////// Checkout Completo ////////////////////////////////////////////////
describe('Checkout Completo', () => {

it('Teste Checkout válido', () => {

//Dado que estou no site
cy.visit('https://www.saucedemo.com/v1/index.html')

//e logado com credenciais válidas
cy.get('#user-name').type('standard_user')
cy.get('input#password').type('secret_sauce')
cy.get('input#login-button').click()
cy.url().should('include','inventory')
.and('not.contain','product')
   
//e clico no Add to cart do item Sauce Labs Backpack 
cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').should('have.text', 'ADD TO CART')
cy.xpath('//*[@id="inventory_container"]/div/div[1]/div[3]/button').click()
 
//e verifico se foi adicionado no icone carrinho 
cy.xpath('//*[@id="shopping_cart_container"]/a/span').should('contain.text', '1')
.and('be.visible')

//e clico para ir a página carrinho
cy.xpath('//*[@id="shopping_cart_container"]/a/span').click()

//e verifico se está na pagina do carrinho
cy.url().should('include','cart.html')

//e verifico se o produto está compatível com o solicitado
let expproduct = 'Sauce Labs Backpack'
cy.xpath('//*[@id="item_4_title_link"]/div').then( (x) => {
  let actproduct = x.text ()
       //BDD
  expect(actproduct).to.equal(expproduct)  

//e clico em chekout 
cy.get('.btn_action.checkout_button').click()

//e preencho o formulário de cadastro
cy.get('#first-name').type('Carla')
cy.get('#last-name').type('Dias')
cy.get('#postal-code').type('4585-562')
cy.get('[type="submit"]').click()

// e clico em finish
cy.get('.btn_action.cart_button').click()

//Então sou enviado para a página de checkout completo e verifico de a mensagem de agradecimento está correta
cy.url().should('include','checkout-complete')
cy.get('.complete-header').should('be.visible')

let expcheckout = 'THANK YOU FOR YOUR ORDER'
    cy.get('.complete-header').then( (x) => {
      let actchechout = x.text ()
       //TDD
      assert.equal(expcheckout,actchechout)

  })

})
})
})
