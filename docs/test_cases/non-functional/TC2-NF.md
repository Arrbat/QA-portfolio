### Test Case: Pages accessibility with zoom

---

**ID:** TC2-NF

**Section:** Accessibility, Visual integrity  

**Type:** Manual  

**Priority:** Low (2/5)  

**Estimate:** 10 min  

#### Preconditions

- Application and backend server are running.  

- Tested page (Login page, Tasks page, etc) is fully loaded from server.  

#### Steps and Expected Results

| Step | Action | Expected Result |
|------|---------|-----------------|
| 1 | Zoom page (Ctrl+) to 200% | Page's layout is not broken: buttons, input fields, texts are visible and usable without any defects comparing to normal zoom (100%) |
| 2 | Zoom page (Ctrl-) to 50% | Same result as in previous step |

**Status:** Passed