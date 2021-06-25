import React, { useEffect } from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  getTicketsSnapshot,
  getMyTickets,
  getTicketsAssigned,
} from "../../redux/actionCreators/ticket";
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons/";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const columns = [
  { title: "Id", field: "id", hidden: true },
  {
    title: "Asunto",
    field: "subject",
  },
  { title: "Solicitante", field: "claimant" },
  { title: "Solicitado", field: "requested" },
  {
    title: "Tipo",
    field: "classification",
  },
  { title: "Prioridad", field: "priority" },
  {
    title: "Estado",
    field: "status",
  },
];

export const TableTickets = ({ history, location }) => {
  const dispatch = useDispatch();

  const { uid, displayName } = useSelector((state) => state.auth);

  console.log(location.pathname);

  useEffect(() => {
    if (location.pathname === "/mytickets") {
      dispatch(getMyTickets(uid));
    } else if (location.pathname === "/tickets/assigned") {
      dispatch(getTicketsAssigned(displayName));
    } else {
      dispatch(getTicketsSnapshot());
    }
  }, [dispatch, location.pathname, uid, displayName]);

  const { data } = useSelector((state) => state.tickets);

  return (
    <Grid>
      <MaterialTable
        title="Tickets"
        icons={tableIcons}
        columns={columns}
        data={data}
        onRowClick={(e, rowData) => history.push(`/ticket/${rowData.id}`)}
        options={{
          grouping: true,
        }}
      />
    </Grid>
  );
};
