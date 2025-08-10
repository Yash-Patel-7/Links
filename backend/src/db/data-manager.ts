import { Db } from '~/db';
import { DataResponse } from '~/types';

export class DataManager extends Db {
  private constructor() {
    super();
  }

  public static fetchData = async (): Promise<DataResponse> => {
    return Db.mutex.runExclusive(() => {
      const data = Db.getData();
      return {
        unchecked: structuredClone(data.unchecked),
        checked: structuredClone(data.checked),
      };
    });
  };

  public static updateData = async (data: DataResponse): Promise<void> => {
    return Db.mutex.runExclusive(() => {
      const currentData = Db.getData();
      const newData = structuredClone(data);
      currentData.unchecked = newData.unchecked;
      currentData.checked = newData.checked;
      currentData.links = {};

      Object.entries(currentData.unchecked).forEach(([key, value]) => {
        currentData.links[value] = key;
      });
      Object.entries(currentData.checked).forEach(([key, value]) => {
        currentData.links[value] = key;
      });

      Db.setDirty();
    });
  };
}
