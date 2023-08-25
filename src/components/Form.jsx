import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Windmill from "../animations/windmill.json";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "axios";

const Form = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const [statusMessage, setStatusMessage] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const [speed, setSpeed] = useState(2);

  const onSubmit = async (data) => {
    try {
      setSpeed(5);
      const response = await axios.post(
        "https://europe-west1-octue-amy.cloudfunctions.net/frontend-developer-case-study",
        {
          message: data,
        }
      );
      console.log("Succesful: ", response.data);
      setSpeed(2);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Container>
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        gap={4}
        height="95vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
        spacing={4}
        flex={1}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            padding: 3,
            boxShadow: 3,
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="h5" pb={2} textAlign="center">
            Please enter your Information
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={3}>
              {errors.name?.message && (
                <Typography variant="body1" sx={{ color: "red" }}>
                  {errors.name?.message}
                </Typography>
              )}
              <TextField
                fullWidth
                id="name"
                label="Name"
                variant="outlined"
                placeholder="John Doe"
                {...register("name", {
                  required: "Name is Required",
                  maxLength: { value: 20, message: "Max length is 20" },
                  pattern: {
                    value: /^[A-Za-z\s]+$/i,
                    message: "Only letters are allowed",
                  },
                })}
                onBlur={() => trigger("name")}
              />

              {errors.no_turbines?.message && (
                <Typography variant="body1" sx={{ color: "red" }}>
                  {errors.no_turbines?.message}
                </Typography>
              )}
              <TextField
                fullWidth
                id="no_turbine"
                label="Number of Turbines"
                variant="outlined"
                placeholder="Ex: 100"
                {...register("no_turbines", {
                  required: "A Number is Required",
                  maxLength: { value: 5, message: "Max length is 5" },
                  minLength: { value: 1, message: "Min length is 1" },
                  pattern: {
                    value: /^\d+$/,
                    message: "Only numbers are allowed",
                  },
                })}
                onBlur={() => trigger("no_turbines")}
              />

              <Button fullWidth variant="contained" type="submit">
                <Typography variant="body1">Submit</Typography>
              </Button>
            </Stack>
          </form>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            height: { xs: "50vh", md: "80%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "primary.main",
          }}
        >
          <Player
            src={Windmill}
            className="player"
            loop
            autoplay
            speed={speed}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default Form;
