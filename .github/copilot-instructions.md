# Copilot Custom Instructions

## General Guidelines

- Keep the code clean and readable.
- Prefer clarity over cleverness.
- Use consistent indentation and naming conventions.
- Use best solutions and best practices to perform the task.
- Eliminate all redundant or unused code.
- Keep the project code clean and maintainable.
- Separate mock data from actual source code.
- Always respond in Vietnamese

## Terminal Execution (PowerShell Specific)

- ⚠️ When writing commands to be executed in a PowerShell terminal:
  - **Do NOT use `&&`** to chain commands.
  - ✅ **Use `;` instead.**

```powershell
# ❌ Incorrect
cd my-folder && npm install

# ✅ Correct
cd my-folder; npm install
```
