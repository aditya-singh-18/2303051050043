const fs = require('fs');
const path = require('path');

// Server se notifications lekar unko priority aur date ke hisab se sort karke top 10 dikhana
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts.slice(1).join('=').trim();
          if (key) {
            process.env[key] = val;
          }
        }
      });
    }
  } catch (err) {
    console.error('Failed to parse .env file:', err.message);
  }
}

loadEnv();

// Categories ko priority weight assign karna
const CATEGORY_WEIGHTS = {
  'Placement': 3,
  'Result': 2,
  'Event': 1
};

// Sorter function: Type aur date/recency use karke compare karna
function compareNotifications(a, b) {
  const weightA = CATEGORY_WEIGHTS[a.Type] || 0;
  const weightB = CATEGORY_WEIGHTS[b.Type] || 0;

  if (weightB !== weightA) {
    return weightB - weightA;
  }

  const timeA = new Date(a.Timestamp).getTime();
  const timeB = new Date(b.Timestamp).getTime();
  return timeB - timeA;
}

// Fetch karke prioritized list print karne ka function
async function runPriorityInbox() {
  const token = process.env.AFFORDMED_TOKEN;
  const apiUrl = 'http://4.224.186.213/evaluation-service/notifications';

  if (!token) {
    console.error('Error: AFFORDMED_TOKEN is not set.');
    process.exit(1);
  }

  console.log(`Fetching notifications from ${apiUrl}...`);

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errText}`);
    }

    const payload = await response.json();
    const list = payload.notifications || [];

    console.log(`Successfully fetched ${list.length} notifications.`);

    const sorted = [...list].sort(compareNotifications);
    const top10 = sorted.slice(0, 10);

    console.log('\n=================== TOP 10 PRIORITY NOTIFICATIONS ===================');
    console.table(top10.map((item, idx) => ({
      Rank: idx + 1,
      ID: item.ID,
      Type: item.Type,
      Message: item.Message,
      Timestamp: item.Timestamp
    })));
    console.log('======================================================================\n');

  } catch (error) {
    console.error('Failed to fetch or compute priority notifications:', error.message);
  }
}

if (require.main === module) {
  runPriorityInbox();
}

module.exports = {
  compareNotifications,
  CATEGORY_WEIGHTS
};
