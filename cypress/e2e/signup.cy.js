import signupPage from "../support/pages/signup";

describe("signup", function () {
  context("quando um novo usuario realiza o cadastro", function () {
    const dadosCadastro = {
      name: "julius teste 3",
      email: "juliusteste3@email.com",
      password: "pwd@123",
      is_provider: true,
    };

    before(function () {
      cy.task("removeUser", dadosCadastro.email).then(function (result) {
        console.log(result);
      });

      signupPage.go();
    });

    it("então deve cadastrar um novo usuário com sucesso", function () {
      signupPage.form(dadosCadastro);
      signupPage.submit();
      signupPage.toast.shouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("quando um usuario ja cadastrado tenta realizar um novo cadastro",
    function () {
      const dadosCadastro = {
        name: "julius teste 3",
        email: "juliusteste3@email.com",
        password: "pwd@123",
        is_provider: true,
      };

      before(function () {
        signupPage.removeUser(dadosCadastro);
        signupPage.insertUser(dadosCadastro);
        signupPage.go();
      });

      it("então não deve cadastrar o usuário", function () {
        signupPage.form(dadosCadastro);
        signupPage.submit();
        signupPage.toast.shouldHaveText("Email já cadastrado para outro usuário.");
      });
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
        signupPage.go();
      });

      it("deve exibir a mensagem Informe um email válido", function () {
        signupPage.form(dadosCadastro);
        signupPage.submit();
        signupPage.alertfieldForm.alertHaveText('Informe um email válido')
        
      });
    }
  );

  context("quando a senha tem o tamanho inválido",
    function () {

      const passwords = [
        '1',
        'a2',
        'ab3',
        'abc4',
        'abcd5'
      ]     
      
      beforeEach(function () {
        signupPage.go();
      });

      passwords.forEach(function (p) {
        it("deve exibir a mensagem Pelo menos 6 caracteres: " + '' + p, function () {
          const dadosCadastro = {
            name: "Teste email incorreto",
            email: "juliustest3@email.com",
            password: p
            
          };

          signupPage.form(dadosCadastro);
          signupPage.submit();          
          
        });
      })

      afterEach(function () {
        signupPage.alertfieldForm.alertHaveText("Pelo menos 6 caracteres");
      })
      
    }
  );
  context("não preenche nenhum dos campos",
    function () {

      const alertMessages = [
        'Nome é obrigatório',
        'E-mail é obrigatório',
        'Senha é obrigatória'
      ]     
      
      before(function () {
        signupPage.go();
        signupPage.submit();   
      });

      alertMessages.forEach(function (m) {
        it("deve exibir: " + '' + m.toLocaleLowerCase(), function () {
          signupPage.alertfieldForm.alertHaveText(m);                
          
        });
      })

      
    }
  );
 
});
