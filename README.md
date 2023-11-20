# file2codeowner

This is a simple tool to help you find out who is responsible for a file in a codebase.

In case there are more than one team/person reposible for a file, it will take the first one.

## Usage

Clone the repository and run:

```bash
bun install
bun link
```

and then, within the repository with codeowners where you want to analyze what files belongs to whom, run:

```bash
ag -l --ts 'React' packages --ignore '*.spec*' --ignore "*.stories*" | file2codeowner --json
```
