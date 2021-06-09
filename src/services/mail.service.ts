import config = require('config');

import sgMail = require('@sendgrid/mail');

interface EmailOptionsInterface {
  email : string;
  subject : string;
  message : string;
  link : string;
  button : string;
}

/**
 * Send email
 *
 * @function
 * @public
 * @async
 * @author Abdelrahman Tarek
 * @param {Object} options email options
 * @param {String} options.email to email
 * @param {String} options.subject email subject
 * @param {String} options.message email message
 * @param {String} options.link email redirect link
 * @param {String} options.button email redirect button name
 * @throws Error | ResponseError
 * @summary Send email
 */
export const sendEmail = async (options : EmailOptionsInterface) => {
  sgMail.setApiKey(config.get('SENDGRID_API_KEY'));
  const msg = {
    to: options.email,
    from: 'ketofan666@gmail.com',
    subject: options.subject,
    text: options.message,
    html: `
  <h1 align="center"> &#127973; Ketofan </h1>
  
  <h1
    style="border:none;margin:0px;padding:0px;font-family:Circular,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;text-decoration:none;color:rgb(85,85,85);font-size:32px;font-weight:bold;line-height:36px;letter-spacing:-0.04em;text-align:center"
    align="center">${options.subject}</h1> <br>
  
  <h2
    style="border:none;margin:0px;padding:7px 0px 0px;font-family:Circular,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-weight:200;text-decoration:none;color:rgb(97,100,103);font-size:17px;line-height:23px;text-align:center"
    align="center">
    ${options.message}
  </h2>
  <h3 align="center">
    </h1>
  
    <center style="border:none;margin:0px;padding:0px"><a
        href=${options.link}
        bgcolor="#0070cd"
        style="border:none;margin:0px;padding:0px;text-decoration:none;width:240px;height:44px;background-color:#0070cd;border-radius:22px;color:rgb(255,255,255);display:block"
        target="_blank">
        <table style="border:none;margin:0px;border-collapse:collapse;padding:0px;width:240px;height:44px" width="240"
          height="44" cellspacing="0" cellpadding="0">
          <tbody style="border:none;margin:0px;padding:0px" valign="middle">
            <tr style="border:none;margin:0px;padding:0px" valign="middle">
              <td style="border:none;margin:0px;padding:0px;width:22px" width="22" valign="middle"></td>
              <td
                style="border:none;margin:0px;padding:0px;font-family:Circular,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;text-decoration:none;border-radius:22px;color:rgb(255,255,255);font-size:13px;font-weight:bold;height:100%;line-height:16px;text-align:center;text-transform:uppercase"
                valign="middle" height="100%" align="center">${options.button}</td>
              <td style="border:none;margin:0px;padding:0px;width:22px" width="22" valign="middle"></td>
            </tr>
          </tbody>
        </table>
      </a>
      <div></div>
    </center>
  `,
  };

  await sgMail.send(msg);
};

const mailService = {
  sendEmail,
};

export default mailService;
