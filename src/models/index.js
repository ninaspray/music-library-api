const ArtistModel = require('./artists');
const AlbumModel = require('./albums');
const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env

const setUpDatabase = () => {
    const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT, 
        dialect: "mysql", 
        logging: false,
    });
    
    const Artist = ArtistModel(connection, Sequelize);
    const Album = AlbumModel(connection, Sequelize);
    
    Album.belongsTo(Artist, { as: 'artist' });

    connection.sync({ alter: true});
    return {
        Artist,
        Album
    };
};

module.exports = setUpDatabase();

//For now we are just connecting to the database with this file. 