import { faker } from '@faker-js/faker';
import { Context } from 'mocha';

describe('signup', function() {

   context('Quando o usuário é novato.', function(){

        const dadosCadastro = {
            name: "julius teste 3",
            email: "juliusteste3@email.com",
            password: 'pwd@123',
            is_provider: true
        }

        before(function() {
            cy.task('removeUser', dadosCadastro.email)
                .then(function(result) {
                    console.log(result)
                })
        })

        it('deve cadastrar um novo usuário com sucesso SEM FAKER', function() {  
            cy.visit('/signup')      
            
            cy.get('input[placeholder="Nome"]').type(dadosCadastro.name)
            cy.get('input[placeholder="E-mail"]').type(dadosCadastro.email, {force: true})
            cy.get('input[placeholder="Senha"]').type(dadosCadastro.password, {force: true})
    
            
            cy.intercept('POST', '/users', {
                statusCode: 200
            }).as('postUser')
    
            //Clica no botão Cadastrar
            cy.contains('button[type="submit"]', 'Cadastrar').click()
    
            cy.wait('@postUser')
    
            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text','Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    
            // cy.wait(10000)
            // cy.get('body')
            
        })         

   })

   context('Qunado o e-mail já existe', function(){
    const dadosCadastro = {
        name: "julius teste 3",
        email: "juliusteste3@email.com",
        password: 'pwd@123',
        is_provider: true
    }

    before(function() {
        cy.task('removeUser', dadosCadastro.email)
            .then(function(result) {
                console.log(result)
            })
        cy.request(
            'POST', 
            'http://localhost:3333/users', 
            dadosCadastro
        ).then(function(response) {
                expect(response.status).to.eq(200)
            })
    })

    it('então não deve cadastrar o usuário', function() { 
        cy.visit('/signup')
        
        //Preenche os campos do formulário
        cy.get('input[placeholder="Nome"]').type(dadosCadastro.name, {force: true})
        cy.get('input[placeholder="E-mail"]').type(dadosCadastro.email, {force: true})
        cy.get('input[placeholder="Senha"]').type(dadosCadastro.password, {force: true})

        //Clica no botão Cadastrar
        cy.contains('button[type="submit"]', 'Cadastrar').click()

        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text','Email já cadastrado para outro usuário.')

        // cy.wait(10000)
        // cy.get('body')
            
        })
    })   
        

//    it('deve cadastrar um novo usuário COM FAKER', function() {
        
//         cy.visit('/signup')

//         const firstName= faker.name.firstName()
//         const lastName = faker.name.lastName()
//         const dadosCadastrofake = {
//             //name: 'Julius Dantas 10',
//             name: faker.name.findName(firstName, lastName),
//             //name3: faker.name.firstName + ' ' + faker.name.lastName,
//             email:faker.internet.email(),
//             pwd: faker.internet.password()
//         }
//         //Preenche os campos do formulário
//         cy.get('input[placeholder="Nome"]').type(dadosCadastrofake.name)
//         cy.get('input[placeholder="E-mail"]').type(dadosCadastrofake.email, {force: true})
//         cy.get('input[placeholder="Senha"]').type(dadosCadastrofake.pwd, {force: true})

//         //Clica no botão Cadastrar
//         cy.contains('button[type="submit"]', 'Cadastrar').click()

//         cy.get('.toast')
//             .should('be.visible')
//             .find('p')
//             .should('have.text','Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

//         // cy.wait(10000)
//         // cy.get('body')
        
//     }) 

       

    // it('deve remover o usuário cadastrado e realizar novo cadastro', function() {         
        
    //     cy.task('removeUser', dadosCadastro.email)
    //         .then(function(result) {
    //             console.log(result)
    //         })

    //     //Chamada da página
    //     cy.visit('/signup')

    //     //Preenche os campos do formulário
    //     cy.get('input[placeholder="Nome"]').type(dadosCadastro.name, {force: true})
    //     cy.get('input[placeholder="E-mail"]').type(dadosCadastro.email, {force: true})
    //     cy.get('input[placeholder="Senha"]').type(dadosCadastro.password, {force: true})

    //     //Clica no botão Cadastrar
    //     cy.contains('button[type="submit"]', 'Cadastrar').click()

    //     cy.get('.toast')
    //         .should('be.visible')
    //         .find('p')
    //         .should('have.text','Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

    //     // cy.wait(10000)
    //     // cy.get('body')
        
    // })  
    
})