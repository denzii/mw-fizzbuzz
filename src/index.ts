"use strict";
import Program from "./util/program";

new Program()
    .registerEnvironment()
    .registerMiddleware()
    .registerStaticAssets()
    .registerRoutes()
	.registerAppEvents()
	.StartServer();
