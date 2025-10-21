### Test Case: Unauthorized Deletion of Another User's Task (IDOR/BOLA)

---

**ID:** TC1-NF

**Section:** server, security

**Type:** Manual

**Priority:** Very High (5/5)

**Estimate:** 10 min

#### Preconditions

- Backend server is running on `http://localhost:3001`.  
- Current user is authenticated.  
- At least one task exists created by another user (task ID = `x`).

#### Steps and Expected Results

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Send a DELETE request to `http://localhost:3001/tasks/x` (task belongs to another user) | Server responds with `403 Forbidden`. Task is not deleted. |
| 2 | Send a DELETE request to `http://localhost:3001/tasks/y` (task belongs to the current user) | Server responds with `200 OK`. Task is deleted successfully. |

**Status:** *Failed*

*Comment: There is a need to clarify the requirements regarding server behaviour in the case of non-standard but technically correct client requests.*