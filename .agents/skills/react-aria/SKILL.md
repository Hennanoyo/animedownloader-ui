---
name: "react-aria"
description: "Build accessible UI components with React Aria Components. Use when developers mention React Aria, react-aria-components, accessible components, or need unstyled accessible primitives. Provides documentation for building custom accessible UI with hooks and components."
license: "Apache-2.0"
compatibility: "Requires React project with react-aria-components installed."
metadata:
  author: "Adobe"
  website: "https://react-aria.adobe.com/"
---

# React Aria Components

React Aria Components is a library of unstyled, accessible UI components that you can style with any CSS solution. Built on top of React Aria hooks, it provides the accessibility and behavior without prescribing any visual design.

## Documentation Structure

The references/ directory contains detailed documentation organized as follows:

### Guides

- Collections: many components display a collection of items with keyboard navigation and selection.
- Customization: React Aria provides a flexible compositional API and also supports the lower level Hook-based API for more control over rendering and behavior.
- Drag and Drop: React Aria collection components support mouse, touch, keyboard, and screen reader accessible drag and drop.
- Forms: integrate React Aria with HTML forms, validation, and form libraries.
- Framework setup: integrate React Aria with a React framework.
- Getting started: install React Aria and build a first component.
- Quality: apply the accessibility, internationalization, and interaction principles.
- Selection: handle selection events and selection state.
- Styling: build custom designs because React Aria does not prescribe visual styles.
- Testing: test React Aria components and applications.
- Working with AI: use React Aria documentation and tooling with AI coding assistants.

### Components

Read the matching official component page when you need its API, props, examples, or accessibility notes:
- Select
- ComboBox
- ListBox
- Popover
- FocusScope

### Low-level Hook API

When repository rules require direct low-level control, read the matching hook documentation:
- useSelect
- useComboBox
- useListBox
- useOption
- useOverlay
- useFocusRing
- mergeProps

React Aria low-level hooks provide accessibility and interaction behavior while leaving DOM structure and styling to the component author.

### React Stately

React Stately supplies state models that pair with React Aria behavior. For Select/ComboBox work, inspect the state API used by the primitive, especially selection, collections, focus strategy, input value, and overlay state.

This repository keeps the React Aria behavior layer and React Stately state layer explicit rather than hiding them behind another abstraction without a documented reason.

## Component Authoring Rule

Use this Skill together with the repository AGENTS.md and component contracts.

- React Aria + React Stately are the default low-level foundation here.
- React Aria Components is optional and must not reduce required DOM, layout, styling, or state control.
- Prefer direct Hook + State composition when tighter low-level control is required.

## Official references

- https://react-aria.adobe.com/ai
- https://react-aria.adobe.com/llms.txt
- https://react-aria.adobe.com/Select/useSelect.md
- https://react-aria.adobe.com/ComboBox/useComboBox.md