import { el } from "./elements";
import toast from "../../components/toast";
import alertfieldForm from "../../components/alert";
import header from "../../components/header";

class DashPage {
  constructor() {
    this.toast = toast;
    this.alertfieldForm = alertfieldForm;
    this.header = header;
  }

  calendarShouldBeVisible (){
    cy.get(el.calendar, {timeout: 7000})
      .should('be.visible')
  }

  selectDay(appointmentDate){

    let today = new Date()
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    const target = new RegExp('^'+ appointmentDate.getDate() + '$', 'g')

    let monthName
    switch (appointmentDate.getMonth()) {
      case 0: monthName = 'Janeiro'
        break
      case 1: monthName = 'Fevereiro'
        break
      case 2: monthName = 'março'
        break
      case 3: monthName = 'Abril'
        break
      case 4: monthName = 'Maio'
        break
      case 5: monthName = 'Junho'
        break
      case 6: monthName = 'Julho'
        break
      case 7: monthName = 'Agosto'
        break
      case 8: monthName = 'Setembro'
        break
      case 9: monthName = 'Outubro'
        break
      case 10: monthName = 'Novembro'
        break
      case 11: monthName = 'Dezembro'  
        break      
       
    }

    if (today.getDate() === lastDayOfMonth.getDate()) {
      cy.log('Estamos no ultimo dia do mês')
      cy.get(el.nextMonthButton, {timeout: 7000})
        .should('be.visible')
        .click()

      cy.log(appointmentDate.getMonth())
      cy.contains(el.monthTitle, monthName)
        .should('be.visible')
        
    } else {
      cy.log('Não estamos no ultimo dia do mês')      
        
    }

    // cy.log(today.toString())
    // cy.log(lastDayOfMonth.toString())

    cy.contains(el.monthTitle, monthName)
        .should('be.visible')

    cy.contains(el.day, target)
      .should('be.visible')
      .click({ force: true })
  }

  apointmentShouldBeVisible (customer, hour){
    cy.contains('div', customer.name, {timeout: 7000})
      .should('be.visible')
      .parent()
      .contains(el.boxHour, hour)
      .should('be.visible')
  }
}

export default new DashPage();
