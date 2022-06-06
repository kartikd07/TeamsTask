import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, InputLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../redux/store/store";
import { getFinalData } from "../../redux/reducers/updateSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PropsType {
  alpha: string;
  name: string;
  domains: string[];
  country: string;
  website: string[];
}

const UpdateRecordForm = (props: PropsType) => {
  const [alpha, setAlpha] = useState(props.alpha);
  const [domain, setDomain] = useState(props.domains[0]);
  const [country, setCountry] = useState(props.country);
  const [website, setWebsite] = useState(props.website[0]);

  const dispatch = useDispatch();
  const datalog = useSelector((state: RootType) => state.data.data).slice(
    0,
    50
  );
  const afterDelete = useSelector((state: RootType) => state.uni.deletedRows);

  interface UpdatedType {
    alpha_two_code: string;
    domains: string[];
    country: string;
    name: string;
    web_pages: string[];
  }

  const updatedRow = {
    alpha_two_code: `${alpha}`,
    domains: [`${domain}`],
    country: `${country}`,
    name: `${props.name}`,
    web_pages: [`${website}`],
  };

  const up = () => {
    const index = datalog.findIndex((row) => row.name === updatedRow.name);
    datalog[index] = updatedRow;

    return datalog.filter((dl) => {
      return !afterDelete.find((adel) => {
        return dl.name === adel.name;
      });
    });
  };

  // updation notification
  const updateNotify = () => toast(`Record Updated!`);

  return (
    <form className="updateForm">
      <InputLabel htmlFor="updateAlpha" sx={{ fontSize: "14px" }}>
        Alpha Code
      </InputLabel>
      <TextField
        size="small"
        type={"text"}
        value={alpha}
        className="updateTextField"
        id="updateAlpha"
        onChange={(e) => {
          setAlpha(e.target.value);
        }}
      />
      <InputLabel htmlFor="updateUni" sx={{ fontSize: "14px" }}>
        University
      </InputLabel>
      <TextField
        className="updateTextField"
        size="small"
        id="updateUni"
        type={"text"}
        value={props.name}
        disabled
      />

      <InputLabel htmlFor="updateDomain" sx={{ fontSize: "14px" }}>
        Domain
      </InputLabel>
      <TextField
        className="updateTextField"
        size="small"
        id="updateDomain"
        type={"text"}
        value={domain}
        onChange={(e) => {
          setDomain(e.target.value);
        }}
      />

      <InputLabel htmlFor="updateCountry" sx={{ fontSize: "14px" }}>
        Country
      </InputLabel>
      <TextField
        className="updateTextField"
        size="small"
        id="updateCountry"
        type={"text"}
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />

      <InputLabel htmlFor="updateWebsite" sx={{ fontSize: "14px" }}>
        Website
      </InputLabel>
      <TextField
        className="updateTextField"
        size="small"
        id="updateWebsite"
        type={"text"}
        value={website}
        onChange={(e) => {
          setWebsite(e.target.value);
        }}
      />

      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Button
          sx={{
            backgroundColor: "rgb(31, 58, 147)",
          }}
          variant="contained"
          onClick={() => {
            dispatch(getFinalData(up()));
            updateNotify();
          }}
        >
          Update
        </Button>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Button
          sx={{
            borderColor: "rgb(31, 58, 147)",
            color: "rgb(31, 58, 147)",
          }}
          onClick={() => {}}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default UpdateRecordForm;
