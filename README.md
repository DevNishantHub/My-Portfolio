# Portfolio Website with Tailwind CSS and PostCSS

This is a professional portfolio website for Nishant Kumar, a DevOps engineer, built with a production-ready Tailwind CSS setup.

## Tailwind CSS-like Setup

This project uses a Tailwind CSS-like approach with custom CSS for optimized styling:

1. **Production-ready build**: CSS is organized and optimized for fast loading
2. **Utility-first approach**: Uses utility classes similar to Tailwind CSS
3. **Custom styles support**: Extends the base design with custom components
4. **Responsive design**: Works seamlessly on all devices

### Development

To build the CSS:
```bash
npm run build
```

The build process combines the CSS files into a single optimized file. It works cross-platform (Windows, macOS, Linux) and is compatible with CI/CD environments like Vercel.

### Project Structure

- `/dist/css/output.css` - The production-ready CSS file
- `/src/css/input.css` - The source CSS file with Tailwind-like directives
- `/src/css/custom.css` - Custom CSS styles
- `/tailwind.config.js` - Configuration for Tailwind-compatible classes
- `/postcss.config.js` - PostCSS configuration
- `/build.js` - Cross-platform Node.js script for building the CSS

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
