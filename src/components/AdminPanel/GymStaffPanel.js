import * as React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { Button } from "../Navbar/Button";
import MenuItem from "@mui/material/MenuItem";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import Input from "../Controls/Input.js";
import {
  stableSort,
  getComparator,
} from "../SearchAndSortMethods/SearchAndSort.js";
import { InputAdornment, TableFooter, TableSortLabel } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Search from "@mui/icons-material/Search";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TablePagination from "@mui/material/TablePagination";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F05454",
    color: theme.palette.common.white,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const gender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];
function GymStaffPanel() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  //Below are new user data when staff admin added
  const [newUserID, setNewUserID] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserMail, setNewUserMail] = useState("");
  const [newUserGender, setNewUserGender] = useState("");
  const [newUserBirthDate, setNewUserBirthDate] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserPhone, setNewUserPhone] = "";

  //Below are for editing users
  const [editUserID, setEditUserID] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editUserMail, setEditUserMail] = useState("");
  const [editUserGender, setEditUserGender] = useState("");
  const [editUserBirthDate, setEditUserBirthDate] = useState("");
  const [editUserPhone, setEditUserPhone] = useState("");
  const [editUserWeight, setEditUserWeight] = useState("");
  const [editUserHeight, setEditUserHeight] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");

  const pages = [5, 10, 15];
  const headCells1 = [
    { id: "id", label: "ID" },
    { id: "email", label: "Mail" },
    { id: "name", label: "Full Name" },
    { id: "phoneNumber", label: "Phone Number" },
    { id: "birthdate", label: "Birth Date" },
    { id: "gender", label: "Gender" },
    { id: "weight", label: "Weight" },
    { id: "height", label: "Height" },
    { id: "resButton1", label: "", disableSorting: true },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [searchSelection, setSearchSelection] = useState();

  useEffect(() => {
    setUserData();
  }, []);

  function setUserData() {
    fetch("http://localhost:8080/user/gymMember")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
        console.log(result);
      });
  }

  function handleAddGymMember() {
    console.log(
      "http://localhost:8080/user/gymMember/add?token=" +
        localStorage.getItem("usertoken")
    );
    fetch(
      "http://localhost:8080/user/gymMember/add?token=" +
        localStorage.getItem("usertoken"),
      {
        method: "POST",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: newUserID,
          name: newUserName,
          hashedPassword: newUserPassword,
          email: newUserMail,
          phoneNumber: newUserPassword,
          birthday: new Date(newUserBirthDate),
          gender: newUserGender,
        }),
      }
    ).then((result) => {
      result.text().then((actualResult) => {
        setUserData();
      });
    });
  }

  function handleEditGymMember(id) {
    fetch("http://localhost:8080/user/editGymMember/" + id, {
      method: "PATCH",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editUserName,
        email: editUserMail,
        phoneNumber: editUserPhone,
        height: editUserHeight,
        weight: editUserWeight,
      }),
    }).then((result) => {
      result.text().then((actualResult) => {
        if (!actualResult.includes("edited.")) alert(actualResult);
        setUserData();
      });
    });
  }

  function handleBan(id)
  {
      console.log("selamaleykum");
      fetch("http://localhost:8080/user/gymMember/restrict/" + id, {
          method: "POST"
      }).then((result) => {
          result.text().then((actualResult) => {
                alert(actualResult)
                setUserData()
                console.log("aleykumselam");
          })
      })
  }
  const handleClickOpen5 = () => {
    setOpen5(true);
  };

  const handleClose5 = () => {
    setOpen5(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const cancelNewUser = () => {
    setNewUserID("");
    setNewUserName("");
    setNewUserMail("");
    setNewUserGender("");
    setNewUserBirthDate("");
  };
  const cancelEditingUser = () => {
    setEditUserID("");
    setEditUserName("");
    setEditUserMail("");
    setEditUserGender("");
    setEditUserBirthDate("");
  };

  const cancelNewStaff = () => {
    setNewUserID("");
    setNewUserName("");
    setNewUserMail("");
    setNewUserGender("");
    setNewUserBirthDate("");
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          switch (searchSelection) {
            case "id":
              return items.filter((x) => x.id.toString().includes(target.value));
            case "email":
              return items.filter((x) => x.email.includes(target.value));
            case "name":
              return items.filter((x) => x.name.includes(target.value));
            case "phoneNumber":
              return items.filter((x) => x.phoneNumber.includes(target.value));
            case "birthdate":
              return items.filter((x) => x.birthday.includes(target.value));
            case "gender":
              return items.filter((x) => x.gender.includes(target.value));
            case "weight":
              return items.filter((x) => x.weight.toString().includes(target.value));
            case "height":
              return items.filter((x) => x.height.toString().includes(target.value));
            default:
              return items.filter((x) => x.name.includes(target.value));
          }
      },
    });
  };

  const usersAfterSortingAndPaging = () => {
    return stableSort(filterFn.fn(users), getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    );
  };

  const handleSortRequest = (cellId) => {
    const isAscending = orderBy === cellId && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const handleSearchSelection = (event) => {
    setSearchSelection(event.target.value);
  };

  //fetching data from restAPI

  /* //This will take the values in  editUser.. consts and adding to database
    const submitEditingUser(index) =>{
    
    }*/
  /* This const takes the index of users and deletes it
    const deleteUser = (index) =>{

    }*/

  const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
    const { icon } = props;

    const {
      icon: [width, height, , , svgPathData],
    } = icon;

    return (
      <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
        {typeof svgPathData === "string" ? (
          <path d={svgPathData} />
        ) : (
          svgPathData.map((d, i) => (
            <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
          ))
        )}
      </SvgIcon>
    );
  });

  FontAwesomeSvgIcon.propTypes = {
    icon: PropTypes.any.isRequired,
  };
  return (
    <>
      <div
        style={{
          justifyContent: "right",
          alignItems: "center",
          marginRight: "5rem",
          marginTop: "2rem",
        }}
      >
        {/*<Button onClick={handleClickOpen}> Add User </Button>*/}

      </div>
      <Stack
        className="mainStackUser"
        direction="column"
        spacing={3}
        alignItems="center"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <h1 className="header">All Members</h1>{" "}
        </div>
        <Stack
          className="mainStack"
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <div className="UserContainer">
            <Stack
              className="selectionStack"
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={6}
            >
              <Toolbar>
                <Input
                  label="Search Members"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
                />
              </Toolbar>
              <Box width="12rem">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Search By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchSelection}
                    label="Search By"
                    onChange={handleSearchSelection}
                  >
                    {headCells1.map(
                      (headCell) =>
                        !headCell.disableSorting && (
                          <MenuItem value={headCell.id}>
                            {headCell.label}
                          </MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <TableContainer component={Paper}>
              <Table
                sx={{
                  width: "100%",
                  backgroundColor: "#F5F5F5",
                  height: "max-content",
                }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    {headCells1.map((headCell) => (
                      <StyledTableCell key={headCell.id}>
                        {headCell.disableSorting ? (
                          headCell.label
                        ) : (
                          <TableSortLabel
                            onClick={() => {
                              handleSortRequest(headCell.id);
                            }}
                            direction={orderBy === headCell.id ? order : "asc"}
                            active={orderBy == headCell.id}
                          >
                            {headCell.label}
                          </TableSortLabel>
                        )}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersAfterSortingAndPaging().map((user, index) => (
                    <StyledTableRow key={user.id} component="th" scope="row">
                      <StyledTableCell className="cellItem">
                        {user.id}
                      </StyledTableCell>
                      <StyledTableCell className="cellItem">
                        {user.email}
                      </StyledTableCell>
                      <StyledTableCell className="cellItem">
                        {user.name}
                      </StyledTableCell>
                      <StyledTableCell className="cellItem">
                        {user.phoneNumber}
                      </StyledTableCell>
                      <StyledTableCell className="cellItem">
                        {user.birthday !== undefined
                          ? user.birthday.substring(0, 10)
                          : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell className="cellItem">
                        {user.gender}
                      </StyledTableCell>
                      <StyledTableCell className="cellItem">
                        {user.weight}
                      </StyledTableCell>
                      <StyledTableCell className="cellItem">
                        {user.height}
                      </StyledTableCell>
                      <StyledTableCell className="cellItem">
                        <Stack
                          className="mainStack"
                          direction="row" // This stack is for delete and cancel reservation buttons
                          justifyContent="start"
                          alignItems="start"
                          spacing={0}
                        >
                          <Box
                            className="deleteButton"
                            sx={{
                              "& > :not(style)": {
                                m: 1,
                              },
                            }}
                          >
                            <IconButton
                              aria-label="Example"
                              onClick={() => {
                                handleClickOpen5();
                                setCurrentIndex(user);
                              }}
                            >
                              <FontAwesomeIcon icon={faBan} />
                            </IconButton>

        
                            <Dialog
                              open={open5}
                              onClose={handleClose5}
                              aria-labelledby="Warning"
                              aria-describedby="Warning"
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"Warning 🥴"}
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  You are about to restrict this user. Are you sure?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleClose5}>Cancel</Button>
                                <Button onClick={() => {
                                setOpen5(false);
                                handleBan(currentIndex.id);
                              }} autoFocus>
                                  I am Sure.
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </Box>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                component="div"
                page={page}
                rowsPerPageOptions={pages}
                rowsPerPage={rowsPerPage}
                count={users.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                sx={{
                  width: "100%",
                  backgroundColor: "#F5F5F5",
                  height: "max-content",
                }}
              ></TablePagination>
            </TableContainer>
          </div>
        </Stack>
      </Stack>
    </>
  );
}
export default GymStaffPanel;