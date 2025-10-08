### Test Case: UX responsiveness of Tasks page

**ID:** TC2-UX  

**Section:** User Experience (UX)  

**Type:** Manual  

**Priority:** Medium (3/5)  

**Estimate:** 10 min  

**References:**  

- [Checklist for tasks page](https://github.com/Arrbat/QA-portfolio/blob/main/docs/checklists/UI_UX-tasks-page.md)

#### Preconditions

- Application and backend server are running.  

- A test user with 3 existing tasks is logged in and redirected to the Tasks page.

- Tasks page is fully loaded and all UI components are visible.

#### Steps and Expected Results

| Step | Action | Expected Result |
|------|---------|-----------------|
| 1 | Click on the “Delete” button for one of the 3 tasks. | The selected task is removed from the list without visual glitches or UI artifacts. |
| 2 | Click on the “Mark Complete” button for the two remaining tasks. | Button text changes from “Mark Complete” to “Mark Incomplete”. |
| 3 | Click again on those buttons for both tasks. | Button text reverts from “Mark Incomplete” to “Mark Complete”. |
| 4 | Modify the description field of one task by typing alphabetic characters (a–z) and digits until the visible area (≈3 lines) is filled. | Typed text appears correctly without lag or missing symbols. |
| 5 | Modify the title field of one task in the same way. | Entered text appears correctly and is displayed within the field boundaries. |
| 6 | Create a new task by entering 5 alphabetic characters (a–z) in the “Title” field and clicking the “Create” button. | A new task appears in the list with the correct title and an empty description. |

**Status:** Pending
