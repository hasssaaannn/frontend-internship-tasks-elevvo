// Contact Form Component with Validation
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        
        // Form fields
        this.fullNameInput = document.getElementById('fullName');
        this.emailInput = document.getElementById('email');
        this.subjectInput = document.getElementById('subject');
        this.messageInput = document.getElementById('message');
        
        // Error elements
        this.fullNameError = document.getElementById('fullNameError');
        this.emailError = document.getElementById('emailError');
        this.subjectError = document.getElementById('subjectError');
        this.messageError = document.getElementById('messageError');
        this.charCounter = document.getElementById('charCounter');
        
        // Validation state
        this.isValid = {
            fullName: false,
            email: false,
            subject: false,
            message: false
        };
        
        this.init();
    }

    init() {
        this.addEventListeners();
        this.updateCharCounter();
    }

    addEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.fullNameInput.addEventListener('input', () => this.validateFullName());
        this.fullNameInput.addEventListener('blur', () => this.validateFullName());
        
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        
        this.subjectInput.addEventListener('input', () => this.validateSubject());
        this.subjectInput.addEventListener('blur', () => this.validateSubject());
        
        this.messageInput.addEventListener('input', () => {
            this.validateMessage();
            this.updateCharCounter();
        });
        this.messageInput.addEventListener('blur', () => this.validateMessage());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    // Validation Methods
    validateFullName() {
        const value = this.fullNameInput.value.trim();
        const minLength = 2;
        const maxLength = 50;
        
        if (!value) {
            this.showError(this.fullNameInput, this.fullNameError, 'Full name is required');
            this.isValid.fullName = false;
            return false;
        }
        
        if (value.length < minLength) {
            this.showError(this.fullNameInput, this.fullNameError, `Name must be at least ${minLength} characters`);
            this.isValid.fullName = false;
            return false;
        }
        
        if (value.length > maxLength) {
            this.showError(this.fullNameInput, this.fullNameError, `Name must be less than ${maxLength} characters`);
            this.isValid.fullName = false;
            return false;
        }
        
        // Check for valid characters (letters, spaces, hyphens, apostrophes)
        const nameRegex = /^[a-zA-Z\s\-']+$/;
        if (!nameRegex.test(value)) {
            this.showError(this.fullNameInput, this.fullNameError, 'Name can only contain letters, spaces, hyphens, and apostrophes');
            this.isValid.fullName = false;
            return false;
        }
        
        // Check for consecutive spaces
        if (/\s{2,}/.test(value)) {
            this.showError(this.fullNameInput, this.fullNameError, 'Name cannot contain consecutive spaces');
            this.isValid.fullName = false;
            return false;
        }
        
        this.clearError(this.fullNameInput, this.fullNameError);
        this.isValid.fullName = true;
        return true;
    }

    validateEmail() {
        const value = this.emailInput.value.trim();
        
        if (!value) {
            this.showError(this.emailInput, this.emailError, 'Email address is required');
            this.isValid.email = false;
            return false;
        }
        
        // Check email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            this.showError(this.emailInput, this.emailError, 'Please enter a valid email address');
            this.isValid.email = false;
            return false;
        }
        
        // Additional checks for common email issues
        if (value.includes('..') || value.startsWith('.') || value.endsWith('.')) {
            this.showError(this.emailInput, this.emailError, 'Please enter a valid email address');
            this.isValid.email = false;
            return false;
        }
        
        this.clearError(this.emailInput, this.emailError);
        this.isValid.email = true;
        return true;
    }

    validateSubject() {
        const value = this.subjectInput.value.trim();
        const minLength = 5;
        const maxLength = 100;
        
        if (!value) {
            this.showError(this.subjectInput, this.subjectError, 'Subject is required');
            this.isValid.subject = false;
            return false;
        }
        
        if (value.length < minLength) {
            this.showError(this.subjectInput, this.subjectError, `Subject must be at least ${minLength} characters`);
            this.isValid.subject = false;
            return false;
        }
        
        if (value.length > maxLength) {
            this.showError(this.subjectInput, this.subjectError, `Subject must be less than ${maxLength} characters`);
            this.isValid.subject = false;
            return false;
        }
        
        // Check for excessive whitespace
        if (value.length !== value.trim().length) {
            this.showError(this.subjectInput, this.subjectError, 'Subject cannot start or end with spaces');
            this.isValid.subject = false;
            return false;
        }
        
        this.clearError(this.subjectInput, this.subjectError);
        this.isValid.subject = true;
        return true;
    }

    validateMessage() {
        const value = this.messageInput.value.trim();
        const minLength = 10;
        const maxLength = 1000;
        
        if (!value) {
            this.showError(this.messageInput, this.messageError, 'Message is required');
            this.isValid.message = false;
            return false;
        }
        
        if (value.length < minLength) {
            this.showError(this.messageInput, this.messageError, `Message must be at least ${minLength} characters`);
            this.isValid.message = false;
            return false;
        }
        
        if (value.length > maxLength) {
            this.showError(this.messageInput, this.messageError, `Message must be less than ${maxLength} characters`);
            this.isValid.message = false;
            return false;
        }
        
        this.clearError(this.messageInput, this.messageError);
        this.isValid.message = true;
        return true;
    }

    // Error Handling Methods
    showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add shake animation
        input.classList.add('shake');
        setTimeout(() => {
            input.classList.remove('shake');
        }, 500);
    }

    clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Character Counter
    updateCharCounter() {
        const currentLength = this.messageInput.value.length;
        const maxLength = 1000;
        const percentage = (currentLength / maxLength) * 100;
        
        this.charCounter.textContent = `${currentLength} / ${maxLength} characters`;
        
        // Update counter color based on usage
        this.charCounter.classList.remove('near-limit', 'at-limit');
        
        if (percentage >= 90) {
            this.charCounter.classList.add('at-limit');
        } else if (percentage >= 75) {
            this.charCounter.classList.add('near-limit');
        }
    }

    // Form Submission
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const isFullNameValid = this.validateFullName();
        const isEmailValid = this.validateEmail();
        const isSubjectValid = this.validateSubject();
        const isMessageValid = this.validateMessage();
        
        // Check if all validations pass
        if (!isFullNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            this.showFormError('Please fix the errors above before submitting');
            return false;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Simulate API call
            await this.submitForm();
            
            // Refresh the page after successful submission
            window.location.reload();
            
        } catch (error) {
            this.showFormError('Something went wrong. Please try again.');
            this.setLoadingState(false);
        }
    }

    async submitForm() {
        // Simulate API call with delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve();
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showFormError(message) {
        // Create temporary error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: #fed7d7;
            color: #c53030;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            font-weight: 600;
            border: 1px solid #feb2b2;
        `;
        
        // Insert at the top of the form
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Keyboard Shortcuts
    handleKeyboard(e) {
        // Ctrl/Cmd + Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            this.form.dispatchEvent(new Event('submit'));
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = new ContactForm();
    
    // Make it globally accessible for debugging
    window.contactForm = contactForm;
}); 