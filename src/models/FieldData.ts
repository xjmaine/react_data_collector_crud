export class FieldData {
    id: number;
    title: string;
    description: string;
    timestamp: string;
    height: number;
    weight: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    age: number;
    gender: string;
    location: string;
    smokingStatus?: string;
    stressScore?: number;
    consent: boolean;
    participantId: string;

    constructor(
        title: string,
        description: string,
        height: number,
        weight: number,
        bloodPressureSystolic: number,
        bloodPressureDiastolic: number,
        age: number,
        gender: string,
        location: string,
        consent: boolean,
        participantId: string,
        smokingStatus?: string,
        stressScore?: number,
        timestamp?: string
    ) {
        this.id = Date.now(); //unique id based on timestamp
        this.title = title;
        this.description = description;
        this.height = height;
        this.weight = weight;
        this.bloodPressureSystolic = bloodPressureSystolic;
        this.bloodPressureDiastolic = bloodPressureDiastolic;
        this.age = age;
        this.gender = gender;
        this.location = location;
        this.smokingStatus = smokingStatus;
        this.stressScore = stressScore;
        this.consent = consent;
        this.participantId = participantId;

        // this.timestamp = timestamp != null ? timestamp: new Date().toISOString();
        this.timestamp = timestamp || new Date().toISOString();
    }
}