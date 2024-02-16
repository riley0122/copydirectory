#!/usr/bin/env node
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
    .name("cpDirectory")
    .version("1.0.1")

const copyDirectory = (from, to) => {
    const originalPath = path.resolve(from);
    const newPath = path.resolve(to);

    const options = program.opts();

    if (!options.quiet) console.log(`Copying ${originalPath} to ${newPath}`);
    if (!fs.existsSync(originalPath))
    {
        if (!options.quiet) console.error(`from directory (${from}) doesn't exist!`);
        return
    }

    if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);

    fs.readdirSync(originalPath, {withFileTypes: true}).forEach(item => {
        if (item.isDirectory())
        {
            if (options.verbose) console.log(`${item.name} is a directory`);
            copyDirectory(path.join(originalPath, item.name), path.join(newPath, item.name));
        } else
        {
            if (options.verbose) console.log(`copying ${item.name}...`);

            fs.copyFileSync(path.join(originalPath, item.name), path.join(newPath, item.name));
        }
    });
}

program
       .description("Copy a directory.")
       .argument("<from>", "The directory to copy.")
       .argument("<to>", "Where the directory will be afterwards.")
       .option("-Q, --quiet","Don't output anything to the console.")
       .option("-O, --OverWrite", "Overwrite existing directectory (and its contents) if target/to directory alread exists.")
       .option("--verbose", "Log things to the console that otherwise wouldn't be logged.")
       .action(copyDirectory)

program.helpCommand(true)

program.parse(process.argv);
