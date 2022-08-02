import recovery from "../support/pages/recovery";
import resetpass from "../support/pages/resetpass";

describe("reoverypass", function () {
    before(function () {
        cy.fixture("recovery.json")
            .then(function (recovery){
                this.data = recovery;
        })
    })
  context("quando o usuário esquece a senha", function () {
    beforeEach(function () {
        cy.postUser(this.data.recovery_pwd)
        recovery.go();
    });

    it("então deve poder resgatar a senha por email", function () {
        
        recovery.form(this.data.recovery_pwd.email);
        recovery.submit()

        // const message = "Ocorreu um erro ao tentar realizar a recuperação de senha"
        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
        recovery.toast.shouldHaveText(message);
        
    });
  });
  context("quando o usuário solicita o resgate", function () {
    beforeEach(function () {
        cy.postUser(this.data.recovery_pwd)
        cy.recoveryPass(this.data.recovery_pwd.email)

        const token = Cypress.env('@recoveryToken')
        resetpass.go(token);

        
    });

    it("deve poder cadastrar uma nova senha", function () {       
        resetpass.form(this.data.new_pwd.password, this.data.new_pwd.password);
        resetpass.submit()

        const message = 'Agora você já pode logar com a sua nova senha secreta.'
        resetpass.toast.shouldHaveText(message);

        // cy.wait('5000')
        
    });
  });
  
});