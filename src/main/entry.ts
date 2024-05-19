import { protocol, app } from "electron";
import { main } from "./main";
import { schema } from "./schema";
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
protocol.registerSchemesAsPrivileged([{ scheme: "lun", privileges: { standard: true, supportFetchAPI: true, secure: true, corsEnabled: true } }]);

app.whenReady().then(() => {
  schema.init();
  main.init();
});
