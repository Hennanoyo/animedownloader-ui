# UI Consumer Skill

Use this Skill when implementing frontend UI in `animedownloader`.

1. Search `@animedownloader/ui` for an existing primitive before writing low-level UI.
2. Read its public API and usage documentation.
3. Prefer composition over adding product logic to a primitive.
4. Keep domain behavior in `animedownloader`.
5. Do not reproduce React Aria accessibility state machines in the application when the shared primitive provides them.
6. If shared behavior is missing, extend `animedownloader-ui` instead of creating a competing primitive.
7. Add application Browser coverage for the product workflow.
8. Avoid selectors tied to undocumented internal DOM.

Decision boundary:
generic interaction → `animedownloader-ui`
domain composition → `animedownloader`
product behavior around generic interaction → shared primitive + application composition
