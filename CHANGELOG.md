# Changelog

## [Unreleased]

## [0.7.0] - 2026-07-09
### Added
- Added Cypress end-to-end validation for the password generator's main flows
- Added Docker Compose support for running Cypress against the application service
- Added OpenSpec capabilities for Cypress runtime validation and Node dependency maintenance

### Changed
- Pinned the Docker runtime to Node.js 22.23.1 within the existing Node 22 major line
- Updated Vue, Vite, Bootstrap, Less, Terser, ESLint, and related frontend tooling
- Stabilized the Vite development server configuration around port 1234
- Updated release documentation and project metadata for v0.7.0

### Fixed
- Removed an unused Webpack plugin dependency that pulled vulnerable transitive packages
- Updated Yarn resolutions to keep the dependency audit clean
- Fixed the ESLint configuration so linting runs correctly inside the Docker app context

## [0.6.1] - 2026-04-22
### Changed
- Updated dependency lockfile and transitive toolchain packages
- Refreshed build-related dependencies used by the frontend stack
- Runtime behavior and user-facing features remain unchanged in this release

## [0.6.0] - 2026-04-10
### Added
- Password composition controls for lowercase, uppercase, numbers, and special characters
- Quantity controls for numeric and special characters in generated passwords
- New UI component structure with dedicated cards for header, configuration, result, and security tips

### Changed
- Redesigned the interface with a more modern and responsive Bootstrap layout
- Enforced dynamic minimum password length based on selected composition rules
- Improved copy action feedback with explicit visual confirmation
- Upgraded Vite to 6.4.2 and aligned related tooling

### Fixed
- Prevented inconsistent copy button label restoration after visual feedback animation
- Improved generated password consistency when user configuration changes

## [0.5.0] - 2025-05-23
### Added
- Restructured source folder to `/app`
- Migrated codebase to Vue 3 Composition API
- Improved password generation logic and dynamic icon behavior

### Changed
- Updated packages and dependencies to fix CVEs
- Upgraded Node.js version in Docker container from 18 to 22
