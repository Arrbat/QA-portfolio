### Test Case: Automated registration, API testing

---

**ID:** TC1-API

**Section:** server, API

**Type:** Automated

**Priority:** Very High (5/5)

**Estimate:** 10 min

#### Preconditions

- No preconditions

#### Steps and Expected Results

| Step | Action | Expected Result |
|------|--------|----------------|
| 1 | Execute `register-login-endpoint.test.js` with cmd command `powershell -ExecutionPolicy Bypass -Command "npx jest register-login-endpoint.test.js"` | All tests from script are passed. `Pass` marker. |

**Status:** Passed