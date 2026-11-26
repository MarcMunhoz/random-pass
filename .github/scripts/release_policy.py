"""Calculate the next random-pass release tag from Git history."""

import argparse
import json
import re
import subprocess


STABLE_VERSION = re.compile(r"(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)")


def git(*args):
    return subprocess.check_output(["git", *args], text=True)


def read_at(revision, path):
    return git("show", f"{revision}:{path}")


def version_parts(version):
    if not isinstance(version, str) or not STABLE_VERSION.fullmatch(version):
        raise ValueError(f"Expected an X.Y.Z version, got {version!r}")
    return tuple(map(int, version.split(".")))


def version_at(revision):
    version = json.loads(read_at(revision, "app/package.json"))["version"]
    version_parts(version)
    return version


def release_baseline(revision):
    tags = git("tag", "--merged", revision, "--list", "v*").splitlines()
    stable_versions = [tag[1:] for tag in tags if STABLE_VERSION.fullmatch(tag[1:])]
    return max(stable_versions, key=version_parts) if stable_versions else version_at(revision)


def commit_subjects(message):
    lines = message.splitlines()
    if not lines:
        return
    yield lines[0]
    if re.search(r" \(#\d+\)$", lines[0]):
        # GitHub's default squash message lists the original commit subjects.
        yield from (line[2:] for line in lines[1:] if line.startswith("* "))


def expected_version(base, messages):
    major, minor, patch = version_parts(base)
    bump = 0
    for message in messages:
        if re.search(r"^BREAKING(?: |-)CHANGE:", message, re.MULTILINE):
            return f"{major + 1}.0.0"
        for subject in commit_subjects(message):
            match = re.match(r"^([a-z]+)(\([^\r\n)]+\))?(!)?:", subject)
            if not match:
                continue
            kind, scope, breaking = match.groups()
            if breaking:
                return f"{major + 1}.0.0"
            if kind == "feat":
                bump = 2
            elif kind in {"fix", "perf"} or (kind == "chore" and scope == "(dependencies)"):
                bump = max(bump, 1)
    if bump == 2:
        return f"{major}.{minor + 1}.0"
    if bump == 1:
        return f"{major}.{minor}.{patch + 1}"
    return base


def publication_tag(before, after):
    previous = release_baseline(before)
    messages = git("log", "-z", "--format=%B", f"{before}..{after}").split("\0")
    current = expected_version(previous, messages)
    return f"v{current}" if current != previous else None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base")
    parser.add_argument("head")
    args = parser.parse_args()
    try:
        tag = publication_tag(args.base, args.head)
        if tag:
            print(tag)
    except (ValueError, KeyError, subprocess.CalledProcessError) as error:
        parser.exit(1, f"Release validation failed: {error}\n")


if __name__ == "__main__":
    main()
