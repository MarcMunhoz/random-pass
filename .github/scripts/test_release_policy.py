import unittest
from unittest.mock import patch

import release_policy as policy


class ReleasePolicyTest(unittest.TestCase):
    def test_highest_bump_matches_reference(self):
        cases = [
            (["docs: Updates guide", "chore(tooling): Updates CI"], "2.6.2"),
            (["chore(dependencies): Updates Vue", "perf: Speeds up build"], "2.6.3"),
            (["fix: Fixes build", "feat(app): Adds a feature"], "2.7.0"),
            (["feat!: Changes API"], "3.0.0"),
            (["docs: Updates guide\n\nBREAKING CHANGE: changes API"], "3.0.0"),
            (["Promotes updates (#55)\n\n* docs: Updates notes\n* fix: Fixes build"], "2.6.3"),
            (["docs: Adds examples\n\n* feat: Example title"], "2.6.2"),
        ]
        for messages, expected in cases:
            with self.subTest(messages=messages):
                self.assertEqual(policy.expected_version("2.6.2", messages), expected)

    def test_uses_highest_stable_tag_reachable_from_base(self):
        with patch.object(policy, "git", side_effect=[
            "v2.9.9\nv2.10.0\nv3.0.0-rc.1\nv04.0.0\npreview\n",
            "fix: Fixes build\0",
        ]) as git:
            self.assertEqual(policy.publication_tag("before", "after"), "v2.10.1")
        self.assertEqual(git.call_args_list[0].args, ("tag", "--merged", "before", "--list", "v*"))

    def test_docs_only_changes_skip_publication(self):
        with patch.object(policy, "git", side_effect=["v2.6.2\n", "docs: Updates notes\0"]):
            self.assertIsNone(policy.publication_tag("before", "after"))

    def test_uses_manifest_for_initial_release_history_without_tags(self):
        with (
            patch.object(policy, "git", side_effect=["", "feat: Adds a feature\0"]),
            patch.object(policy, "read_at", return_value='{"version":"2.6.2"}') as read,
        ):
            self.assertEqual(policy.publication_tag("before", "after"), "v2.7.0")
        read.assert_called_once_with("before", "app/package.json")


if __name__ == "__main__":
    unittest.main()
