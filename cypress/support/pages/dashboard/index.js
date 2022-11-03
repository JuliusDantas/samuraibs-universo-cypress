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

  selectDay(day){

    const target = new RegExp('^'+ day + '$', 'g')

    cy.contains(el.day, target)
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
