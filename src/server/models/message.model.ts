import { StoreActions } from '../../common/actions';

export class MessageModel {
	type: StoreActions['type'];
	payload: StoreActions['payload'];

	constructor(action: StoreActions) {
		this.type = action.type;
		this.payload = action.payload;
	}

	toString(): string {
		return JSON.stringify(this, (key, value) => {
			if (key === 'room') {
				return undefined;
			}
			return value;
		});
	}
}
