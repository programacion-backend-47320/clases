import fs from 'fs'

class FileManager {
    constructor(filename = './db.json') {
        this.filename = filename
    }

    get = async() => {
        return fs.promises.readFile(this.filename, 'utf-8')
            .then(r => JSON.parse(r))
            .catch(e => [])
    }

    getById = async (id) => {
        const data = await this.get()
        return data.find(d => d.id === parseInt(id))
    }

    add = async(data) => {
        const list = await this.get()
        data._id = list.length + 1
        list.push(data)

        return fs.promises.writeFile(this.filename, JSON.stringify(list))
    }

    update = async (data) => {
        const list = await this.get()
        const idx = list.findIndex(a => a._id == data._id)
        list[idx] = data

        return fs.promises.writeFile(this.filename, JSON.stringify(list))
    }
}

export default FileManager