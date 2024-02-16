/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use strict";

import { program } from "commander";

program
    .version("1.0.0")
    .description("A simple CLI to copy one directory into another directory")

program.parse(process.argv);