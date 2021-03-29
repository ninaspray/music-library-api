const ArtistModel = require('./artists');
const AlbumModel = require('./albums');
const SongModel = require('./songs');
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
    const Song = SongModel(connection, Sequelize);
    
    Album.belongsTo(Artist, { as: 'artist' });
    Song.belongsTo(Artist, { as: 'artist' });
    Song.belongsTo(Album, { as: 'album' });

    connection.sync({ alter: true});
    return {
        Artist,
        Album, 
        Song
    };
};

module.exports = setUpDatabase();

//For now we are just connecting to the database with this file. 