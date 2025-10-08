### Test Case: UI visibility validation of pages

**ID:** TC1-UI

**Section:** UI module, Visual integrity  

**Type:** Manual  

**Priority:** Medium (3/5)  

**Estimate:** 10 min  

**References:**  

- [Checklist for login page](https://github.com/Arrbat/QA-portfolio/blob/main/docs/checklists/UI_UX-login-page.md)  

- [Checklist for tasks page](https://github.com/Arrbat/QA-portfolio/blob/main/docs/checklists/UI_UX-tasks-page.md)  

#### Preconditions

- Application and backend server are running.  

- Tested page (e.g., Login page or Tasks page) is fully loaded from server.  

#### Steps and Expected Results

| Step | Action | Expected Result |
|------|---------|-----------------|
| 1 | Visually inspect the page layout. | Page layout matches design specification: header, main section, buttons/input fields are visible. |
| 2 | Check visibility of all UI elements. | All interactive elements (buttons, input fields) are displayed and not overlapped. |
| 3 | Resize browser window or use zoom (90–125%). | UI elements remain visible and properly aligned (no overlapping or disappearance). |

**Status:** Pending