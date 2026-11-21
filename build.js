// Zero-dependency build: copy src/ to dist/.
// The site is plain HTML/CSS/JS, so there is nothing to bundle.
import { cpSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("src", "dist", { recursive: true });
console.log("built dist/");
