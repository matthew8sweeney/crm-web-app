import React, { useEffect, useRef, useState } from "react";
import {
  AppBar,
  IconButton,
  Paper,
  Tab,
  Tabs,
  useScrollTrigger,
} from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterList";

// import classes from "./SelectPanel.module.css";

const SelectPanel = (props) => {
  const scrollRef = useRef();

  const [tab, setTab] = useState(undefined); // really initialized in useEffect

  const handleChange = (event, index) => {
    setTab(index);
  };

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: false, // false by default, Mui example sets to true
    threshold: 0,
    target: scrollRef.current,
  });
  // re-create scrollTrigger once scroll target is in the DOM
  useEffect(() => {
    setTab(props.activeTab || 0);
  }, []);

  // elevation={scrollTrigger ? 4 : 0} as prop to AppBar for scroll elevation
  return (
    <div
      className={props.className}
      style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
    >
      <AppBar elevation={scrollTrigger ? 4 : 0}>
        <Tabs value={tab} onChange={handleChange}>
          {props.tabs.map((label) => (
            <Tab label={label} />
          ))}
        </Tabs>
        <IconButton title="filter" style={{ borderRadius: 0 }}>
          <FilterIcon />
        </IconButton>
      </AppBar>

      <Paper
        square
        // {...props.PaperProps}
        style={{ flexGrow: 1, overflowY: "auto" }}
        ref={scrollRef}
      >
        {props.bodies[tab]}
      </Paper>
    </div>
  );
};

export default SelectPanel;