export class BuzzerGameModel {
	id: string;
	buzzerOn: boolean;

	constructor(id: string) {
		this.id = id;
		this.buzzerOn = false;
	}
}
