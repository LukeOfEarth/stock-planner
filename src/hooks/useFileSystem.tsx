import * as FS from 'expo-file-system';
import { IStockItem } from '../models';
import { FileSystemError } from '../errors';

const ID_KEY: string = 'ids';

export const useFileSystem = () => {
    const buildFileUri = (key: string) => `${FS.documentDirectory}${key}`;

    const processKeyWithSpaces = (key: string) => {
        let result = key.trim();
        result = result.replace(' ', '_');
        return result;
    }

    const getFileInfo = async (key: string) => {
        const file = await FS.getInfoAsync(buildFileUri(processKeyWithSpaces(key)));
        return file;
    }

    const getTextFileAsString = async (key: string) => {
        const file = await getFileInfo(key);
        if(file.exists && !file.isDirectory) {
            const data = await FS.readAsStringAsync(file.uri);
            return data;
        } else throw new FileSystemError('File does not exist!');
    }

    const storeStringAsTextFile = async (key: string, data: string) => {
        await FS.writeAsStringAsync(buildFileUri(processKeyWithSpaces(key)), data);
    }

    const deleteFileIfExists = async (key: string) => {
        const item = await getFileInfo(key);
        if(item.exists) {
            await FS.deleteAsync(item.uri);
        } else throw new FileSystemError('File does not exist!');
    }

    const storeStockIds = async (ids: Array<string>) => {
        const item = JSON.stringify(ids);
        await storeStringAsTextFile(ID_KEY , item);
    }

    const getStockIds = async () => {
        const file = await getFileInfo(ID_KEY);

        if(file.exists && !file.isDirectory) {
            const item = await getTextFileAsString(ID_KEY);
            return JSON.parse(item);
        } else {
            await storeStockIds([]);
            return [];
        }
    }

    const syncIds = async (id: string, del: boolean = false) => {
        let ids: Array<string> = await getStockIds();

        if(!del) {
            if(!ids.includes(id) && !del) {
                ids.push(id);
                storeStockIds(ids);
            }
        } else {
            ids = ids.filter(i => i != id);
            storeStockIds(ids);
        }
    }

    const getStockItem = async (key: string) => {
        const item = await getTextFileAsString(key);
        return JSON.parse(item);
    }

    const getAllStockItems = async () => {
        const ids: Array<string> = await getStockIds();
        let promises: Array<Promise<IStockItem>> = [];
        ids.forEach((el: string) => promises.push(getStockItem(el)));
        return await Promise.all(promises);
    }

    const storeStockItem = async (data: IStockItem) => {
        const key: string = data.name;
        const item: string = JSON.stringify(data);
        await storeStringAsTextFile(key, item);
        await syncIds(data.name);
    }

    const deleteStockItem = async (data: IStockItem) => {
        await deleteFileIfExists(data.name);
        await syncIds(data.name, true);
    }

    return {
        getAllStockItems,
        storeStockItem,
        storeStockIds,
        deleteStockItem
    }
}