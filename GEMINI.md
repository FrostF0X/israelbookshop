# General Guidelines for AI Agents

1. **Commit and Push Requirements:** You must commit and push your changes to a specific branch at all times after completing a significant task.
2. **Theme Version Bumping:** Every time you push, you must bump the `theme-version` meta tag located in the header of the theme file (`layout/theme.liquid`). For example, change `<meta name="theme-version" content="v1.0.0-optimized">` to `<meta name="theme-version" content="v1.0.1-optimized">`. This ensures that cache-busting and deployment tracking works properly.
