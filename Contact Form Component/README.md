# Contact Form Component

A modern, responsive contact form with comprehensive JavaScript validation and beautiful UI/UX design.

## 🚀 Features

### Form Fields
- **Full Name**: Required, 2-50 characters, letters only
- **Email Address**: Required, valid email format validation
- **Subject**: Required, 5-100 characters
- **Message**: Required, 10-1000 characters with character counter
- **Submit Button**: With loading state and success feedback

### Validation Features
- ✅ **Real-time validation** on input and blur events
- ✅ **Email format validation** with comprehensive checks
- ✅ **Character limits** with visual feedback
- ✅ **Required field validation** with clear error messages
- ✅ **Input sanitization** and format checking
- ✅ **Visual error states** with shake animations

### UI/UX Features
- 🎨 **Modern design** with gradient background and glassmorphism
- 📱 **Fully responsive** - works perfectly on all screen sizes
- ⚡ **Smooth animations** and transitions
- 🎯 **Accessibility features** with proper focus states
- ⌨️ **Keyboard shortcuts** (Ctrl/Cmd + Enter to submit, Escape to reset)
- 🔄 **Loading states** with spinner animation
- ✅ **Success feedback** with animated overlay

### Technical Features
- 🔧 **ES6+ JavaScript** with class-based architecture
- 🎯 **Modular design** with clean separation of concerns
- 📊 **Character counter** with color-coded limits
- 🛡️ **Form security** with proper input sanitization
- 🌐 **Cross-browser compatibility**
- ♿ **Accessibility compliant** (WCAG guidelines)

## 📁 File Structure

```
Contact Form Component/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript validation and functionality
└── README.md           # This documentation
```

## 🛠️ Usage

### Basic Setup
1. Include the HTML structure in your page
2. Link the CSS file: `<link rel="stylesheet" href="styles.css">`
3. Include Font Awesome for icons: `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">`
4. Include the JavaScript file: `<script src="script.js"></script>`

### HTML Structure
```html
<form id="contactForm" class="contact-form" novalidate>
    <div class="form-group">
        <label for="fullName" class="form-label">
            <i class="fas fa-user"></i> Full Name *
        </label>
        <input type="text" id="fullName" name="fullName" class="form-input" required>
        <div class="error-message" id="fullNameError"></div>
    </div>
    <!-- Additional form fields... -->
</form>
```

## 🔧 Customization

### Styling
The form uses CSS custom properties and can be easily customized:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --error-color: #e53e3e;
    --success-color: #48bb78;
}
```

### Validation Rules
Modify validation rules in the JavaScript file:

```javascript
// Example: Change name minimum length
const minLength = 3; // Instead of 2
```

### API Integration
Replace the simulated API call in `submitForm()` method:

```javascript
async submitForm() {
    const formData = this.getFormData();
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return await response.json();
    } catch (error) {
        throw error;
    }
}
```

## 📱 Responsive Breakpoints

- **Desktop**: 769px and above
- **Tablet**: 481px - 768px
- **Mobile**: 480px and below

## 🎯 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- **Keyboard navigation** support
- **Screen reader** compatibility
- **Focus indicators** for all interactive elements
- **ARIA labels** and proper semantic markup
- **High contrast mode** support
- **Reduced motion** preferences respected

## 🚀 Performance Features

- **Debounced validation** to prevent excessive checking
- **Efficient DOM manipulation** with minimal reflows
- **Optimized animations** using CSS transforms
- **Lazy loading** of non-critical features

## 🔍 Validation Details

### Full Name Validation
- Required field
- 2-50 characters
- Letters, spaces, hyphens, and apostrophes only
- No consecutive spaces
- Proper trimming

### Email Validation
- Required field
- Standard email format regex
- No consecutive dots
- Cannot start or end with dots
- Comprehensive format checking

### Subject Validation
- Required field
- 5-100 characters
- No leading/trailing spaces
- Meaningful content check

### Message Validation
- Required field
- 10-1000 characters
- Real-time character counter
- Color-coded limit indicators

## 🎨 Design Features

### Visual Elements
- **Glassmorphism effect** with backdrop blur
- **Gradient backgrounds** for modern appeal
- **Smooth transitions** and hover effects
- **Error animations** (shake effect)
- **Loading spinners** and success states

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Error**: Red (#e53e3e)
- **Success**: Green (#48bb78)
- **Warning**: Orange (#f6ad55)
- **Neutral**: Gray scale (#2d3748 to #a0aec0)

## 📊 Form Data Structure

The form collects and validates the following data:

```javascript
{
    fullName: "John Doe",
    email: "john.doe@example.com",
    subject: "General Inquiry",
    message: "Hello, I have a question...",
    timestamp: "2024-01-15T10:30:00.000Z"
}
```

## 🛡️ Security Considerations

- **Input sanitization** to prevent XSS
- **Client-side validation** for UX
- **Server-side validation** recommended for production
- **CSRF protection** should be implemented
- **Rate limiting** for form submissions

## 🔧 Development

### Local Development
1. Clone or download the files
2. Open `index.html` in a web browser
3. Use browser dev tools for debugging
4. Check console for helpful messages

### Debugging
The form exposes a global `contactForm` object for debugging:

```javascript
// Check validation state
console.log(contactForm.getValidationState());

// Validate all fields
console.log(contactForm.validateAll());

// Get form data
console.log(contactForm.getFormData());
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this component.

---

**Built with ❤️ using HTML, CSS, and JavaScript** 