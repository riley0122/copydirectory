/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use strict";

import { program } from "commander";
import fs from "node:fs";
import path from "node:path";

program
    .name("CopyDirectory")
    .version("1.0.0")
    .description("A simple CLI to copy one directory into another directory")

const copyDirectory = (from, to, options) => {
    const originalPath = path.resolve(from);
    const newPath = path.resolve(to);

    if (!options.quiet) console.log(`Copying ${originalPath} to ${newPath}`);
    if (!fs.existsSync(originalPath))
    {
        if (!options.quiet) console.error(`from directory (${from}) doesn't exist!`);
        return
    }
}

program.command("cp")
       .description("Copy a directory.")
       .argument("<from>", "The directory to copy.")
       .argument("<to>", "Where the directory will be afterwards.")
       .option("-Q, --quiet","Don't output anything to the console.")
       .option("-O, --OverWrite", "Overwrite existing directectory (and its contents) if target/to directory alread exists.")
       .action(copyDirectory)

program.helpCommand(true)

program.parse(process.argv);
