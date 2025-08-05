export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, role, company } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: 'Email and role are required' });
  }

  console.log('Environment variables:', {
    baseId: process.env.AIRTABLE_BASE_ID,
    tableName: process.env.AIRTABLE_TABLE_NAME,
    hasApiKey: !!process.env.AIRTABLE_API_KEY
  });

  try {
    const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`;
    console.log('Request URL:', url);
    
    const requestBody = {
      records: [{
        fields: {
          'Email': email,
          'Role': role,
          'Signup Date': new Date().toISOString().split('T')[0] // YYYY-MM-DD format
        }
      }]
    };
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      console.error('Airtable API error:', responseText);
      res.status(500).json({ error: 'Airtable API error', details: responseText });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to save data', details: error.message });
  }
}
