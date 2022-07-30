import signupPage from "../support/pages/signup";

describe("signup", function () {
  before(function (){
    cy.fixture("singnup.json")
      .then(function (signup){
        this.signup = signup;
      })
  })
  context("quando um novo usuario realiza o cadastro", function () {
    
    before(function () {
      cy.task("removeUser", this.signup.success.email).then(function (result) {
        console.log(result);
      });

      signupPage.go();
    });

    it("então deve cadastrar um novo usuário com sucesso", function () {
      signupPage.form(this.signup.success);
      signupPage.submit();
      signupPage.toast.shouldHaveText(
        "Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!"
      );
    });
  });

  context("quando um usuario ja cadastrado tenta realizar um novo cadastro",
    function () {
      before(function () {
        cy.postUser(this.signup.success)
        // signupPage.removeUser(dadosCadastro);
        // signupPage.insertUser(dadosCadastro);
        signupPage.go();
      });

      it("então não deve cadastrar o usuário", function () {
        signupPage.form(this.signup.success);
        signupPage.submit();
        signupPage.toast.shouldHaveText("Email já cadastrado para outro usuário.");
      });
    }
  );
  context("quando o e-mail é incorreto",
    function () {
      before(function () {
        signupPage.go();
      });

      it("deve exibir a mensagem Informe um email válido", function () {
        signupPage.form(this.signup.email_inv);
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
          
          this.signup.short_password.password = p

          signupPage.form(this.signup.short_password);
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
