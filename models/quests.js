const Quest = require( "./quest" );

class Quests {
	_list = {};

	get get_list () { // El getter me regresa un arreglo

		const list = [];
		Object.keys( this._list ).forEach( key => {
			const quest = this._list[ key ];
			list.push( quest );
		} );

		return list;
	}

	constructor () {
		this._list = {};
	}

	deleteQuest ( id = '' ) {
		if ( this._list[ id ] ) {
			delete this._list[ id ];
		}
	}

	loadQuestsFromArray ( quests = [] ) {

		quests.forEach( quest => {
			this._list[ quest.id ] = quest;
		} );
	}

	createQuest ( description = '' ) {

		const quest = new Quest( description );
		this._list[ quest.id ] = quest;
	}

	fullList () {

		console.log();
		let counter = 0;
		this.get_list.forEach( ( quest ) => {

			counter += 1;
			const { description, completedAt } = quest;
			const state = ( completedAt )
				? 'Completed'.green
				: 'Pending'.red;
			console.log( `${ ( counter.toString() + '.' ).yellow } ${ description } :: ${ state }` )

		} );
	}

	completedList ( completed = true ) {

		console.log();
		let counter = 0;

		this.get_list.forEach( ( quest ) => {

			const { description, completedAt } = quest;
			const state = ( completedAt )
				? 'Completed'.green
				: 'Pending'.red;

			if ( completed ) {

				if ( completedAt ) { // Show completed

					counter += 1;
					console.log( `${ ( counter.toString() + '.' ).yellow } ${ description } :: ${ completedAt.green }` )

				}

			} else {

				if ( !completedAt ) { // Show pending

					counter += 1;
					console.log( `${ ( counter.toString() + '.' ).yellow } ${ description } :: ${ state }` )

				}

			}

		} );

	}

	toggleCompleted ( ids = [] ) {
		ids.forEach( id => {
			const quest = this._list[ id ];
			if ( !quest.completedAt ) {
				quest.completedAt = new Date().toISOString();
			}
		} );

		this.get_list.forEach( quest => {
			if ( !ids.includes( quest.id ) ) {
				this._list[ quest.id ].completedAt = null;
			}
		} );
	}

}

module.exports = Quests;
