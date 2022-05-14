import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

const API_KEY = 'my-first-backend';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Post('/create_user')
	async createUser(@Body() body, @Req() request: Request): Promise<string> {
		this.checkApiKey(request);
		return await this.appService.createUser(body);
	}

	@Post('/update_user')
	async updateUser(@Body() body, @Req() request: Request): Promise<string> {
		this.checkApiKey(request);
		return await this.appService.updateUser(body);
	}

	@Post('/delete_user')
	async deleteUser(@Body() body, @Req() request: Request): Promise<string> {
		this.checkApiKey(request);
		return await this.appService.deleteUser(body);
	}

	@Get('/get_users')
	async getUsers(@Req() request: Request): Promise<string> {
		this.checkApiKey(request);
		return await this.appService.getUsers();
	}

	private checkApiKey(request: Request): void {
		if ((request.headers['x-api-key'] as string) !== API_KEY) {
			throw new Error('API KEY ERROR');
		}
	}
}
