import * as FS from 'expo-file-system';
import { IStockItem } from '../models';

const ID_KEY: string = 'ids';

export const useFileSystem = () => {
    const buildFileUri = (key: string) => `${FS.documentDirectory}${key}`;

    const getFileInfo = async (key: string) => {
        const file = await FS.getInfoAsync(buildFileUri(key));
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
        await FS.writeAsStringAsync(buildFileUri(key), data);
    }

    const deleteFileIfExists = async (key: string) => {
        const item = await getFileInfo(key);
        if(item.exists) {
            await FS.deleteAsync(buildFileUri(key));
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

    const syncIds = async (id: string) => {
        let ids: Array<string> = await getStockIds();
        if(!ids.includes(id)) {
            ids.push(id);
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
        const key: string = data.id;
        const item: string = JSON.stringify(data);
        await storeStringAsTextFile(key, item);
        await syncIds(data.id);
    }

    const deleteStockItem = async (data: IStockItem) => {
        await deleteFileIfExists(data.id);
        await syncIds(data.id);
    }

    return {
        getAllStockItems,
        storeStockItem,
        storeStockIds,
        deleteStockItem
    }
}