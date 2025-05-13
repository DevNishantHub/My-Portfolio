# Portfolio Website

This is a professional portfolio website for Nishant Kumar, a DevOps engineer.

## Contact Form Configuration

The contact form is set up to send emails using EmailJS. To make it work, follow these steps:

1. Create an account on [EmailJS](https://www.emailjs.com/) (they have a free tier)

2. Create a new Email Service:
   - Go to "Email Services" tab
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email

3. Create an Email Template:
   - Go to "Email Templates" tab
   - Click "Create New Template"
   - Design your email template
   - Use the following variables in your template:
     - {{to_email}} - Your email address
     - {{from_name}} - Sender's name
     - {{from_email}} - Sender's email
     - {{message}} - The message content

4. Get your User ID (public key):
   - Go to "Account" > "API Keys"
   - Copy your "Public Key"

5. Update the code:
   - Open `index.html`
   - Find the EmailJS initialization code:
     ```javascript
     emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
     ```
   - Replace "YOUR_EMAILJS_PUBLIC_KEY" with your actual public key

6. Update the service and template IDs:
   - Open `js/script.js`
   - Find the emailjs.send function:
     ```javascript
     emailjs.send('default_service', 'template_contact', {
         // ...
     })
     ```
   - Replace 'default_service' with your EmailJS service ID
   - Replace 'template_contact' with your template ID

7. Test the form to ensure it works correctly.

## Features

- Responsive design
- Animated elements
- Mobile-friendly navigation
- Accessible components
- Contact form with email functionality
- Print-friendly styling

## Content Sections

- Hero section with profile
- Experience timeline (commented out to add real content)
- Projects showcase (commented out to add real content)
- Contact form
- Coming soon page for CV/resume

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS)
- JavaScript
- EmailJS for the contact form
- Font Awesome icons
