import { Mutex } from 'async-mutex';
import path from 'path';
import { dbConstants } from '~/constants';
import { executeOnce, getFile } from '~/lib';
import { dataTemplate } from '~/templates';
import { Data, DataSchema } from '~/types';

export class Db {
  private static _db = new Db();
  private static _fileHandler = getFile(
    path.resolve(__dirname, dbConstants.PATH),
  );
  private static _data: Data;
  private static _isDirty = false;
  protected static mutex = new Mutex();

  protected constructor() {}

  private static _initialize = async (): Promise<void> => {
    return Db.mutex.runExclusive(async () => {
      return executeOnce('Db._initialize', async () => {
        await Db._fileHandler.create();
        const data = await Db._db._read();
        if (data) {
          Db._data = data;
        } else {
          await Db._db._write(dataTemplate);
          Db._data = dataTemplate;
        }
      });
    });
  };

  private static _gracefulShutdown = (): void => {
    executeOnce('Db._gracefulShutdown', () => {
      const handleShutdown = (signal: string) => {
        console.log(`Received ${signal}. Shutting down gracefully...`);
        Db._save()
          .then(() => {
            console.log('Database saved successfully.');
            process.exit(0);
          })
          .catch((error: unknown) => {
            console.error('Error saving database: ', error);
            process.exit(1);
          });
      };

      process.on('SIGINT', () => {
        handleShutdown('SIGINT');
      });
      process.on('SIGTERM', () => {
        handleShutdown('SIGTERM');
      });
      process.on('SIGHUP', () => {
        handleShutdown('SIGHUP');
      });
    });
  };

  private static _save = async (): Promise<void> => {
    return Db.mutex.runExclusive(async () => {
      if (!Db._isDirty) return;
      await Db._db._write(Db._data);
      Db._isDirty = false;
    });
  };

  private static _saveCallback = (): void => {
    const asyncCallback = async () => {
      await Db._initialize();
      Db._gracefulShutdown();
      await Db._save();
      clearTimeout(Db._saveInterval);
      Db._saveInterval = setTimeout(
        Db._saveCallback,
        dbConstants.SAVE_INTERVAL,
      );
    };
    void asyncCallback();
  };

  private static _saveInterval = setTimeout(Db._saveCallback, 0);

  private _read = async (): Promise<Data | null> => {
    const data = await Db._fileHandler.read();
    return data ? DataSchema.parseAsync(JSON.parse(data)) : null;
  };

  private _write = async (data: Data): Promise<void> => {
    return Db._fileHandler.write(
      JSON.stringify(data, null, dbConstants.JSON_SPACING),
    );
  };

  protected static getData = (): Data => {
    return Db._data;
  };

  protected static setDirty = () => {
    Db._isDirty = true;
  };
}
