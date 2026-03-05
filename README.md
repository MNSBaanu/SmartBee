# BeeWith

BeeWith is evolving into an AI-powered developer support platform.

Developers submit a repository, and BeeWith returns structured engineering feedback such as:
- Bugs and risk areas
- Code quality improvements
- Duplicate or repeated logic
- Hardcoded values and configuration issues
- Maintainability and architecture suggestions

## Problem We Are Solving

Many developers and small teams do not have access to continuous, high-quality code reviews. BeeWith aims to provide fast, practical feedback that helps teams ship better code with less manual effort.

## Product Vision

Build a professional but simple first version where users can:
1. Submit a Git repository
2. Trigger automated analysis
3. Receive clear findings grouped by category
4. Track issues by severity and file path

## Core Analysis Categories (MVP)

- `Bugs`: potential runtime failures, unsafe logic, missing checks
- `Code Smells`: long methods, overly complex logic, poor naming
- `Duplicate Code`: repeated blocks that should be extracted
- `Hardcoded Values`: environment-specific constants in source files
- `Improvements`: actionable refactor or architecture suggestions

## Current Repository Structure

```text
BeeWith/
	BeeWith_API/    # Backend service (in progress)
	BeeWith_Web/    # Frontend app (React + Vite)
	README.md
```

## Tech Stack (Current)

- Frontend: React, React Router, Vite
- Backend: Node.js service scaffold (`BeeWith_API`)
- Future: LLM-powered analysis engine + repository scanning pipeline

## Development Status

Project pivot in progress.

Current priority:
1. Define product scope for the developer-support use case
2. Build a clean, professional MVP flow
3. Add repository analysis and reporting modules incrementally

## Near-Term Roadmap

1. Repository submission UI
2. API endpoint to accept repo URL/upload metadata
3. Basic static checks (hardcoded values, duplicate snippets)
4. AI-generated summary report with severity tags
5. Dashboard view for findings and recommendations

## Long-Term Direction

- Pull request review assistant
- Team workspaces and history
- CI integration (GitHub/GitLab)
- Custom rule packs per project/team

## Contributing

Contributions are welcome while the MVP is being shaped.
If you want to help, open an issue with one of the following:
- Bug report
- Feature proposal
- Documentation improvement

## License

License will be finalized as part of the MVP setup.
