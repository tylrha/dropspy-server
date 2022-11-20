import AccordionMui from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = (props) => {
  return (
    <AccordionMui expanded={true}>

      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography>{props.title}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {props.children}
      </AccordionDetails>

    </AccordionMui>
  );
}

export default Accordion
