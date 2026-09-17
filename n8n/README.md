# n8n orchestration

Start FastAPI from the repository root: `uvicorn backend.app.main:app --reload`.

Start n8n locally (for example `npx n8n`), then import `paytm_growth_copilot_workflow.json` from the n8n workflow menu. Execute it with **Manual Trigger**.

The first workflow node defines `baseUrl`, defaulting to `http://localhost:8000`; change that one value for another FastAPI host. Browser-based/cloud n8n cannot reach your computer's `localhost`; expose FastAPI through a secure reachable URL in that case.
