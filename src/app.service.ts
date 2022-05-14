import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}

	async createUser(body): Promise<string> {
		const result = await new AppRepository().createUser(body);
		return JSON.stringify(result.Attributes);
	}

	async updateUser(body): Promise<string> {
		const result = await new AppRepository().updateUser(body);
		return JSON.stringify(result.Attributes);
	}

	async deleteUser(body): Promise<string> {
		const result = await new AppRepository().deleteUser(body);
		return JSON.stringify(result.Attributes);
	}

	async getUsers(): Promise<string> {
		const result = await new AppRepository().getUsers();
		return JSON.stringify(result.Items);
	}
}
