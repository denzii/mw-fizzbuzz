"use strict";

import path from "path";

export default class Environment {
	static sleep: (ms: number) => Promise<void> = (ms: number) =>  new Promise(resolve => setTimeout(resolve, ms));
}