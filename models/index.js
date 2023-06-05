const ENGINE_DB = process.env.ENGINE_DB

const pathModels = (ENGINE_DB === 'nosql') ? './nosql/' : './mysql/'

const models = {
    pruebasModel: require(pathModels+'pruebas'),
    userEstructura: require(pathModels+'user_model'),
    comercioEstructura: require(pathModels+'comercio_model'),
    paginaEstructura: require(pathModels+'page_model')
};

module.exports = models;