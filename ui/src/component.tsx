import { AppBar, Box, Paper, Typography } from "@mui/material";
import React from "react";

export default class Component extends React.Component<any, any> {
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
        <Paper elevation={3} style={{height: '100%', width: '100%'}}>
        <div id="title" style={{height: '30%', width: '100%'}}>
          <AppBar position="static">
            <Typography variant="h2" noWrap>
              Greenify Me!!
            </Typography>
          </AppBar>
        </div>
        <div id="body" style={{height: '70%', width: '100%'}}>
          <Box>
            {"This is the body of the application"}
          </Box>
        </div>
        </Paper>
      </div>
    );
  }
}
