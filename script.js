document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Keyboard & Escape Key Management
  var menuToggle = document.getElementById('menuToggle');
  var primaryNav = document.getElementById('primaryNav');

  function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true');
    primaryNav.classList.add('is-open');
  }

  function closeMenu(returnFocus) {
    if (menuToggle.getAttribute('aria-expanded') === 'true') {
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      if (returnFocus) {
        menuToggle.focus();
      }
    }
  }

  menuToggle.addEventListener('click', function () {
    var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu(false);
    } else {
      openMenu();
    }
  });

  // Close menu when navigation link is clicked
  var navLinks = primaryNav.querySelectorAll('.nav-item');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu(false);
    });
  });

  // Escape key closes menu and returns focus
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeMenu(true);
    }
  });

  // 2. Download Resume Demo Alert
  var downloadBtn = document.getElementById('downloadResumeBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      e.preventDefault();
      alert('PDF resume download placeholder. The PDF file will be uploaded in Activity 2.');
    });
  }

  // 3. Contact Form Accessible Validation
  var contactForm = document.getElementById('contactForm');
  var nameInput = document.getElementById('senderName');
  var emailInput = document.getElementById('senderEmail');
  var messageInput = document.getElementById('senderMessage');

  var nameError = document.getElementById('nameError');
  var emailError = document.getElementById('emailError');
  var messageError = document.getElementById('messageError');
  var formSuccess = document.getElementById('formSuccess');

  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    nameInput.setAttribute('aria-invalid', 'false');
    emailInput.setAttribute('aria-invalid', 'false');
    messageInput.setAttribute('aria-invalid', 'false');

    formSuccess.textContent = '';
    formSuccess.classList.remove('is-visible');
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var isValid = true;
    var firstInvalidField = null;

    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      nameInput.setAttribute('aria-invalid', 'true');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = nameInput;
    }

    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email address.';
      emailInput.setAttribute('aria-invalid', 'true');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = emailInput;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.setAttribute('aria-invalid', 'true');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = emailInput;
    }

    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter a message.';
      messageInput.setAttribute('aria-invalid', 'true');
      isValid = false;
      if (!firstInvalidField) firstInvalidField = messageInput;
    }

    if (!isValid) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
    } else {
      formSuccess.textContent = 'Validation successful! This demo form does not transmit email. Please contact devshrestha1010@gmail.com directly.';
      formSuccess.classList.add('is-visible');
      contactForm.reset();
    }
  });
});