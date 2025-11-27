import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
  port: Number(process.env.MAILTRAP_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export default class EmailService {
  public static async sendResetPasswordEmail(
    email: string,
    code: string,
    userName: string
  ): Promise<void> {
    const mailOptions = {
      from: `"${process.env.MAILTRAP_FROM_NAME || 'E-commerce Support'}" <${process.env.MAILTRAP_FROM_EMAIL || 'noreply@ecommerce.com'}>`,
      to: email,
      subject: "Recuperação de Senha - Código de Verificação",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .code-box {
              background-color: #f0f0f0;
              border: 2px dashed #4CAF50;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
              border-radius: 5px;
            }
            .code {
              font-size: 32px;
              font-weight: bold;
              color: #4CAF50;
              letter-spacing: 5px;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 10px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Recuperação de Senha</h1>
            </div>
            <div class="content">
              <p>Olá, <strong>${userName}</strong>!</p>
              
              <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
              
              <p>Use o código abaixo para redefinir sua senha:</p>
              
              <div class="code-box">
                <div class="code">${code}</div>
              </div>
              
              <div class="warning">
                <strong>⚠️ Atenção:</strong>
                <ul>
                  <li>Este código é válido por <strong>15 minutos</strong></li>
                  <li>Não compartilhe este código com ninguém</li>
                  <li>Se você não solicitou esta alteração, ignore este email</li>
                </ul>
              </div>
              
              <p>Se você tiver alguma dúvida, entre em contato com nosso suporte.</p>
              
              <p>Atenciosamente,<br>
              <strong>Equipe E-commerce</strong></p>
            </div>
            <div class="footer">
              <p>Este é um email automático, por favor não responda.</p>
              <p>&copy; ${new Date().getFullYear()} E-commerce. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Olá, ${userName}!
        
        Recebemos uma solicitação para redefinir a senha da sua conta.
        
        Código de verificação: ${code}
        
        Este código é válido por 15 minutos.
        
        Se você não solicitou esta alteração, ignore este email.
        
        Atenciosamente,
        Equipe E-commerce
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email de recuperação enviado para: ${email}`);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      throw new Error("Falha ao enviar email de recuperação");
    }
  }

  public static async sendPasswordChangedConfirmation(
    email: string,
    userName: string
  ): Promise<void> {
    const mailOptions = {
      from: `"${process.env.MAILTRAP_FROM_NAME || 'E-commerce Support'}" <${process.env.MAILTRAP_FROM_EMAIL || 'noreply@ecommerce.com'}>`,
      to: email,
      subject: "Senha Alterada com Sucesso",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 0 0 5px 5px;
            }
            .success-box {
              background-color: #d4edda;
              border: 2px solid #4CAF50;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
              border-radius: 5px;
              color: #155724;
            }
            .warning {
              background-color: #fff3cd;
              border-left: 4px solid #ffc107;
              padding: 10px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Senha Alterada</h1>
            </div>
            <div class="content">
              <p>Olá, <strong>${userName}</strong>!</p>
              
              <div class="success-box">
                <h2>🎉 Sua senha foi alterada com sucesso!</h2>
                <p>Agora você já pode fazer login com sua nova senha.</p>
              </div>
              
              <div class="warning">
                <strong>⚠️ Você não fez essa alteração?</strong>
                <p>Se você não reconhece esta ação, entre em contato com nosso suporte imediatamente em: <strong>suporte@ecommerce.com</strong></p>
              </div>
              
              <p>Atenciosamente,<br>
              <strong>Equipe E-commerce</strong></p>
            </div>
            <div class="footer">
              <p>Este é um email automático, por favor não responda.</p>
              <p>&copy; ${new Date().getFullYear()} E-commerce. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Olá, ${userName}!
        
        Sua senha foi alterada com sucesso!
        
        Se você não reconhece esta ação, entre em contato com nosso suporte imediatamente.
        
        Atenciosamente,
        Equipe E-commerce
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email de confirmação enviado para: ${email}`);
    } catch (error) {
      console.error("Erro ao enviar email de confirmação:", error);
    }
  }
}
