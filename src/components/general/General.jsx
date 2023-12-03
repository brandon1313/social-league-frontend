import { Button } from "@mui/material";
import useSnackbar from "../../features/useSnackbar";
import SnackbarMessage from "../system/SnackBarMessage";
const General = () => {
  const {
    message: snackbarMessage,
    severity: snackbarSeverity,
    snackbarOpen,
    showSnackbar,
    hideSnackbar,
  } = useSnackbar();

  const generateReport = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try{
      const req = await fetch(
        "http://localhost:9898/api/tournament/report/pdf",
        requestOptions
      );
      showSnackbar("REPORTES GENERADOS!", "success");
      }catch(error){
      showSnackbar("Ocurrio un error inesperado.", "error")
      }
  };

  const sendReportByEmail = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try{
    const req = await fetch(
      "http://localhost:9898/api/tournament/report/send",
      requestOptions
    );
    showSnackbar("REPORTES GENERADOS!", "success");
    }catch(error){
    showSnackbar("Ocurrio un error inesperado.", "error")
    }
    
  };


  const sendReportByClub = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try{
    const req = await fetch(
      "http://localhost:9898/api/tournament/report/club/pdf",
      requestOptions
    );
    showSnackbar("REPORTES GENERADOS!", "success");
    }catch(error){
    showSnackbar("Ocurrio un error inesperado.", "error")
    }
    
  }

  const generalHDCP = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };
    try{
    const req = await fetch(
      "http://localhost:9898/api/player/hdcp/general",
      requestOptions
    );
    showSnackbar("HANDICAP ACTUALIZADOS!", "success");
    }catch(error){
      console.log(error)
      showSnackbar("Error inesperado.", "error")
    }
  };
  return (
    <div style={{ marginTop: "2%" }}>
      <Button variant="contained" color="primary" style={{ marginRight: 5 }} onClick={() => generateReport()}>
        Imprimir reportes
      </Button>
      <Button variant="contained" color="primary" style={{ marginRight: 5 }} onClick={() => generalHDCP()}>
        Actualizar Handicap General
      </Button>
      <Button variant="contained" color="primary" onClick={() => sendReportByEmail()}>
        Enviar reporte por Email
      </Button>

      <Button variant="contained" color="primary" onClick={() => sendReportByClub()}>
        Reportes premios por Club
      </Button>


      <SnackbarMessage
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={hideSnackbar}
      />
    </div>
  );
};

export default General;
