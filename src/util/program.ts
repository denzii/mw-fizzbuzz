"use strict";

import express, { Application as ExpressApplication } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from 'http';
import stoppable from "stoppable"

import GameController from "../controller/Game";
import {Container, InRequestScope} from "typescript-ioc";
import Environment from "./environment";
import { Socket } from "net";
import ServerHelper from "./server";
import { config } from "dotenv";
import IProgram from "../interface/Program";

@InRequestScope
export default class Program implements IProgram {
	public clientBundlePath: string;
	public asseticPath: string;
	public server: stoppable.WithStop & http.Server;
	readonly app: ExpressApplication;
	readonly env: string;
	readonly sockets: Set<Socket>;	

	constructor() {
		this.clientBundlePath =  path.join(__dirname, '../www');
		this.asseticPath = path.join(__dirname, "../public");
		this.app = express();
		this.server = stoppable(http.createServer(this.app));
		this.env = String(process.env.NODE_ENV).toLowerCase();
		this.sockets = new Set<Socket>();
	}
    registerEnvironment() {
        config();
		return this;
    }
	registerMiddleware: () => Program = () => {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cookieParser());
		this.app.use(cors());
		
		return this;
	}

	registerStaticAssets: () => Program = () => {
		const serveOptions = {
			dotfiles: 'ignore',
			etag: false,
			extensions: ["html, htm", "css", "js", "png", "jpeg", "jpg", "gif", "webp", "svg"],
			index: false,
			redirect: false,
			setHeaders: (res: any, path: any, stat: any) => {
				res.set("X-Content-Type-Options", "nosniff");
				res.set('Cache-Control', 'no-store');
			}
		}

		this.app.use(express.static("www", serveOptions));
		this.app.use(express.static("public", serveOptions));
		this.app.disable("view cache");

		console.info(`All assets registered using paths: ${this.clientBundlePath} & ${this.asseticPath}`);

		return this;
	}

	registerRoutes:() => Program = () => {
		// api endpoints
		this.app.use("/game", Container.get(GameController).Router());

		console.info(`Registered All routes.`);

		return this;
	}

	registerAppEvents: () => Program = () => {
		//unhandled promise rejections notifier
		process.on('unhandledRejection', (reason, p) => {
			console.error('Unhandled Rejection at: ', p, 'reason:', reason);
			throw new Error();
		});

		//teardown connections on ctrl+c
		process.on('SIGINT', () => {
			if (this.server.listening) {
				this.EnvTeardown();
			}
		});

		this.server.on('connection', (socket) => {
			// for configurability, save a ref to the connection which can be accessed if needed
			this.sockets.add(socket);

			this.server.once('close', () => {
				console.info("Closing all connected sockets");
				this.sockets.forEach(function(value) {
					value.destroy();
				})			
			});
		});

		return this;
	}

	 StartServer: () => void = async() => {
		// express server setup
		const port: number = Number(process.env.PORT);
		if(!await ServerHelper.ensurePortFreeAsync(port)){
			throw new Error("supplied port is already in use.");
		}

		this.server.on('error', error => ServerHelper.serverOnError.bind(this, error, port));
		this.server.on('listening', ServerHelper.serverOnListen.bind(this, port));
		
		this.server.listen(port, () => process.send);

		// add this.app into the dependency injection container
		Container.bindName("app").to(this.app);
	}

	 EnvTeardown: () => void = async() => {
		try {
			this.server.close();
			this.server.stop();
			const gracefulExitDelayMs = 2000;
			console.info("All active handles have (hopefully) been killed. Gracefully exiting in " + gracefulExitDelayMs + "ms");
			await Environment.sleep(2000);
		} catch (e: any) {
			console.error(`things went wrong tearing down the app. here is your exception: ${e}`);
		}
	}
}


