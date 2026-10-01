# npm Release

## Release target

The first application-consumable package version is `0.1.0`.

The package is published as the public scoped npm package `@animedownloader/ui`.

## Publication workflow

`.github/workflows/publish.yml` publishes when a Git tag matching `v*` is pushed.

The workflow:
1. installs the pinned pnpm/Node versions;
2. installs from the lockfile;
3. runs lint, typecheck, unit tests, and build;
4. verifies that the git tag exactly matches `package.json.version`;
5. runs `npm pack --dry-run`;
6. publishes to npm.

The publication job intentionally uses `ubuntu-latest`. This is separate from the repository Browser runner because npm Trusted Publishing currently supports GitHub-hosted runners, not self-hosted runners.

## npm Trusted Publishing setup

Before the first publish, configure a GitHub Actions trusted publisher for `@animedownloader/ui` in the npm package settings.

Use these values:

- publisher: GitHub Actions
- repository owner: `Hennanoyo`
- repository: `animedownloader-ui`
- workflow filename: `publish.yml`
- environment: none

Allow direct `npm publish` for this publisher.

The workflow already grants `id-token: write`, and the package metadata contains the exact GitHub repository URL required by npm.

No long-lived npm publish token is stored in the repository.

## Release procedure

For a new version:

1. update `package.json.version`;
2. update migration/release notes when the public contract changes;
3. merge and verify the version change on `main`;
4. create the matching git tag, for example `v0.1.0`;
5. let the publish workflow validate and publish the tag.

The tag must exactly match the package version. A mismatched tag fails before publication.

## Application handoff

After npm reports the new package version as available, activate `Hennanoyo/animedownloader#383` against that exact version.

The application must complete representative Select adoption before removing its legacy primitive.

## Security boundary

Do not move this publish job onto the self-hosted Browser runner. npm Trusted Publishing uses GitHub-hosted runners for GitHub Actions.

Do not replace Trusted Publishing with a long-lived npm token unless the publication model is deliberately changed and the package/repository documentation is updated together.
