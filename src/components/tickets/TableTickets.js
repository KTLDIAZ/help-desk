import React from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";
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
import { useHistory } from "react-router-dom";

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

export const TableTickets = ({ data, tittle }) => {
  const history = useHistory();

  return (
    <Grid>
      {data && (
        <MaterialTable
          title={tittle}
          icons={tableIcons}
          columns={columns}
          data={data}
          onRowClick={(e, rowData) => history.replace(`/ticket/${rowData.id}`)}
          options={{
            grouping: true,
          }}
        />
      )}
    </Grid>
  );
};
