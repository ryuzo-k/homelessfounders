export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, role, company } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: 'Email and role are required' });
  }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            'Email': email,
            'Role': role,
            'Company': company || '',
            'Timestamp': new Date().toISOString(),
            'Source': 'Website'
          }
        }]
      })
    });

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      throw new Error('Airtable API error');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
}
