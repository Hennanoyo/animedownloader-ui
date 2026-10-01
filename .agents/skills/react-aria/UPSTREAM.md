# React Aria Agent Skill provenance

This directory preserves an official React Aria Agent Skill snapshot for repeatable AI sessions.

Source:
- Official AI page: https://react-aria.adobe.com/ai
- Upstream skill directory: https://react-aria.adobe.com/.well-known/skills/react-aria/
- Skill catalog: https://www.skills.sh/adobe/com/react-aria
- Official documentation index: https://react-aria.adobe.com/llms.txt

The upstream distribution contains a SKILL.md plus a references tree. This repository keeps the agent-facing Skill under .agents/skills/react-aria/ and a compact reference map so fresh sessions know exactly where the official low-level documentation lives.

The checked-in SKILL.md is a source-controlled snapshot of the upstream Skill guidance available during this migration task. It is not claimed to be a byte-for-byte archive of the entire downloadable bundle. Refresh it when the upstream Skill changes.

The npx skills CLI supports project-scoped Skills and can copy them into agent-specific project directories. The current project layout uses the Codex-compatible .agents/skills location so the Skill is discoverable directly from the repository.