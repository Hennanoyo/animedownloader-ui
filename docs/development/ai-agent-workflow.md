# AI Development Workflow

Work in the smallest coherent increment under the current Development Issue.

Lifecycle:
1. inspect current Issue/PR/CI state;
2. classify the increment and discover relevant Skills;
3. write the Skill Reference Plan in the Development Issue;
4. read all Required Skills and exact relevant references;
5. create one dedicated branch;
6. implement;
7. run focused validation;
8. open a PR;
9. monitor required CI to terminal state;
10. fix failures on the same work claim;
11. merge when repository protections permit;
12. verify target branch;
13. reconcile current-state documents.

The Skill discovery and preflight rules are defined in docs/development/skill-reference-workflow.md. A Skill that is required for the increment must be read before implementation; unrelated Skills do not need to be loaded.

The Development Issue owns the finite Phase plan and the Skill Reference Plan for the current increment. A PR implements an increment within the current Phase and should summarize the applied Skill/reference plan.

Primitive Browser tests belong here and should assert public interaction/accessibility behavior instead of incidental DOM structure.

The Browser workflow uses:
runs-on: ${{ vars.CI_BROWSER_RUNNER || 'ubuntu-latest' }}

This repository can therefore use the same self-hosted runner label as animedownloader by configuring the repository variable, without hard-coding a machine-specific label.
