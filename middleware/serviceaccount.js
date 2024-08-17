const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Path to your service account JSON key file
const keyPath = path.join(__dirname, 'dazzling-tensor-432520-t4-a2eec2aeff99.json');

// Load the service account credentials
const auth = new google.auth.GoogleAuth({
  keyFile: keyPath,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({
    version: 'v3',
    auth,
    timeout: 30000 // 30 seconds
  });

module.exports = drive;
