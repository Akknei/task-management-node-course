require( 'colors' );

const { inquirerMenu,
        pause,
        readInput,
        deleteList,
        confirm,
        completeCheckList
} = require( './helpers/inquirer' );
const { saveDB, readDB } = require( './helpers/saveFile' );
const Quests = require( './models/quests' );


const main = async () => {
        
        let opt = '';
        const quests = new Quests();
        
        const questDB = readDB();
        
        if ( questDB ) {
                quests.loadQuestsFromArray( questDB );
        }

        do {

                opt = await inquirerMenu();
                switch ( opt ) {
                        case '1': // Create quest
                                const description = await readInput( 'Description: ' );
                                quests.createQuest( description );
                                break;
                        case '2': // List quests
                                quests.fullList();
                                break;
                        case '3': // List completed quests
                                quests.completedList( true );
                                break;
                        case '4': // List pending quests
                                quests.completedList( false );
                                break;
                        case '5': // Complete quest(s)
                                const ids = await completeCheckList(quests.get_list);
                                quests.toggleCompleted(ids);
                                break;
                        case '6': // Delete quest
                                const id = await deleteList(quests.get_list);
                                if(id !== '0'){
                                        const ok = await confirm('Are u sure?');
                                        if(ok){
                                                quests.deleteQuest(id);
                                                console.log('Quest was deleted');
                                        }
                                }
                                break;
                }

                saveDB( quests.get_list ); // Out from the loop to save creations, modifications n deleted

                await pause();

        } while ( opt != '0' );

}

main();