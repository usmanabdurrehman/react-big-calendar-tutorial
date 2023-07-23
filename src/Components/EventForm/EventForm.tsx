import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useCallback, useMemo } from "react";
import { Appointment } from "../../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  useCreateAppointment,
  useDeleteAppointment,
  useUpdateAppointment,
} from "../../requests";

interface EventFormProps {
  appointment: Appointment;
}

const CustomTimeInput = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (val: string) => void;
}) => (
  <Input
    value={value}
    onChange={(e) => onChange && onChange(e.target.value)}
    width="100%"
  />
);

export default function EventForm({ appointment }: EventFormProps) {
  const label = appointment?.id ? "Update" : "Create";

  const initialValues = useMemo(
    () => ({ ...appointment, status: "CI" }),
    [appointment]
  );

  const { mutateAsync: createAppointment } = useCreateAppointment();
  const { mutateAsync: updateAppointment } = useUpdateAppointment();
  const { mutateAsync: deleteAppointment } = useDeleteAppointment();

  return (
    <Box boxShadow={"2xl"} padding="10" rounded="xl" bg="white" width="100%">
      <Formik
        onSubmit={async (values) => {
          if (!appointment.id) createAppointment(values);
          else updateAppointment(values);
        }}
        initialValues={initialValues}
        enableReinitialize
      >
        {({ values, setFieldValue, handleSubmit }) => {
          return (
            <Form>
              <Flex justifyContent={"space-between"} alignItems="center">
                <Box>
                  <Text fontSize="4xl" mb={4}>
                    {label} an appointment
                  </Text>
                </Box>
                {appointment.id && (
                  <Box>
                    <IconButton
                      aria-label="delete"
                      icon={<DeleteIcon />}
                      onClick={() => deleteAppointment(appointment.id)}
                      colorScheme="red"
                    />
                  </Box>
                )}
              </Flex>

              <Field name="location">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                )}
              </Field>
              <Field name="resource">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel>Resource</FormLabel>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                )}
              </Field>
              <Field name="address">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Textarea {...field} rows={4} value={field.value || ""} />
                  </FormControl>
                )}
              </Field>
              <Field name="status">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel>Status</FormLabel>
                    <Select {...field}>
                      <option value="CI">Checked In</option>
                      <option value="P">Pending</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Flex gap={4} mt={4}>
                <Flex flexBasis={"50%"}>
                  <FormControl>
                    <FormLabel>Start Time</FormLabel>
                    <DatePicker
                      onChange={(date) => {
                        console.log({ date });
                        setFieldValue("start", date);
                      }}
                      selected={new Date(values.start)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      customInput={<CustomTimeInput />}
                    />
                  </FormControl>
                </Flex>
                <Flex flexBasis={"50%"}>
                  <FormControl>
                    <FormLabel>End Time</FormLabel>
                    <DatePicker
                      onChange={(date) => setFieldValue("end", date)}
                      selected={new Date(values.end)}
                      showTimeSelect
                      dateFormat="MMMM d, yyyy h:mm aa"
                      customInput={<CustomTimeInput />}
                    />
                  </FormControl>
                </Flex>
              </Flex>

              <Button
                mt={4}
                colorScheme={"whatsapp"}
                onClick={() => handleSubmit()}
              >
                {label}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
