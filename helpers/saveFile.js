const fs = require('fs');
const file = './db/data.json';

const saveDB = (data) =>{

        fs.writeFileSync(file,JSON.stringify(data)); // Parse data from Array to String with JSON extension

}

const readDB = () =>{

        if(!fs.existsSync(file)){
                return null;
        }

        const info = fs.readFileSync(file, {encoding: 'utf-8'});
        const data = JSON.parse(info); // Parse String to JSON
        return data;
}

module.exports = {
        saveDB,
        readDB
}