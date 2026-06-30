const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, '.env');

// Authentication API call karke new token .env file me write karna
function loadEnv() {
  const env = {};
  if (fs.existsSync(envFilePath)) {
    const content = fs.readFileSync(envFilePath, 'utf8');
    content.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        env[parts[0].trim()] = parts.slice(1).join('=').trim();
      }
    });
  }
  return env;
}

async function authenticate() {
  const env = loadEnv();

  const payload = {
    email: '2303051050043@paruluniversity.ac.in',
    name: 'aditya singh',
    rollNo: '2303051050043',
    accessCode: 'cJqaEB',
    clientID: '0faf0e31-36f8-4274-bd39-12ea3695c80c',
    clientSecret: 'HQbNCdNtKFJreaAa'
  };

  const authUrl = 'http://4.224.186.213/evaluation-service/auth';
  console.log(`Authenticating against ${authUrl}...`);

  try {
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${text}`);
    }

    const data = await response.json();
    const token = data.access_token;

    if (!token) {
      throw new Error('Authentication response did not contain an access_token');
    }

    console.log('Successfully authenticated! Writing token to .env...');

    let lines = [];
    if (fs.existsSync(envFilePath)) {
      lines = fs.readFileSync(envFilePath, 'utf8').split('\n');
    }

    let tokenUpdated = false;
    const updatedLines = lines.map(line => {
      if (line.startsWith('AFFORDMED_TOKEN=')) {
        tokenUpdated = true;
        return `AFFORDMED_TOKEN=${token}`;
      }
      return line;
    });

    if (!tokenUpdated) {
      updatedLines.push(`AFFORDMED_TOKEN=${token}`);
    }

    fs.writeFileSync(envFilePath, updatedLines.join('\n').trim() + '\n', 'utf8');
    console.log('Token successfully updated in .env.');

  } catch (err) {
    console.error('Authentication failed:', err.message);
  }
}

authenticate();
