# TSPY Repository Refresh Plan

This document records the working plan for the repository refresh: the conventions we follow, the time diversification approach, and the pull request execution order. It exists so any contributor can understand how the history and review process were set up and keep maintaining the repository the same way going forward.

## Goals

1. Rebuild the remote from a clean slate: fresh root commit, clean remote main, old remote branches and artifacts removed.
2. Rework community and repository files to a consistent standard: MIT license, contributing guide, code of conduct, security policy, GitHub issue and pull request templates, and package metadata.
3. Deliver the work as a series of small, single purpose pull requests that are easy to review and merge one by one.
4. Spread commit timestamps across the previous six day window with realistic, varied times instead of bursts.

## Conventions

### Commit messages

Commits follow Conventional Commits:

```
<type>: <short imperative summary in lowercase>

<optional body explaining the why>
```

Types in use:

| Type | Purpose |
| --- | --- |
| feat | New user or developer facing capability |
| fix | Bug fix or correction of wrong content |
| docs | Documentation only changes |
| chore | Tooling, metadata, maintenance, no behavior change |

Style rules for all repository text:

- No emojis anywhere: not in commits, pull requests, issues, README, or templates.
- No em dashes in prose. Use commas, colons, or parentheses instead.
- Commit summaries are lowercase and imperative.
- One logical change per commit and per pull request.

### Branching and pull requests

- One branch and one pull request per logical change, each branched independently from main.
- Each pull request contains exactly one commit of its own so review stays simple.
- Every pull request touches a disjoint set of files, so pull requests can be merged in any order with no conflicts.
- Pull requests are merged by the maintainer manually, one at a time.
- Use rebase and merge or create a merge commit when merging. Avoid squash and merge, which replaces authored commits and loses the intentional commit timestamps.
- Pull request bodies use the repository pull request template.

### Time diversification

Commits are authored across the previous six day window ending now, with each day holding one or more commits at plausible hours (roughly 09:00 to 22:30) and varied minute and second offsets. Timestamps are chronological and consistent with the order changes were made, so the history reads as normal steady development.

## File inventory

### Root community files

| File | Plan | Type |
| --- | --- | --- |
| LICENSE | MIT license with copyright `Copyright (c) 2026 tspy contributors`, line breaks between legal clauses | chore |
| CONTRIBUTING.md | Expanded guide: prerequisites, install, dev commands, testing, commit conventions, PR process, issue guidance | docs |
| CODE_OF_CONDUCT.md | Rebuilt as a clean, complete conduct policy: pledge, standards, responsibilities, scope, enforcement, attribution | docs |
| SECURITY.md | New file: supported versions, reporting process, response expectations | docs |
| PLAN.md | This file: the refresh plan and maintenance conventions | docs |

### Root configuration

| File | Plan | Type |
| --- | --- | --- |
| package.json | Add name, private, packageManager pin, engines, and shared typecheck and test scripts while dropping the obsolete pnpm field | chore |
| pnpm-workspace.yaml | Fix invalid placeholder key (allowBuilds with prose value) to `onlyBuiltDependencies: [esbuild]`, matching the pnpm 11 settings location | fix |
| .gitignore | Ignore local agent state (.freebuff) | chore |

### GitHub templates and automation

| File | Plan | Type |
| --- | --- | --- |
| .github/PULL_REQUEST_TEMPLATE.md | Extend current template: description, type checklist, related issues, test steps, checklist sections | docs |
| .github/ISSUE_TEMPLATE/bug_report.md | Rewrite from the existing file: clearer sections for repro steps, expected vs actual, environment, logs | docs |
| .github/ISSUE_TEMPLATE/feature_request.md | Rewrite from the existing file: problem statement, proposed solution, alternatives, additional context | docs |
| .github/ISSUE_TEMPLATE/config.yml | New: blank issues disabled, contact links pointing to the readme and the code of conduct | chore |
| .github/workflows/ci.yml | New: pnpm setup with cache, install, typecheck, and tests on push and pull request | feat |

### Documentation

| File | Plan | Type |
| --- | --- | --- |
| README.md | Title directly under the logo, remove the lightning bolt heading before Why TSPY, remove the em dash in the layout bullet, expand the project structure block so the server directory shows its contents, add status badges | docs |
| docs/README.md | Replace the default create next app text with a short real overview of the docs site, its stack, and dev commands | docs |

### Package metadata

Every package under packages/ gets:

- description: one line, accurate for the package
- license: MIT
- repository, bugs, homepage fields pointing at this repository
- keywords for discovery
- engines pinned to node 20 or later

| PR | Packages |
| --- | --- |
| 1 | tspy (core framework) |
| 2 | @tspy/dev and create-tspy-app |
| 3 | @tspy/clerk, @tspy/better-auth, @tspy/workos, @tspy/supabase, @tspy/firebase (auth and data) |
| 4 | @tspy/prisma, @tspy/drizzle, @tspy/kysely, @tspy/sql (databases) |
| 5 | @tspy/openai, @tspy/anthropic, @tspy/google, @tspy/ollama (llm providers) |
| 6 | @tspy/celery, @tspy/dramatiq, @tspy/rq (background jobs) |

### Hygiene

| Change | Type |
| --- | --- |
| Remove tracked build artifact docs/package-lock.json from the bootstrap commit and guard docs/.gitignore against reintroducing it | chore |
| Delete stale local and remote branches left from the previous history | chore |

## Execution order

1. Bootstrap a fresh root commit on a clean local main and force-push it to the remote.
2. Create all pull requests below, one commit each, branched independently from main. They can be reviewed and merged in any order since their file sets are disjoint.

| # | Branch | Title | Type |
| --- | --- | --- | --- |
| 1 | docs/plan | docs: add repository refresh and maintenance plan | docs |
| 2 | chore/license | chore: update license to 2026 with contributors attribution | chore |
| 3 | fix/pnpm-workspace | fix: replace invalid allowbuilds key in pnpm workspace | fix |
| 4 | chore/package-metadata | chore: add root package metadata and shared scripts | chore |
| 5 | docs/code-of-conduct | docs: add code of conduct | docs |
| 6 | docs/contributing | docs: expand contributing guide with workflow and conventions | docs |
| 7 | docs/security | docs: add security policy | docs |
| 8 | docs/pr-template | docs: expand pull request template with checklist sections | docs |
| 9 | docs/bug-template | docs: rewrite bug report issue template | docs |
| 10 | docs/feature-template | docs: rewrite feature request issue template | docs |
| 11 | chore/issue-config | chore: disable blank issues and add contact links | chore |
| 12 | feat/ci-workflow | feat: add ci workflow for typecheck and tests | feat |
| 13 | docs/readme-overhaul | docs: rework readme title structure and project layout | docs |
| 14 | docs/site-readme | docs: replace docs site placeholder readme | docs |
| 15 | chore/core-meta | chore: add package metadata to tspy core | chore |
| 16 | chore/dev-meta | chore: add package metadata to dev and cli packages | chore |
| 17 | chore/auth-meta | chore: add package metadata to auth and data packages | chore |
| 18 | chore/db-meta | chore: add package metadata to database packages | chore |
| 19 | chore/llm-meta | chore: add package metadata to llm provider packages | chore |
| 20 | chore/jobs-meta | chore: add package metadata to background job packages | chore |
| 21 | chore/hygiene | chore: guard against committing docs lockfile artifact | chore |

3. After the last merge, verify: commit dates spread across the window, no emojis or em dashes in tracked files, all pull requests merged, clean git status.

## Versioning and publishing

Packages are currently versioned at 0.1.0 and consumed from the workspace. When publishing to npm starts:

- Use changesets or a similar tool to manage versions and changelogs per package.
- Cut releases through a release pull request so versions and changelogs are reviewed like code.
- Tag releases as package@version, for example tspy@0.1.0.
- Keep package.json metadata (description, license, repository, keywords) accurate at publish time.

## Maintenance

Going forward, keep the same standard: one purpose per pull request, Conventional Commits, no emojis, no em dashes, and descriptions that explain the why. New packages should land with their package.json metadata filled in the same pull request that adds the code.
