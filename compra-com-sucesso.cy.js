/// <reference types= "Cypress"/>

describe('Teste E2E - Realizando compras com sucesso', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.get('.title').should('contain', 'Products')

        // Ordenando produto do menor para o maior valor:
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

        // Validando a ordenação dos produtos:
        cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .inventory_item_label').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > [data-test="inventory-item-description"] > .inventory_item_label').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(3) > [data-test="inventory-item-description"] > .inventory_item_label').should('contain','Sauce Labs Bolt T-Shirt')
       
        // Adicionando produtosa ao carrinho:
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        // Checagem da quantidade de produtos adicionados ao carrinho:
        cy.get('.shopping_cart_link').should('have.text','3')

        // Checagem no carrinho:
        cy.get('.shopping_cart_link').click()
        cy.get(':nth-child(3) > .cart_item_label > [data-test="inventory-item-desc"]')
        cy.get(':nth-child(4) > .cart_item_label > [data-test="inventory-item-desc"]')
        cy.get(':nth-child(5) > .cart_item_label > [data-test="inventory-item-desc"]')

        //Checkout:
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('Teste Primeiro Nome')
        cy.get('[data-test="lastName"]').type('Teste Segundo Nome')
        cy.get('[data-test="postalCode"]').type('13737015')
        cy.get('[data-test="continue"]').click()

        // Verificando produtos no checkout:
        cy.get(':nth-child(3) > .cart_item_label > [data-test="inventory-item-desc"]')
        cy.get(':nth-child(4) > .cart_item_label > [data-test="inventory-item-desc"]')
        cy.get(':nth-child(5) > .cart_item_label > [data-test="inventory-item-desc"]')

        // Checagem no valor total:
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')

        cy.get('[data-test="finish"]').click()

        cy.get('.complete-header').should('have.text', 'Thank you for your order!')



    });
});