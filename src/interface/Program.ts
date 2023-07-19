import stoppable from "stoppable";
import { Application as ExpressApplication } from "express";
import http from 'http';
import { Socket } from "net";

export default interface IProgram {
	clientBundlePath: string;
	asseticPath: string;
	server: stoppable.WithStop & http.Server;
	app: ExpressApplication;
	env: string;
	sockets: Set<Socket>;
}
