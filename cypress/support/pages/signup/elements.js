exports.el = {
    name: 'input[placeholder^="Nome"]',
    email: 'input[placeholder*="email"]',
    password: 'input[placeholder*="senha"]',
    signupButton: ('button[type="submit"]', "Cadastrar"),
    alert_email: ('small[class="alert-error"]', 'Informe um email válido'),
    alert_senha: ('small[class="alert-error"]', 'Pelo menos 6 caracteres')
    
}