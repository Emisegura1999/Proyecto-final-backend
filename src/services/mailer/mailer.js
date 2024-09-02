const nodemailer = require("nodemailer");
const configObject = require("../../config/env.config.js");
const { logger } = require("../../middleware/loggerMiddleware");

class EmailManager {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: { user: configObject.mailer.mailer_user, pass: configObject.mailer.mailer_pass },
    });
  }

  async enviarCorreoCompra(email, first_name, ticket) {
    try {
      const Opt = {
        from: "Tecnoecommerce<tecnoecommerce@gmail.com>",
        to: email,
        subject: "Compra exitosa",
        html: `
          <h2>Compra realizada con exito!</h2>
          <p>Buenas tardes ${first_name}</p>
          <p>El numero de orden de tu compra es #:${ticket}</p>
          <p>Una vez se apruebe el pago, los productos seran enviados</p>
          <h3>Esperamos que disfrutes tu pedido!</h3>
        `,
      };
      await this.transporter.sendMail(Opt);
    } catch (error) {
      logger.error("Error al enviar Email:");
    }
  }

  async enviarCorreoRestableciminto(email, first_name, token) {
    const port = configObject.server.port;
    try {
      const Opt = {
        from: "Tecnoecommerce<tecnoecommerce@gmail.com>",
        to: email,
        subject: "Restablecimiento de contraseña",
        html: `
            <p>Restablecimeinto de contraseña </p>
            <p>!olvidaste tu contraseña? estimado(a) ${first_name} </p>
            <p>Codigo de confirmacion: </p>
            <strong> ${token} </strong>
            <p>Este codigo expirara en una hora</p>
            <a href="http://localhost:${port}/password">Restablecer contraseña</a>
        `,
      };
      await this.transporter.sendMail(Opt);
    } catch (error) {
      logger.error("Error al enviar el correo de restablecimiento");
    }
  }
}

module.exports = EmailManager;
