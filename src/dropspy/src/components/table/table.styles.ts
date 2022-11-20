import styled from 'styled-components'

const TableContainerStyled = styled.div`

  display: 'flex';
  height: '100%';

  .MuiDataGrid-toolbarContainer {
    display: flex;
    justify-content: flex-end;
  }

  .datagrid, .MuiTablePagination-root, div[role="grid"] {
    background-color: var(--background-color-alt) !important;
    color: var(--text-color) !important;
    box-shadow: var(--box-shadow);
  }

  .cellWithImg {
    display: flex;
    align-items: center;

    .cellImg {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 20px;
    }
  }

  .cellStatus {

    &[bot-status="active"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(70, 184, 4);
    }

    &[bot-status="error"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(203, 18, 18);
    }

    &[bot-status="inactive"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(188, 50, 206);
    }

    &[user-role="admin"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(203, 18, 18);
    }

    &[user-role="user"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(70, 184, 4);
    }

    &[label="product"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(203, 18, 18);
    }

    &[label="strategy"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(70, 184, 4);
    }

    &[label="special"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(0, 220, 200);
    }

    &[label="no-label"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(188, 50, 206);
    }


    &[category="generic"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: crimson;
    }

    &[category="specific"]{
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(70, 184, 4);
    }

  }

  .cellTier {
    &[data-tier="2-S"] {
      background-color: rgba(255, 0, 0, 0.05);
      color: crimson;
    }

    &[data-tier="3-A"] {
      background-color: rgba(255, 0, 0, 0.05);
      color: goldenrod;
    }

    &[data-tier="4-B"] {
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(70, 184, 4);
    }

    &[data-tier="5-C"] {
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(4, 178, 184);
    }

    &[data-tier="6-D"] {
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(4, 16, 184);
    }

    &[data-tier="7-E"] {
      background-color: rgba(255, 0, 0, 0.05);
      color: rgb(146, 0, 151);
    }
  }

  .cellAction {
    display: flex;
    align-items: center;
    gap: 15px;

    .isFavorite {
      cursor: pointer;

      &.favorite{
        color: red;
      }
    }

    .isSpying {
      cursor: pointer;

      &.active{
        color: green;
      }

      &.inactive{
        color: red;
      }
    }

    .viewButton {
      background-color: var(--background-color);
      padding: 2px 5px;
      border-radius: 5px;
      border: 1px dotted rgba(0, 0, 139, 0.596);
      cursor: pointer;
    }

  }

`

export {
  TableContainerStyled
}
