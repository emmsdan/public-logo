import fs from 'fs'
import Fuse from 'fuse.js'
export const getFileContent = async (file) => {
    try {
        const data = await fs.readFileSync(file, 'utf-8');
        if (!data) return { error: 'No sure file' }
        return data
    } catch (err) {
            return { error: err.message, stack: err.stack }
    }
}

export const searchArrayOfObject = async (key:string, fields: string[], obj: object[]) => {
    try {
        const options = {
            includeScore: true,
            minMatchCharLength: 3,
            threshold: 0.1,
            useExtendedSearch: true,
            keys: fields
        }
        const fuse = new Fuse(obj, options);
        return fuse.search(key);
    } catch (e) {
        return e.message;
    }
}