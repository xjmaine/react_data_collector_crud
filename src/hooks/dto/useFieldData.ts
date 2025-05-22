import { useState, useEffect } from 'react';
import {FieldData} from "../../models/FieldData.ts";
import {StorageService} from "../../services/StorageService.ts";

export function useFieldData() {
  const [dataList, setDataList] = useState<FieldData[]>([]);

  useEffect(() => {
    setDataList(StorageService.getAllData());
  }, []);

  const addData = (fieldData: FieldData) => {
    StorageService.saveData(fieldData);
    setDataList(StorageService.getAllData());
  };

  return { dataList, addData };
}