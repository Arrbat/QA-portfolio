# Quality Assurance plan for TODO v1.0 application

**Table of contents**

1) [Purpose](#purpose)
2) [Requirements to be tested](#requirements-to-be-tested)
3) [Requirements NOT to be tested](#requirements-not-to-be-tested)
4) [Roles and responsibility](#roles-and-responsibility)
5) [Risk evaluation](#risk-evaluation)
6) [Metrics](#metrics)
7) [Test strategy and approach](#test-strategy-and-approach)
8) [Criteria](#criteria)
9) [Resources](#resources)
10) [Test schedule](#test-schedule)

## Purpose

The purpose of this testing plan is to ensure the Task Manager application functions correctly, maintains data integrity between users and tasks, and provides a reliable API and user interface. Primary focus is on functional correctness, error handling, and quality improvement.

## Requirements to be tested

- User registration and login.

- CRUD operations for tasks: Create, Read, Update, Delete.

- Mark tasks as completed/incompleted.

- UI/UX: input fields, buttons, error messages, proper colors/background/texts setup.

- API responses: correct HTTP codes, error messages, JSON structure.

## Requirements NOT to be tested

- Performance/Load testing — out of scope due to project size and portfolio focus on functionality and QA skills.

- Advanced UI styling — out of scope because focus is on functional correctness, not design.

## Roles and responsibility

- Team Lead: track progress, approve test plan.

- QA engineer: creates test cases, performs manual and automated testing, report bugs.

- Developer: provides bug fixes and support for testing.

## Risk evaluation

- Incorrect task-user mapping (HIGH threat level).

*Mitigation:* verify `user_id` in each operation, include regression tests.

- Server downtime (MEDIUM threat level).

*Mitigation:* Maintain local MySQL instance; backup DB regularly.

- Test data contamination (MEDIUM threat level).

*Mitigation:* Reset ***testing*** database before test runs using SQL scripts.

- API breaking changes (MEDIUM threat level).

*Mitigation:* Lock API contract; include automated API tests.

## Documentation

`tests/` - automated tests.

`docs/bug_reports/*.md` - bug reports.

`docs/checklists/*.md` - checklists.

`docs/test_cases/*.md` - test cases.

`docs/test_reports/*md` - test reports.

## Metrics

Pass rate: `number of passed test cases / total test cases * 100%`.

Bug density: `number of defects / number of test cases`.

Average time to fix: `total hours to fix defect / number of defects`.

Coverage: percentage of functional features covered by tests.

## Test strategy and approach

**Manual testing:** Execute test cases and checklists on the application UI and API.

**Automated testing:**

- Frontend unit tests using Jest + React Testing Library.

- Backend API tests using Jest + Supertest.

- End-to-end tests using Playwright.

**Main Testing types:** Functional, Positive/Negative, Regression, API

**Tools:** Node.js, MySQL, Postman/Insomnia, Jest, React Testing Library, Playwright, Markdown for documentation.

## Criteria

#### *Acceptance criteria*

- Successful registration/logins with correct user-task mapping.

- API returns proper HTTP codes and JSON responses.

- Only tasks of the logged-in user are visible.

- No unhandled exceptions or crashes.

#### *Entry criteria*

- Local server running and connected to MySQL database.

- React frontend compiled and serving correctly.

- SQL script for initial DB setup completed.

#### *Suspension criteria*

- Critical server or DB failure.

- Test environment unavailable.

#### *Resumption criteria*

- Environment restored and stable.

#### *Exit criteria*

- All planned test cases executed.

- Critical defects fixed and retested.

- Test reports documented in docs/test_reports in .md format.

## Resources

*Software resources*

- Node.js (latest LTS) — 1 copy per developer/tester.

- MySQL (local instance) — 1 copy.

- VSCode or other IDE — 1 copy per user.

*Hardware resources*

- Any development machine capable of running Node.js, MySQL, and browser.

*Human resources*

- 1 QA Engineer (manual + automation).

- 1 Developer for support/fix.

*Time resources*

2 weeks for all testing activities.

*Financial resources*

None

## Test schedule

- Majority of tests must be described, executed, documented as soon as possible.

Deadline: 2 weeks from the test plan publication

*Possible schedule:*

- 3-4 days for Manual Testing and bug reporting

- 5 days for Automated tests (frontend, backend)

- 5 days for CI/CD configuration, final documentation and test reporting
