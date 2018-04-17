
var aws = require('aws-sdk');

// import * as aws from 'aws-sdk'

class SesHandler {
    sesConfig = {
        apiVersion: '2010-12-01',
        region:'us-west-2',
        accessKeyId: 'AKIAJYHVL7LZ3BN6FGVQ',
        secretAccessKey: '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'
    }

    ses = new aws.SES(this.sesConfig);

    sender = "Vocalist Emailer <vocalist-no-reply@vocalist.online>"
    charset = "UTF-8";
    // configuration_set = xyz

    sendEmail(recipient, subject, body_text, body_html) {
        var params = {
            Source: this.sender,
            Destination: {
                ToAddresses: [recipient]
            },
            Message: {
                Subject: {
                    Data: subject,
                    Charset: this.charset
                },
                Body: {
                    Text: {
                        Data: body_text,
                        Charset: this.charset
                    },
                    Html: {
                        Data: body_html,
                        Charset: this.charset
                    }
                }
            },
            // ConfigurationSetName: configuration_set
        };

        this.ses.sendEmail(params, function(err, data) {
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
