import "./App.scss";
import { postToApi, getGuests } from "./services/api";

import {
  Button,
  Column,
  FormGroup,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TextInput,
} from "@carbon/react";
import { useEffect, useState } from "react";

function GuestForm({
  nameHandler,
  emailHandler,
  submitHandler,
  invalidEmail,
  invalidName,
  name,
  email,
}) {
  return (
    <div>
      <h3>Guest Form</h3>

      <FormGroup legendText="">
        <Stack gap={7}>
          <TextInput
            id="name"
            labelText="Name"
            value={name}
            onChange={nameHandler}
            invalid={invalidName}
            invalidText="Invalid name"
          />
          <TextInput
            id="email"
            labelText="Email"
            value={email}
            onChange={emailHandler}
            invalid={invalidEmail}
            invalidText="Invalid email"
          />
          <Button onClick={submitHandler}>Submit</Button>
        </Stack>
      </FormGroup>
    </div>
  );
}

function GuestsTable({ rows = [] }) {
  const headers = ["Name", "Email"];
  return (
    <div>
      <h3>Guest List</h3>
      <Table
        size="md"
        stickyHeader={false}
        useZebraStyles={true}
        style={{ marginTop: "0.5rem" }}
      >
        <TableHead>
          <TableRow>
            {headers.map((header, idx) => (
              <TableHeader key={idx}>{header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row?.name}</TableCell>
              <TableCell>{row?.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState([]);

  const [invalidName, setInvalidName] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    const { data } = await getGuests();
    setGuests(data);
  };

  const nameHandler = (e) => {
    e.preventDefault();
    setInvalidName(false);
    const input = e?.target?.value;
    setName(input);
  };

  const emailHandler = (e) => {
    e.preventDefault();
    setInvalidEmail(false);
    const input = e?.target?.value;
    setEmail(input);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (name.length > 0 && email.length > 0) {
      let guestObj = {
        name,
        email,
      };

      await postToApi(guestObj);
      await loadGuests();

      setName("");
      setEmail("");
      setInvalidName(false);
      setInvalidEmail(false);
    } else {
      if (name.length === 0) {
        setInvalidName(true);
      }
      if (email.length === 0) {
        setInvalidEmail(true);
      }
    }
  };

  return (
    <div className="App">
      <Grid>
        <Column sm={2} md={4} lg={8} xlg={8}>
          <GuestsTable rows={guests} />
        </Column>
        <Column sm={2} md={4} lg={8} xlg={8}>
          <GuestForm
            nameHandler={nameHandler}
            emailHandler={emailHandler}
            submitHandler={submitHandler}
            invalidEmail={invalidEmail}
            invalidName={invalidName}
            name={name}
            email={email}
          />
        </Column>
      </Grid>
    </div>
  );
}

export default App;
