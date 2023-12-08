export default class StoreRepository {
    constructor(dao) {
        this.dao = dao
    }

    getStores = async () => { return await this.dao.getStores() }
    getStoreById = async (id) => { return await this.dao.getStoreById(id) }
    addStore = async (store) => { return await this.dao.saveStore(store) }
    addProduct = async (id, product) => {
        const store = await this.dao.getStoreById(id)
        store.products.push(product)

        return await this.dao.updateStore(id, store)
    }
}