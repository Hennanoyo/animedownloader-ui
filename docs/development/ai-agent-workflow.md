# AI Development Workflow

Work in the smallest coherent increment under the current Development Issue.

Lifecycle:
1. inspect current Issue/PR/CI state;
2. create one dedicated branch;
3. implement;
4. run focused validation;
5. open a PR;
6. monitor required CI to terminal state;
7. fix failures on the same work claim;
8. merge when repository protections permit;
9. verify target branch;
10. reconcile current-state documents.

The Development Issue owns the finite Phase plan. A PR implements an increment within the current Phase.

Primitive Browser tests belong here and should assert public interaction/accessibility behavior instead of incidental DOM structure.

The Browser workflow uses:
`runs-on: ${{ vars.CI_BROWSER_RUNNER || 'ubuntu-latest' }}`

This repository can therefore use the same self-hosted runner label as `animedownloader` by configuring the repository variable, without hard-coding a machine-specific label.
