import React from "react";
import { AppBar, Paper, Typography } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentScore: 10,
    };
  }

  public render(): React.ReactNode {
    return (
      <div
        id="component-root"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Paper elevation={3} style={{ height: "100%", width: "100%" }}>
          <div id="title" style={{ height: "30%", width: "100%" }}>
            <AppBar position="static">
              <Typography variant="h2" noWrap>
                Greenify Me!!
              </Typography>
            </AppBar>
          </div>
          <div id="body" style={{ height: "70%", width: "100%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h3" style={{ width: "fit-content" }}>
                {"Your current score : " + this.state.currentScore}
              </Typography>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <CircularProgressbar
                  value={parseInt(this.state.currentScore)}
                  maxValue={100}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: "butt",
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: "#8BC34A",
                    textColor: "#f88",
                    trailColor: "#FFCCBC",
                    backgroundColor: "#3e98c7",
                  })}
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
