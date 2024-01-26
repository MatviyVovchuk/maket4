/* MENU BURGER */

$(".menu-burger").on("click", function () {
  $(this).toggleClass("active");
  $(".menu-nav").toggleClass("open");
});

/* SLIDER (Site development) */

$(document).ready(function () {
  var screenWidth = $(window).width();
  var $siteDevContent = $("#site_development_container .site-dev-content");
  var itemCount = $siteDevContent.find(".dev-content-item").length;

  function initializeSlider() {
    let slidesToShow = 1;

    if (screenWidth < 600) {
      slidesToShow = 1;
    } else if (screenWidth < 850) {
      slidesToShow = 2;
    } else if (itemCount > 3) {
      slidesToShow = 3;
    }

    $siteDevContent.slick({
      slidesToShow: slidesToShow,
      arrows: false,
      dots: true,
      slidesToScroll: 1,
      infinite: true,
      initialSlide: 0,
    });
  }

  function destroySlider() {
    $("#site_development_container .site-dev-content").slick("unslick");
  }

  // Initial setup
  if (screenWidth < 850 || itemCount > 3) {
    initializeSlider();
  }

  // Update on window resize
  $(window).resize(function () {
    screenWidth = $(window).width();

    if (screenWidth < 850 || itemCount > 3) {
      if (
        $("#site_development_container .site-dev-content").hasClass(
          "slick-initialized"
        )
      ) {
        destroySlider();
      }
      initializeSlider();
    } else {
      if (
        $("#site_development_container .site-dev-content").hasClass(
          "slick-initialized"
        )
      ) {
        destroySlider();
      }
    }
  });
});

/* SLIDER (Site development) */
/* SLIDER (Mentors) */

$(document).ready(function () {
  $("#student_feedback_container .feedback-content").slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 10000,
    fade: true,
    cssEase: "linear",
  });

  $("#mentors_slider_container .mentors-content").slick({
    slidesToShow: 1,
    arrows: false,
    dots: true,
    slidesToScroll: 1,
    infinite: true,
    initialSlide: 0,
  });
});

/* SMOOTH SCROLL */

$(document).ready(function () {
  // Smooth scroll to anchor links
  $('a[href^="#"]').on("click", function (event) {
    event.preventDefault();

    var target = $(this.getAttribute("href"));

    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top - $("header").outerHeight(),
        },
        1000
      );
    }
  });
});

/* REGISTRATION FORM VALIDATION */

$(document).ready(function () {
  $("#field_phone").inputmask({ mask: "+38 (999) 999-99-99" });

  const placeholderValues = savePlaceholderValues();

  // Form submit
  $("#registration_form").on("submit", function (event) {
    clearValidationStyles();

    // Check all field together
    let isFormValid = true;

    if (!validateFirstName()) {
      isFormValid = false;
    }
    if (!validateLastName()) {
      isFormValid = false;
    }
    if (!validateIntreating()) {
      isFormValid = false;
    }
    if (!validatePhone()) {
      isFormValid = false;
    }
    if (!validateEmail()) {
      isFormValid = false;
    }

    if (!isFormValid) {
      toastr.error("Форма не надіслена! Не коректні дані!");
      event.preventDefault();
      return;
    }

    toastr.success("Форма успішно надіслена!");
    clearForm();

    // Uncomment the line below to submit the form or remove event.preventDefault();
    // $(this).unbind('submit').submit();
    event.preventDefault();
  });

  // Function to save placeholder values in an array
  function savePlaceholderValues() {
    let placeholderValues = [];

    $(
      "#registration_form input[type=text], #registration_form input[type=email]"
    ).each(function () {
      placeholderValues.push($(this).attr("placeholder"));
    });

    return placeholderValues;
  }

  // Function to set placeholder values based on the provided array
  function setPlaceholderValues(placeholderValues) {
    $(
      "#registration_form input[type=text], #registration_form input[type=email]"
    ).each(function (index) {
      $(this).attr("placeholder", placeholderValues[index]);
    });
  }

  function clearForm() {
    $("#registration_form")[0].reset();
    setPlaceholderValues(placeholderValues);
  }

  function validateFirstName() {
    const nameField = $("#field_firstname");
    const nameValue = nameField.val().trim();

    if (nameValue.length < 2 || nameValue.length > 15) {
      setValidationError(
        nameField,
        "Ім'я повинно містити від 2 до 15 символів."
      );
      return false;
    }

    if (/\d/.test(nameValue)) {
      setValidationError(nameField, "Ім'я не повинно містити цифри.");
      return false;
    }

    return true;
  }

  function validateLastName() {
    const nameField = $("#field_lastname");
    const nameValue = nameField.val().trim();

    if (nameValue.length < 2 || nameValue.length > 15) {
      setValidationError(
        nameField,
        "Прізвище повинно містити від 2 до 15 символів."
      );
      return false;
    }

    if (/\d/.test(nameValue)) {
      setValidationError(nameField, "Прізвище не повинно містити цифри.");
      return false;
    }

    return true;
  }

  function validatePhone() {
    const phoneField = $("#field_phone");
    const phoneValue = phoneField.val().replace(/\D/g, ""); // Remove non-numeric characters

    if (phoneValue === "") {
      setValidationError(phoneField, "Введіть номер телефону.");
      return false;
    }

    const phoneRegex = /^\d{12}$/; // Assumes a 10-digit Ukrainian phone number with 38 phone code
    if (!phoneRegex.test(phoneValue)) {
      setValidationError(phoneField, "Введіть правильний номер телефону.");
      return false;
    }

    return true;
  }

  function validateIntreating() {
    const interestingField = $("#field_interesting");
    const interestingValue = interestingField.val().trim();

    if (interestingValue.length < 2 || interestingValue.length > 25) {
      setValidationError(
        interestingField,
        "Поле повинно містити від 2 до 25 символів."
      );
      return false;
    }

    return true;
  }

  function validateEmail() {
    const emailField = $("#field_email");
    const emailValue = emailField.val().trim();

    if (emailField === "") {
      setValidationError(phoneField, "Введіть адресу електронної пошти.");
      return false;
    }

    if (!isValidEmail(emailValue)) {
      setValidationError(
        emailField,
        "Введіть правильну адресу електронної пошти."
      );
      return false;
    }

    return true;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function setValidationError(element, message) {
    element.attr("placeholder", message).val(""); // Clear the value
    element.addClass("error");
  }

  function clearValidationStyles() {
    $("input, textarea").removeClass("error").attr("placeholder", "");
  }
});
