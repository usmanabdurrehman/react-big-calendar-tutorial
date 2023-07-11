export type Appointment = {
  id: number;
  status: string;
  location: string;
  resource: string;
  address: string;
};

export type EventItem = {
  start?: Date | string;
  end?: Date | string;
  data?: { appointment?: Appointment };
  isDraggable?: boolean;
  isResizable?: boolean;
  resourceId?: number;
};
