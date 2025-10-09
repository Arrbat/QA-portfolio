### Unauthorized Deletion of Another User's Task (IDOR/BOLA)

**ID:** BR1-security

**Summary:** Unauthorized deletion of another user's task via API DELETE request.

**Description:**

Actual result: When sending a DELETE request to `http://localhost:3001/tasks/x` for a task owned by another user, the server either deletes the task or responds incorrectly, violating access control.

Expected result: The server responds with `403 Forbidden`, preventing deletion of tasks owned by other users.

Requirement: The system must enforce object-level access control, preventing users from modifying or deleting tasks that they do not own.

**Reproducibility:** Always

**Severity:** Critical

**Priority:** ASAP

**Symptom:** Data corruption/loss; security violation

**Workaround:** None - It's impossible for user to bypass vulnerability without server-side fix

**References:** [TC1-NF](https://github.com/Arrbat/QA-portfolio/tree/main/docs/test_cases/non-functional/TC1-NF.md)

**Comments:** This is an Insecure Direct Object Reference (IDOR/BOLA) vulnerability. Ensure that ownership checks are implemented before any delete operation.

#### Steps to Reproduce

1) Authenticate as `User A` (obtain valid login, password).

2) Identify a task ID `x` that belongs to `User B`.

3) Send a DELETE request to http://localhost:3001/tasks/x using User A's credentials.

4) Observe the server response:

- *Incorrect behavior:* Task is deleted or server responds with 2xx.

- *Correct behavior:* Server responds with 403 Forbidden and task remains intact.

5) Optional check: Send DELETE request to a task owned by `User A` and ensure it succeeds (200 OK).

##### Attachments

Valid cmd command for executing `step 3` that may be used:

```powershell
powershell curl.exe -s -X DELETE "http://localhost:3001/tasks/valid_task_id"
```