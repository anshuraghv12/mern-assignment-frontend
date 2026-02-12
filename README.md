# Frontend Assignment – State Management & Design Exercise

This repository contains a small, intentionally simplified Next.js + Redux example.

The purpose of this exercise is to understand how you reason about state changes, data flow, and maintainability when working with an existing system.

---

## Duration
**45–60 minutes max** 

---

## What’s provided
- A minimal Next.js app using the App Router
- A Redux slice managing subscriptions
- A mock backend API implemented using Next.js route handlers

---

## API details (important)

The backend API is already implemented and should be treated as **fixed**.

### API code location
/app/api/subscriptions/route.ts

### API URL (when running locally)
/api/subscriptions

### API behavior
- **GET /api/subscriptions**  
  Returns the current list of subscriptions

- **POST /api/subscriptions**  
  Adds a new **active** subscription

- **PATCH /api/subscriptions**  
  Cancels one active subscription (if present)

### Data storage
The data is stored **in memory on the server** (module-level variable).

This means:
- Data resets when the dev server restarts
- It is not persisted in a database
- This is intentional for the purpose of the exercise

Please do **not** modify the API code.

---

## Your tasks (mandatory)

1. Review the existing frontend and state management logic.
2. Add UI controls to:
   - add an active subscription
   - cancel a subscription
3. Ensure the UI state stays consistent with the API responses.
4. Identify and explain any **design or state-related issues** you notice.

**Note:** Please ensure your code is well-documented with clear comments explaining your approach and any complex logic.

---

## Important note

If you do not immediately notice any issues, try adding a way to  
**cancel a specific subscription from the list**.

---

## Guidelines
- Minimal changes are preferred over large refactors.
- There is no single correct solution.
- Please explain *why* you made the changes you did.
- You may update this README if required to document your changes.

---

## Submission
- Fork this repository and share the link on email.

---


## Identified Design Issue

**PATCH API Limitation**:
The `PATCH /api/subscriptions` endpoint cancels the **first active subscription** it finds in the list. It does not accept an ID to cancel a specific subscription.

**Impact on UI**:
- A "Cancel" button is provided for each active row to improve UX.
- However, clicking "Cancel" on a specific item (e.g., the 3rd one) will result in the **1st active item** being cancelled on the server.
- The UI logic automatically updates to reflect the server's state (the subscription that was *actually* cancelled) rather than the one the user clicked, to ensure data truth.

**Recommendation**:
Update the backend API to accept an `id` in the `PATCH` request for precise cancellation.

---

## Optional
If you had more time, briefly mention what you would improve next and why.
