import loginPage from "../support/pages/login";
import dashpage from "../support/pages/dashboard";
import { appointment, provider, customer } from "../support/factories/dash";

describe('dashboard', function () {

    // before(function () {
    //     cy.fixture("dash.json")
    //         .then(function (dash){
    //             this.data = dash;
                
    //     })
    // })

    context('quando o cliente faz um agendamento no app mobile', function () {

        
        before(function(){

            cy.postUser(provider)
            cy.postUser(customer)
            
            cy.apiLogin(customer)
            cy.log('Armazenando o token em variavel ' +  Cypress.env('apiToken'))          
                        
            cy.setproviderId(provider.email)            
            cy.createAppointment(appointment.hour)
        })

        it('o agendamento deve ser exibido no dashboard', function () { 
            
            const date = Cypress.env('appointmentDate')
            // loginPage.go()
            // loginPage.form(provider)
            // loginPage.submit()

            // cy.uiLogin(provider)

            cy.apiLogin(provider, true)

            dashpage.calendarShouldBeVisible()
            dashpage.selectDay(date)
            dashpage.apointmentShouldBeVisible(customer, appointment.hour)

            cy.wait(3000)

        })
    })
})

