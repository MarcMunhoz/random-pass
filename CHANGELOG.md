# Changelog

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
