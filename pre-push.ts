import { KomodoClient, Types } from "komodo_client";
import "dotenv/config";
import { exit } from "process";

async function main() {
  const komodo = KomodoClient("https://komodo.evercode.se", {
    type: "api-key",
    params: {
      key: process.env.API_KEY!,
      secret: process.env.API_SECRET!,
    },
  });
  try {
    const id = "komodo-resource-sync";
    const res = await komodo.write("RefreshResourceSyncPending", {
      sync: id,
    });
    const updates = res.info?.resource_updates ?? [];
    if (updates.length > 0) {
      console.error("Updates are pending", updates);
      exit(1);
    }
    exit(0);
  } catch (e) {
    console.log("error", e);
    exit(1);
  }
}
main();
