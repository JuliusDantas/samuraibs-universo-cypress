import loginPage from "../support/pages/login";
import dashpage from "../support/pages/dashboard";

describe("login", function () {
  context("quando o usuário já está cadastrado", function () {
    const dadosCadastro = {
      name: "julius teste login",
      email: "juliustestelogin@email.com",
      password: "pwd@123",
      is_provider: true,
    };

    beforeEach(function () {

      cy.postUser(dadosCadastro)
      
      // loginPage.removeUser(dadosCadastro);
      // loginPage.insertUser(dadosCadastro);
      
      loginPage.go();
    });

    it("então deve logar com sucesso", function () {
      loginPage.form(dadosCadastro);
      loginPage.submit()
      dashpage.header.usertLogedIn(dadosCadastro.name)
    });
  });
  context("quando o usuário já está cadastrado mas a senha está inválida", function () {
    let dadosCadastro = {
      name: "julius teste senha incorreta",
      email: "juliustestesenha@email.com",
      password: "pwd@123",
      is_provider: true,
    };

    beforeEach(function () {

      cy.postUser(dadosCadastro)
        .then(function(){
          dadosCadastro.password = 'abc1232@'
        })
      
      
      // loginPage.removeUser(dadosCadastro);
      // loginPage.insertUser(dadosCadastro);
      
      loginPage.go();
    });

    it("deve notificar erro de credencial", function () {
      loginPage.form(dadosCadastro);
      loginPage.submit()
      
      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
      loginPage.toast.shouldHaveText(message);
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
        it("dado que são obrigatórios deve exibir: " + '' + m.toLocaleLowerCase(), function () {
          loginPage.alertfieldForm.alertHaveText(m);                
          
        });
      })

      
    }
  );
  context("quando o e-mail é incorreto",
    function () {
      const email = [
                      "juliusteste3email.com",
                      "@email.com",
                      "juliusteste",
                      "@",
                      "111",
                      "&*&%$",
                      "xpto123"
                    ]
      
      before(function () {
        loginPage.go();
      });

      email.forEach(function (email) {
        it("não deve logar com o email: " + email, function () {
          const dadosCadastro = {email: email, password: '123'}

          loginPage.form(dadosCadastro);
          loginPage.submit();
          loginPage.alertfieldForm.alertHaveText('Informe um email válido', { wait: 7000})
          
        });
      })

      
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
