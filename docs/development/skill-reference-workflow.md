# Skill Reference Workflow

This repository does not require an AI agent to read every available Skill. It requires the agent to discover and read the Skills that are relevant to the current development task.

## Purpose

The Skill workflow exists to prevent two opposite failure modes:

- reading every Skill and wasting context on unrelated guidance;
- starting implementation before discovering a Skill that materially constrains the design or validation.

The workflow is therefore **discover → record → read → implement**.

## Required pre-implementation sequence

For any non-trivial development increment:

1. Classify the task by behavior, implementation layer, and validation needs.
2. Discover candidate Skills under the repository's .agents/skills/ tree and any project workflow references.
3. Select the Skills that are required for this increment. Mark useful but non-required Skills as optional rather than reading them by default.
4. Record the decision in the current Development Issue under **Skill Reference Plan** before implementation starts.
5. Read every Required Skill selected by the plan in full.
6. Read the project overlay documents for the selected technology or domain.
7. Open the exact vendored references needed for the implementation and validation.
8. Only after this preflight is complete may implementation begin.

Do not read unrelated Skill bodies merely to satisfy the workflow. Discovery may inspect Skill names, metadata, directory structure, or index material without loading every Skill's full content.

## Skill Reference Plan

The current Development Issue is the live record for the plan. Each increment should record:

~~~md
## Skill Reference Plan

### Task classification
- implementation area:
- behavior:
- validation:

### Required Skills
- .agents/skills/.../SKILL.md
  - why this Skill applies

### Required references
- .agents/skills/.../references/...
  - behavior/test/implementation covered

### Optional Skills
- .agents/skills/.../SKILL.md
  - useful context, not required for this increment

### Explicitly not required
- Skill or reference
  - reason it does not apply
~~~

The plan should identify exact paths rather than broad labels such as "React docs".

## Preflight gate

Implementation must not begin until all applicable Required Skills and references in the plan have been read.

If implementation reveals a previously unrecognized Skill that materially applies:

1. stop the affected implementation work;
2. add the Skill to the Issue's Skill Reference Plan;
3. read it and any required references;
4. continue only after the plan is satisfied.

A Skill Reference Plan is part of the work record, not a substitute for reading the referenced material.

## Project-specific React Aria rule

For React Aria + React Stately primitive work, the minimum preflight is:

1. .agents/skills/react-aria/SKILL.md
2. .agents/skills/react-aria-project-overlay.md
3. the exact vendored component/state/testing references relevant to the behavior

RAC-specific material is only required when RAC is actually being considered or used.

## Completion evidence

The PR description or Issue history should make it possible to determine:

- which Skills were applied;
- which references were used;
- which important Skills were intentionally not required;
- what tests validate the resulting contract.

This keeps fresh AI sessions reproducible without forcing every session to reload unrelated knowledge.
