export type Appointment = {
  id?: number;
  status?: string;
  location?: string;
  resource?: string;
  address?: string;
  start: string | Date;
  end: string | Date;
};

export type EventItem = {
  start: Date;
  end: Date;
  data?: { appointment?: Appointment };
  isDraggable?: boolean;
};
