import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { Appointment } from "../types";

export const useAppointments = () => {
  return useQuery(["GET_APPOINTMENTS"], async (): Promise<Appointment[]> => {
    const { data } = await axios.get("http://localhost:7000/appointments");
    return data;
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (appointment: Appointment) => {
      const { data } = await axios.post("http://localhost:7000/appointments", {
        appointment: {
          ...appointment,
          start: moment(appointment.start).format(),
          end: moment(appointment.end).format(),
        },
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["GET_APPOINTMENTS"]);
      },
    }
  );
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (appointment: Appointment) => {
      const { data } = await axios.put("http://localhost:7000/appointments", {
        appointment: {
          ...appointment,
          start: moment(appointment.start).format(),
          end: moment(appointment.end).format(),
        },
      });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["GET_APPOINTMENTS"]);
      },
    }
  );
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number | undefined) => {
      const { data } = await axios.delete(
        `http://localhost:7000/appointments/${id}`
      );
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["GET_APPOINTMENTS"]);
      },
    }
  );
};
