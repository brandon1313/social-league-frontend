import { Button } from "@mui/material";

const General = () => {
  return (
    <div style={{ marginTop: "2%" }}>
      <Button variant="contained" color="primary" style={{ marginRight: 5 }}>
        Imprimir reportes
      </Button>
      <Button variant="contained" color="primary">
        Actualizar Handicap General
      </Button>
    </div>
  );
};

export default General;
