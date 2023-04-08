import React from "react";
import {
  AppBar,
  Paper,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
} from "@mui/material";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentScore: 10,
      bottomView: 0,
    };
  }

  private getTasks = () => {
    return <p>Tasks</p>
  }

  private getLeaderboard = () => {

    const rows = [
      {'name': 'first', 'rank': 10},
      {'name': 'second', 'rank': 20},
    ]

    return ( 
      <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    )
  }

  private getData = () => {
    if (this.state.bottomView === 0) {
      return this.getTasks();
    } else {
      return this.getLeaderboard();
    }
  };

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
          <div id="title" style={{ width: "100%" }}>
            <AppBar position="static" style={{ backgroundColor: "#8bc34a" }}>
              <Typography variant="h2" noWrap>
                Greenify Me!!
              </Typography>
            </AppBar>
          </div>
          <div id="body" style={{ marginTop: "5px", width: "100%" }}>
            <AppBar position="static" color="transparent">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3" style={{ width: "fit-content" }}>
                  {"Your current score : " + this.state.currentScore + "%"}
                </Typography>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <CircularProgressbarWithChildren
                    value={parseInt(this.state.currentScore)}
                    maxValue={100}
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: "butt",
                      pathTransitionDuration: 0.5,
                      pathColor: "#8BC34A",
                      textColor: "#f88",
                      trailColor: "#FFCCBC",
                      backgroundColor: "#3e98c7",
                    })}
                  ></CircularProgressbarWithChildren>
                </div>
              </div>
            </AppBar>
            <Divider />
            {this.getData()}
            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <div>
                <BottomNavigation
                  showLabels
                  value={this.state.bottomView}
                  onChange={(event, newValue) => {
                    this.setState({
                      ...this.state,
                      bottomView: newValue,
                    });
                  }}
                >
                  <BottomNavigationAction
                    label="Tasks"
                    icon={<TaskAltIcon />}
                  />
                  <BottomNavigationAction
                    label="Leaderboard"
                    icon={<LeaderboardIcon />}
                  />
                </BottomNavigation>
              </div>
            </Paper>
            <Divider />
          </div>
        </Paper>
      </div>
    );
  }
}
