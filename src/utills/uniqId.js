const { v4: uuidv4 } = require('uuid');

function generateShortUniqueId() {
    const uuid = uuidv4();
    return uuid.slice(0, 4);
}

module.exports=generateShortUniqueId