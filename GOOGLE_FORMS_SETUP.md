# Google Forms Setup Guide

## Creating Your Booking Forms

1. **Go to Google Forms**: Visit [forms.google.com](https://forms.google.com)

2. **Create a New Form** for each ritual type:
   - Aufguss Ritual
   - Cold Water Immersion  
   - Breathwork & Stillness
   - Community Hot Plunge

## Recommended Form Structure

### Section 1: Personal Information
- First Name (Required)
- Last Name (Required)
- Email Address (Required)
- Phone Number (Required)

### Section 2: Emergency Contact
- Emergency Contact Name (Required)
- Emergency Contact Phone (Required)

### Section 3: Health & Safety
- Do you have any medical conditions we should be aware of? (Paragraph text)
- Any dietary requirements or allergies? (Short answer)
- Previous experience level (Multiple choice: First time, Beginner, Intermediate, Experienced)

### Section 4: Event Details
- Which event are you booking for? (Multiple choice - pre-filled based on form)
- How did you hear about us? (Multiple choice: Instagram, Friend, Google, Event, Other)
- Any special requests or questions for Amanda? (Paragraph text)

### Section 5: Agreements
- I agree to the terms and conditions and understand the risks involved (Required checkbox)
- I'd like to receive updates about future events (Optional checkbox)

## Form Settings

1. **Collect email addresses**: Turn this on
2. **Limit to 1 response**: Turn this on
3. **Edit after submit**: Allow for 1 day
4. **See summary charts**: Turn on
5. **Send respondent a copy**: Turn on

## Getting Form URLs

1. Click the "Send" button in your form
2. Click the link icon
3. Check "Shorten URL" 
4. Copy the shortened URL (e.g., https://forms.gle/abc123)

## Email Notifications

1. Go to "Responses" tab
2. Click the three dots menu
3. Select "Get email notifications for new responses"
4. This will send Amanda an email for each booking

## Updating the Website

Replace the placeholder URLs in the code with your actual Google Form URLs:

\`\`\`javascript
const GOOGLE_FORM_URLS = {
  "aufguss-a-sauna-ritual": "https://forms.gle/YourActualAufgussFormID",
  "cold-water-immersion": "https://forms.gle/YourActualColdPlungeFormID", 
  "breathwork-and-stillness": "https://forms.gle/YourActualBreathworkFormID",
  "community-hot-plunge": "https://forms.gle/YourActualHotPlungeFormID",
}
\`\`\`

## Benefits of Google Forms

- ✅ Free and reliable
- ✅ Automatic email notifications
- ✅ Easy to manage responses
- ✅ Mobile-friendly
- ✅ Integrates with Google Sheets
- ✅ No coding required
- ✅ Spam protection built-in
