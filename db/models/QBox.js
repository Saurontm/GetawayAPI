module.exports = (sequelize, DataTypes) => {
    const QBox = sequelize.define("QBox", {
        question: {
            type: DataTypes.STRING,
        },
        answer: {
            type: DataTypes.STRING,
        },
        authorId: {
            type: DataTypes.INTEGER,
        },
    });
    return QBox;
};
