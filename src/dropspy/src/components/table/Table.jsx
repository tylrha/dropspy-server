import { DataGrid } from "@mui/x-data-grid";
import { TableContainerStyled } from './table.styles'
// import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

// const CustomToolbar = () => {

//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

const Table = (props) => {

  const { data, columns, maxItems } = props.value

  return (
    <TableContainerStyled>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection={false}
          autoHeight={true}
          initialState={{
            pagination: {
              pageSize: maxItems || 100,
            },
          }}
          rowsPerPageOptions={[maxItems || 100]}
          // components={{ Toolbar: CustomToolbar }}
        />
      </div>
    </TableContainerStyled>
  )
}

export { Table }
