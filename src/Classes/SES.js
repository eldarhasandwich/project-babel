
var aws = require('aws-sdk');

class SesHandler {
    sender = "Example Name <Example@gmail.com>"
    // configuration_set = xyz
    charset = "UTF-8";
    ses = new aws.SES();

    sendEmail(recipient, subject, body_text, body_html) {
        var params = {
            Source: sender,
            Destination: {
                ToAddresses: [recipient]
            },
            Message: {
                Subject: {
                    Data: subject,
                    Charset: charset
                },
                Body: {
                    Text: {
                        Data: body_text,
                        Charset: charset
                    },
                    Html: {
                        Data: body_html,
                        Charset: charset
                    }
                }
            },
            // ConfigurationSetName: configuration_set
        };

        ses.sendEmail(params, function(err, data) {
            if(err) {
                console.log(err.message);
            } else {
                console.log("Email sent! Message ID: ", data.MessageID)
            }
        })

    }

}

var SESHandler = new SesHandler();

export default SESHandler
