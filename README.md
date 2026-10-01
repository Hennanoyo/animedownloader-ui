# animedownloader-ui

Independent low-level UI system for animedownloader.

The design-system foundation uses React Aria + React Stately for accessible interaction and state behavior. Product/domain composition remains in the animedownloader application repository.

## Development consumption

The application consumes this repository through a pinned Git submodule at `web/vendor/animedownloader-ui`. The checked-out package is built locally and linked into the application during development and CI.

The submodule commit is the authoritative application compatibility boundary. npm publication is not required for application development or CI.
