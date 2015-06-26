/**
 * Created by christhoval on 01/22/15.
 */

smtp = {
    username: 'christhoval',   // eg: server@gentlenode.com
    password: 'c706180t',   // eg: 3eeP1gtizk5eziohfervU
    server: 'smtp.gmail.com',  // eg: mail.gandi.net
    port: ''
}

gmail = {
    username: 'cristobal06barba',
    password: 'gqbbuwbahejiuqge',
    server: 'smtp.gmail.com',
    port: ''

}

smtp = gmail;

process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;