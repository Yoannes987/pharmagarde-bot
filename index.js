const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Affichage du code QR dans les lignes de commande pour se connecter
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('=== SCANNE CE CODE QR AVEC TON WHATSAPP ===');
});

client.on('ready', () => {
    console.log('Le Bot PharmaGarde est en ligne et opérationnel !');
});

// Logique des réponses automatiques
client.on('message', async msg => {
    const text = msg.body.toLowerCase().trim();

    // 1. Message d'accueil
    if (text === 'garde' || text === 'bonjour' || text === 'salut') {
        const welcomeMessage = `🌟 *Bienvenue sur PharmaGarde Togo !* 🌟\nTrouver votre pharmacie de garde à Lomé en 3 secondes.\n\n*Écrivez le NUMÉRO de votre zone :*\n\n*1* : Centre / Bè / Nyékonakpoè\n*2* : Hédzranawoé / Kégué / Forever\n*3* : Bè Kpota / Adakpamé\n*4* : Adidogomé / Segbé / Lankoouvi\n*5* : Djidjolé / Totsi / Agbalépédogan\n*6* : Avédji / Totsi\n*7* : Grand Agoè (Assiyéyé, Cacavéli)\n*8* : Nord Agoè (Sogbossito, Zongo, Adétikopé)\n*9* : Sanguéra / Zossimé / Légbassito\n*10* : Baguida / Avépozo / Djagblé`;
        await msg.reply(welcomeMessage);
    }

    // 2. Réponse pour la Zone 1
    if (text === '1') {
        const zone1Message = `🏥 *Pharmacies de garde - Zone 1 (Centre / Bè / Nyékonakpoè) :*\n\n🔹 *PHARMACIE HANOUKOPE*\n📞 Tél : 70 49 96 63\n📍 Av. de la Nouvelle Marche\n\n🔹 *PHARMACIE 31EME ARRONDISSEMENT*\n📞 Tél : 96 32 97 71\n📍 Bd. du 13 Janvier, près de FIATA\n\n🔹 *PHARMACIE CHÂTEAU-D'EAU*\n📞 Tél : 71 33 88 88\n📍 Près du Château d'eau de Bè\n\n🛵 *Besoin d'une livraison urgente ?* Répondez *LIVRER* pour commander.`;
        await msg.reply(zone1Message);
    }
});

client.initialize();
