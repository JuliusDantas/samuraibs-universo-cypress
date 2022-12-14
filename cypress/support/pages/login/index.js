import { el } from "./elements";
import toast from "../../components/toast";
import alertfieldForm from "../../components/alert";

class loginPage {

    constructor() {
        this.toast = toast;
        this.alertfieldForm = alertfieldForm;
      }
    
      go() {
        cy.visit("/");
      }

      removeUser(dadosCadastro) {
        cy.task("removeUser", dadosCadastro.email).then(function (result) {
          console.log(result);
        });
      }

      insertUser(dadosCadastro) {
        cy.request("POST", "http://localhost:3333/users", dadosCadastro).then(
          function (response) {
            expect(response.status).to.eq(200);
          }
        );
      }

      form(dadosCadastro) {
        cy.get(el.email)
          .clear()
          .type(dadosCadastro.email), 
        cy.get(el.password)
          .clear()
          .type(dadosCadastro.password) 
      }

      form2(dadosCadastro) {
        cy.get(el.email).type(dadosCadastro.email) 
      }

      submit() {
        cy.contains(el.signupButton).click();
      }
    
}

export default new loginPage();