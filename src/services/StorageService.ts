import { FieldData } from '../models/FieldData';

export class StorageService {
  private static readonly STORAGE_KEY: string = 'fieldData';
  private static readonly API_URL: string = 'http://localhost:3000/api/v1/field-data';

  static async getAllData(): Promise<FieldData[]> {
    try {
      const response = await fetch(this.API_URL);
      if (!response.ok) throw new Error(`Network error: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Invalid data format from server');
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('API fetch failed, using localStorage:', error);
      const localData = localStorage.getItem(this.STORAGE_KEY);
      return localData ? JSON.parse(localData) : [];
    }
  }

  static async saveData(fieldData: FieldData): Promise<void> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fieldData),
      });
      if (!response.ok) throw new Error(`Network error: ${response.status}`);
      const existingData = await this.getAllData();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData));
    } catch (error) {
      console.error('API save failed, storing locally:', error);
      const existingData = await this.getAllData();
      existingData.push(fieldData);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingData));
      throw error; // Rethrow to notify caller (e.g., useFieldData)
    }
  }

  static async clearData(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
    try {
      const response = await fetch(this.API_URL, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Network error: ${response.status}`);
    } catch (error) {
      console.error('API clear failed:', error);
    }
  }

  static async syncData(): Promise<void> {
    const localData = localStorage.getItem(this.STORAGE_KEY);
    if (!localData) return;

    try {
      const localEntries: FieldData[] = JSON.parse(localData);
      const response = await fetch(this.API_URL);
      if (!response.ok) throw new Error(`Network error: ${response.status}`);
      const serverData: FieldData[] = await response.json();

      const newEntries = localEntries.filter(
        (local) => !serverData.some((server) => server.id === local.id)
      );

      for (const entry of newEntries) {
        const postResponse = await fetch(this.API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        });
        if (!postResponse.ok) throw new Error(`Network error: ${postResponse.status}`);
      }

      const updatedData = await this.getAllData();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }
}