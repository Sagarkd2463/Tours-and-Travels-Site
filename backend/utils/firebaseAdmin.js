const admin = require('firebase-admin');
const config = require('../config/config');

const serviceAccount = {
    type: config.serviceFirebase.type,
    project_id: config.serviceFirebase.project_id,
    private_key_id: config.serviceFirebase.private_key_id,
    private_key: config.serviceFirebase.private_key,
    client_email: config.serviceFirebase.client_email,
    client_id: config.serviceFirebase.client_id,
    auth_uri: config.serviceFirebase.auth_uri,
    token_uri: config.serviceFirebase.token_uri,
    auth_provider_x509_cert_url: config.serviceFirebase.auth_provider_x509_cert_url,
    client_x509_cert_url: config.serviceFirebase.client_x509_cert_url,
    universe_domain: config.serviceFirebase.universe_domain,
};

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

module.exports = admin;