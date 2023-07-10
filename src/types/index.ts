export type Appointment = {
  id: number;
  status: string;
  location: string;
  resource: string;
  address: string;
  start: string;
  end: string;
};

export type EventItem = {
  start: Date;
  end: Date;
  data?: { appointment?: Appointment };
  isDraggable?: boolean;
};