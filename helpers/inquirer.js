const inquirer = require( "inquirer" );
require( "colors" );

const optionsMenu = [
	{
		type: "list",
		name: "option",
		message: "What u wanna do?",
		choices: [
			{
				value: "1",
				name: `${'1.'.yellow} Create a quest`,
			},
			{
				value: "2",
				name: `${'2.'.yellow} List quests`,
			},
			{
				value: "3",
				name: `${'3.'.yellow} List completed quests`,
			},
			{
				value: "4",
				name: `${'4.'.yellow} List pending quests`,
			},
			{
				value: "5",
				name: `${'5.'.yellow} Complete quest(s)`,
			},
			{
				value: "6",
				name: `${'6.'.yellow} Delete a quest`,
			},
			{
				value: "0",
				name: `${'0.'.yellow} Exit`,
			},
		],
	},
];

const inquirerMenu = async () => {
	
	console.clear();
	console.log( "================".yellow );
	console.log( " Select a option:".white );
	console.log( "================\n".yellow );

	const { option } = await inquirer.prompt( optionsMenu );

	return option;
};

const pause = async () => {
	const question = [
		{
			type: "input",
			name: "enter",
			message: `Press ${ "ENTER".yellow } to continue`,
		},
	];

	console.log( "\n" );
	await inquirer.prompt( question );
};

const readInput = async ( message ) => {
	const question = [
		{
			type: "input",
			name: "desc",
			message,
			validate ( value ) {
				if ( value.length === 0 ) {
					return "Please enter a value";
				}
				return true;
			},
		},
	];

	const { desc } = await inquirer.prompt( question );
	return desc;
};

const deleteList = async( quests = []) =>{

	let counter = 0;
	const choices = quests.map((quest) =>{
		
		counter +=1;
		return {
			value: quest.id,
			name: `${(counter.toString() + '.').yellow} ${quest.description}`
		}
	});

	choices.unshift({
		value: '0',
		name: `${'0.'.yellow} Cancelar`
	});

	const questions = [
		{
			type : 'list',
			name: 'id',
			message: 'Delete',
			choices
		}
	]
	const { id } = await inquirer.prompt( questions );
	return id;

}

const completeCheckList = async( quests = []) =>{

	let counter = 0;
	const choices = quests.map((quest) =>{
		
		counter +=1;
		return {
			value: quest.id,
			name: `${(counter.toString() + '.').yellow} ${quest.description}`,
			checked: (quest.completedAt) ? true : false
		}
	});

	const questions = [
		{
			type : 'checkbox',
			name: 'ids',
			message: 'Please select',
			choices
		}
	]
	const { ids } = await inquirer.prompt( questions );
	return ids;

}

const confirm = async(message) =>{
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message
		}
	];

	const {ok} = await inquirer.prompt(question);
	return ok;
}

module.exports = {
	inquirerMenu,
	pause,
	readInput,
	deleteList,
	confirm,
	completeCheckList
};
