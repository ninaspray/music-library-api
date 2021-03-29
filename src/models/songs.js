module.exports = (sequelize, DataTypes) => {
    const schema = {
        name : DataTypes.STRING,
    };

    const SongModel = sequelize.define('Song', schema);
    return Song;
};


