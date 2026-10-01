# AI Session Protocol

For a fresh unscoped continuation request:
1. Read AGENTS.md.
2. Read this protocol.
3. Inspect GitHub live state for Issues, PRs, branches, reviews, and CI.
4. Read docs/project-status.md.
5. Read docs/ai-session-handoff.md.
6. Resolve the current Development Issue.
7. Classify the current increment and discover relevant Skills.
8. Record the Skill Reference Plan in the Development Issue before implementation.
9. Read every Required Skill, the applicable project overlay, and exact vendored references.
10. Only after the implementation preflight is satisfied may implementation begin.

Do not read every Skill by default. Skill discovery selects relevant knowledge; the preflight gate requires the selected knowledge to be read.

The required discovery/record/read procedure is defined in docs/development/skill-reference-workflow.md. That document is the authoritative home for Skill selection and preflight rules.

Use one long-lived Development Issue for the main direction. A Phase transition does not create another Issue.

Use:
one coherent increment → task classification → Skill Reference Plan → preflight → one branch → focused implementation → focused validation → PR → monitor CI → merge → target-branch verification → current-state reconciliation

GitHub is the live work record. Current-state documents describe integrated state only.

Document roles:
- AGENTS.md: concise repository rules and gates.
- docs/ai-session-protocol.md: fresh-session state machine.
- docs/ai-session-handoff.md: replace-in-place resume snapshot.
- docs/project-status.md: integrated state and current Issue pointer.
- docs/development/ai-agent-workflow.md: detailed execution lifecycle.
- docs/development/skill-reference-workflow.md: authoritative Skill discovery, selection, and preflight procedure.
- docs/architecture/design-system.md: UI architecture and ownership contract.
- .agents/skills/: repository-controlled Skills and vendored references.
- GitHub Issues/PRs: live plan, Skill Reference Plans, acceptance criteria, evidence, and history.

One durable rule should have one authoritative home.
