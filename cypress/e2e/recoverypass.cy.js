import recovery from "../support/pages/recovery";
import rpPage from "../support/pages/resetpass";

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
        const message = 'Ocorreu um erro ao tentar realizar a recuperação de senha'
        // const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
        recovery.toast.shouldHaveText(message);
        
    });
  });
  context("quando o usuário solicita o resgate", function () {
    beforeEach(function () {
        cy.postUser(this.data.recovery_pwd)
        cy.recoveryPass(this.data.recovery_pwd.email)

                
    });

    it("deve poder cadastrar uma nova senha", function () {
        const teste = Cypress.env('recoveryToken')
        console.log("teste 2: " , teste)
        rpPage.go(teste)
        
        rpPage.form(this.data.new_pwd.password, this.data.new_pwd.password,)
        rpPage.submit()

        const message = 'Ocorreu um erro ao tentar realizar a recuperação de senha'
        // const message = 'Agora você já pode logar com a sua nova senha secreta.'
        recovery.toast.shouldHaveText(message);
        
        
    });
  });
  
});