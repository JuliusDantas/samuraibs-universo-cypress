import loginPage from "../support/pages/login";
import dashpage from "../support/pages/dashboard";

describe("login", function () {
  context.only("quando o usuário já está cadastrado", function () {
    const dadosCadastro = {
      name: "julius teste login",
      email: "juliustestelogin@email.com",
      password: "pwd@123",
      is_provider: true,
    };

    beforeEach(function () {
      cy.task("removeUser", dadosCadastro.email).then(function (result) {
        console.log(result);
      });
      loginPage.insertUser(dadosCadastro);
      
      loginPage.go();
    });

    it("então deve logar com sucesso", function () {
      loginPage.form(dadosCadastro);
      loginPage.submit()
      dashpage.header.usertLogedIn(dadosCadastro.name)
    });
  });
  context("não preenche nenhum dos campos",
    function () {

      const alertMessages = [
        'E-mail é obrigatório',
        'Senha é obrigatória'
      ]     
      
      before(function () {
        loginPage.go();
        loginPage.submit();   
      });

      alertMessages.forEach(function (m) {
        it("deve exibir: " + '' + m.toLocaleLowerCase(), function () {
          loginPage.alertfieldForm.alertHaveText(m);                
          
        });
      })

      
    }
  );
  context("quando o e-mail é incorreto",
    function () {
      const dadosCadastro = {
        name: "Teste email incorreto",
        email: "juliusteste3email.com",
        password: "pwd@123",
        is_provider: true,
      };
      
      before(function () {
        loginPage.go();
      });

      it("deve exibir a mensagem Informe um email válido", function () {
        loginPage.form(dadosCadastro);
        loginPage.submit();
        loginPage.alertfieldForm.alertHaveText('Informe um email válido')
        
      });
    }
  );
  context("quando o campo senha estiver em branco",
    function () {
      const dadosCadastro = {
        name: "Teste email incorreto",
        email: "juliusteste3@email.com",
        password: 'pwd@123',
        is_provider: true,
      };
      
      before(function () {
        loginPage.go();
      });

      it("deve exibir a mensagem Senha é obrigatória", function () {
        loginPage.form2(dadosCadastro);
        loginPage.submit();
        loginPage.alertfieldForm.alertHaveText('Senha é obrigatória')
        
      });
    }
  );

});
