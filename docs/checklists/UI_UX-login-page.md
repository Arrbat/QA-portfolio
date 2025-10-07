# Login/Registration Page – Visual Layout and Interactivity

---

## UI (User Interface)

**Objective:** Validate visibility and animation of main UI components on the login/registration page.

### Preconditions

- User opens the login/registration page in a supported browser.
- Internet connection is stable.
- Page fully loaded.

### Steps

1. Observe the displayed colors of buttons, input fields, and background.  
2. Confirm all required elements are visible: login and registration buttons, username and password input fields.  
3. Observe whether the background animation loop executes smoothly within 10 seconds.

### Expected Results

1. Multiple colors are visible — the page is not monochrome.  
2. All necessary elements are present and aligned correctly.  
3. Background gradient animation runs smoothly without abrupt transitions.

---

## UX (User Experience)

**Objective:** Validate interactivity and behavior of page elements.

### Preconditions

- Page is loaded and all UI components are visible.

### Steps

1. Click the “Login” and “Register” buttons multiple times.  
2. Enter valid English credentials into the username and password fields.

### Expected Results

1. Both buttons visually respond to clicks (CSS `.onclick` style applied).  
2. Entered text appears correctly; password field masks characters with bullets (`●`).

---
