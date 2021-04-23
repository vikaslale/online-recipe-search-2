import React from "react";
import Accordion from "@material-ui/core/Accordion";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

import Icons from "../../img/icons.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1"
  },
  bgColor: {
    backgroundColor: "#f9f5f3"
  },
  list: {
    fontSize: "1.2rem",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    flex: "1",
    justifyContent: "center",
    listStyle: "none"
  },
  heading: {
    fontSize: "1.5rem",
    fontWeight: "600"
  }
}));

const CartAccordion = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          className={classes.bgColor}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={`${classes.heading} heading--2`}>
            {props.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"ul"} className={classes.list}>
            {props.children}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default CartAccordion;
