export interface IUnit {
  type: string;
}

export interface IAppointment {
  number: number;
  units: IUnit[];
  status?: string;
  roomsAndBaths: string;
  assignedTo: string;
  color: string;
  label: string;
  key: string;
  photos: any;
}
