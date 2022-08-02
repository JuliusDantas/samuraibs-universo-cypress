import { el } from "./elements";
import toast from "../../components/toast";
import alertfieldForm from "../../components/alert";

class ResetPassPage {

    constructor() {
        this.toast = toast;
        this.alertfieldForm = alertfieldForm;
      }
    
      go(token) {
        cy.visit("/reset-password?token=" + token);
      }

      removeUser(dadosCadastro) {
        cy.task("removeUser", dadosCadastro.email).then(function (result) {
          console.log(result);
        });
      }

      insertUser(dadosCadastro) {
        cy.request("POST", "http://localhost:3333/users", dadosCadastro).then(
          function (response) {
            expect(response.statusCode).to.equal(200);
          }
        );
      }

      form(newPass, confirmPass) {
        cy.get(el.new_password)
          .clear()
          .type(newPass) 

        cy.get(el.confirm_password)
          .clear()
          .type(confirmPass) 
      }

      form2(dadosCadastro) {
        cy.get(el.email).type(dadosCadastro.email) 
      }

      submit() {
        // cy.contains(el.changePassButton).click();
        cy.get(el.changePassButton2).should('have.text', 'Alterar senha').click();
      }
    
}

export default new ResetPassPage();