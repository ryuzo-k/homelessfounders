# Airtable Setup for Homeless Founders Waitlist

## Step 1: Create Airtable Base
1. Go to [airtable.com](https://airtable.com)
2. Create a new base called "Homeless Founders"
3. Create a table called "Waitlist"

## Step 2: Set up Table Columns
Create these columns in your Waitlist table:
- **Email** (Single line text)
- **Role** (Single select: Founder, Host, Both)
- **Company** (Single line text)
- **Timestamp** (Date & time)
- **Source** (Single line text)

## Step 3: Get API Credentials
1. Go to [airtable.com/api](https://airtable.com/api)
2. Select your "Homeless Founders" base
3. Copy your Base ID (starts with "app...")
4. Get your API key from [airtable.com/account](https://airtable.com/account)

## Step 4: Update the Website
In `index.html`, replace these values:
```javascript
const AIRTABLE_BASE_ID = 'YOUR_BASE_ID'; // Replace with your actual base ID
const AIRTABLE_TABLE_NAME = 'Waitlist'; // Keep as 'Waitlist'
const AIRTABLE_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
```

## Security Note
⚠️ **Important**: The API key will be visible in the browser. For production, consider:
- Using Airtable Forms instead
- Setting up a simple backend proxy
- Using environment variables in a build process

## Testing
1. Fill out the form on your website
2. Check your Airtable base to see if the data appears
3. Check browser console for any errors
