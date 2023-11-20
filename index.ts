import Codeowners from "codeowners";

async function getFilePaths() {
  for await (const chunk of Bun.stdin.stream()) {
    // chunk is Uint8Array
    // this converts it to text (assumes ASCII encoding)
    const chunkText = Buffer.from(chunk).toString();
    return chunkText;
  }
}

const filepaths = await getFilePaths();

function buildOwnerMap() {
  const repos = new Codeowners();

  const identity = (x: unknown) => x;

  const owners: Record<string, Array<string>> = {};

  filepaths
    ?.split("\n")
    .filter(identity)
    .forEach((filepath) => {
      const owner = repos.getOwner(filepath)[0];
      if (owner) {
        owners[owner] = owners[owner] || [];
        owners[owner].push(filepath);
      }
    });

  return owners;
}

if (Bun.argv.includes("--count")) {
  Object.keys(buildOwnerMap()).forEach((owner) => {
    console.log(`${owner}: ${buildOwnerMap()[owner].length}`);
  });
} else if (Bun.argv.includes("--json")) {
  console.log(buildOwnerMap());
} else {
  console.log(`Usage: echo "files" | file2owner --count | --json`);
}
