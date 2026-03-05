# BeeWith API

Backend service for BeeWith's developer-support platform.

This API powers the Code Health module in phase 1 and is designed to expand into broader developer-assistant workflows.

Phase 1 includes repository submissions and structured findings such as bugs, duplicate code, hardcoded values, and improvement suggestions.

## Current State

`BeeWith_API` is currently a scaffold and is being rebuilt after the product pivot.

At the moment, the repository contains:

```text
BeeWith_API/
  src/
    config/
  README.md
```

## Scope (MVP)

Phase 1 should provide:
1. Repository intake endpoint
2. Analysis job creation and status endpoint
3. Findings retrieval endpoint
4. Basic static checks before deeper AI analysis

Next phases should support:
1. Developer Q&A assistance on top of findings
2. Project-level coding standards and rule sets
3. Team history and repeated-pattern insights
4. Role-aware responses (Frontend, Backend, QA, DevOps, Security)

## Planned API Modules

- `Repo Intake`: validate and register repository submissions
- `Analyzer`: run scanners and orchestrate AI summaries
- `Findings`: store and return categorized issues
- `Severity Engine`: label issues by impact and confidence

## Planned Findings Format

Each issue should include:
- Category (`bug`, `duplicate`, `hardcoded`, `smell`, `improvement`)
- Severity (`low`, `medium`, `high`, `critical`)
- Role context (`frontend`, `backend`, `qa`, `devops`, `security`)
- File path
- Optional line reference
- Short explanation
- Suggested fix

## Proposed Initial Endpoints

```text
POST   /api/repos
GET    /api/repos/:repoId
POST   /api/analyses
GET    /api/analyses/:analysisId
GET    /api/analyses/:analysisId/findings
```

## Suggested Environment Variables

Use this once the API runtime is initialized:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=
GITHUB_TOKEN=
OPENAI_API_KEY=
WEB_ORIGIN=http://localhost:5173
```

## Development Plan

1. Initialize backend runtime (`package.json`, server bootstrap)
2. Add repository and analysis routes
3. Implement basic static analysis checks
4. Add AI summarization layer
5. Add persistence and report history

## Notes

This README intentionally reflects the current scaffold state and avoids assumptions about frameworks until backend setup is finalized.

## Contributing

Contributions are welcome during MVP definition.
Open issues for endpoint design, analysis rule ideas, and architecture suggestions.

## Project Ownership

Product Concept and Direction: MNS Baanu
