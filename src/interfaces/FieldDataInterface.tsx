import { useState, useEffect } from 'react';
import { FieldData } from '../models/FieldData';
import { StorageService } from '../services/StorageService';

interface FieldDataHook {
  dataList: FieldData[];
  addData: (fieldData: FieldData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useFieldData(): FieldDataHook {
  const [dataList, setDataList] = useState<FieldData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    StorageService.getAllData()
      .then((data) => {
        setDataList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        setError('Failed to load data: ' + message);
        setLoading(false);
      });

    const handleOnline = () => {
      StorageService.syncData()
        .then(() => StorageService.getAllData())
        .then((data) => setDataList(Array.isArray(data) ? data : []))
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          setError('Sync failed: ' + message);
        });
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const addData = async (fieldData: FieldData) => {
    try {
      await StorageService.saveData(fieldData);
      const updatedData = await StorageService.getAllData();
      setDataList(Array.isArray(updatedData) ? updatedData : []);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError('Failed to save data: ' + message);
    }
  };

  return { dataList, addData, loading, error };
}