import {el} from './elements'

class AlertfieldForm {
    alertHaveText(expecteText) {
      cy.contains(el.alert, expecteText).should('be.visible')
    }  
}

export default new AlertfieldForm();
