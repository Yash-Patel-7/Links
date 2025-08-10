import { Mutex } from 'async-mutex';
import fs from 'fs/promises';
import { resolve as absPath, dirname } from 'path';
import { errorConstants } from '~/constants';

class File {
  private static _files: Map<string, File> = new Map();
  private _path: string;
  private _mutex: Mutex;

  private constructor(path: string) {
    this._path = absPath(path);
    this._mutex = new Mutex();
  }

  public static instanceofFile = (arg: unknown): arg is File => {
    return arg instanceof File;
  };

  public static getFile = (path: string): File => {
    path = absPath(path);
    const files = File._files;
    if (!files.has(path)) files.set(path, new File(path));
    const file = files.get(path);
    if (typeof file === 'undefined')
      throw new Error(errorConstants.MESSAGE.UNEXPECTED);
    return file;
  };

  public create = (): Promise<void> => {
    return this._mutex.runExclusive(async () => {
      try {
        await fs.mkdir(dirname(this._path), { recursive: true });
        const fileHandle = await fs.open(this._path, 'wx');
        await fileHandle.close();
      } catch (error) {
        if (typeof error === 'object' && error !== null) {
          if ('code' in error && typeof error.code === 'string') {
            if (error.code === errorConstants.CODE.ALREADY_EXISTS) {
              return;
            }
            throw new Error(error.code);
          }
        }
        throw new Error(errorConstants.MESSAGE.UNEXPECTED);
      }
    });
  };

  public delete = (): Promise<void> => {
    return this._mutex.runExclusive(async () => {
      try {
        await fs.unlink(this._path);
      } catch (error) {
        if (typeof error === 'object' && error !== null) {
          if ('code' in error && typeof error.code === 'string') {
            if (error.code === errorConstants.CODE.NOT_FOUND) {
              return;
            }
            throw new Error(error.code);
          }
        }
        throw new Error(errorConstants.MESSAGE.UNEXPECTED);
      }
    });
  };

  public read(encoding?: BufferEncoding): Promise<string>;
  public read(encoding: null): Promise<Buffer>;
  public read(encoding?: BufferEncoding | null): Promise<string | Buffer> {
    return this._mutex.runExclusive(async () => {
      try {
        if (encoding === undefined) encoding = 'utf-8';
        return await fs.readFile(this._path, encoding);
      } catch (error) {
        if (typeof error === 'object' && error !== null) {
          if ('code' in error && typeof error.code === 'string') {
            throw new Error(error.code);
          }
        }
        throw new Error(errorConstants.MESSAGE.UNEXPECTED);
      }
    });
  }

  public write = (
    data: string | Buffer,
    encoding?: BufferEncoding,
  ): Promise<void> => {
    return this._mutex.runExclusive(async () => {
      try {
        await fs.writeFile(this._path, data, encoding);
      } catch (error) {
        if (typeof error === 'object' && error !== null) {
          if ('code' in error && typeof error.code === 'string') {
            throw new Error(error.code);
          }
        }
        throw new Error(errorConstants.MESSAGE.UNEXPECTED);
      }
    });
  };
}

const instanceofFile = File.instanceofFile;
const getFile = File.getFile;

export { getFile, instanceofFile };
