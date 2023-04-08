import React from "react";
import {
  AppBar,
  Paper,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  Card,
  Button,
  Select,
  MenuItem,
  CardActions,
  CardContent,
  InputLabel,
  FormControl,
} from "@mui/material";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RedeemIcon from "@mui/icons-material/Redeem";

export default class Component extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentScore: 10,
      bottomView: 0,
      leaderboard: [],
      tasks: [],
      scores: [],
      maxPoints: 0,
      redeemData: [],
    };
  }

  public componentDidMount(): void {
    this.getLeaderboardData();
    this.getTaskData();
    this.getRedeemData();
  }

  private getRedeemData = () => {
    fetch("http://10.153.54.223:5000/redeem/data")
      .then((response) => response.json())
      .then((data) => {
        let temp: any[] = [];

        for (let i = 0; i < data.length; i++) {
          let temp2 = {
            product: data[i].product,
            points: data[i].points,
          };

          temp.push(temp2);
        }

        this.setState({
          ...this.state,
          redeemData: temp,
        });

        console.log("rendeem data : ", data);
      });
  };

  private getTaskData = () => {
    fetch("http://10.153.54.223:5000/tasks/data")
      .then((response) => response.json())
      .then((data) => {
        let gsum = 0;
        console.log("received data : ", data);
        let temp: any[] = [];
        let temp3: any[] = [];
        for (let i = 0; i < data.length; i++) {
          let temp2 = {
            cat: data[i].category,
            task: data[i].task,
            mP: data[i].max_points,
            options: data[i].options,
          };

          temp.push(temp2);
          temp3.push(0);
          gsum += temp2.mP;
        }

        this.setState({
          ...this.state,
          tasks: temp,
          scores: temp3,
          maxPoints: gsum,
        });
      });
  };

  private getLeaderboardData = () => {
    fetch("http://10.153.54.223:5000/users/data")
      .then((response) => response.json())
      .then((data) => {
        let temp: any[] = [];
        for (let i = 0; i < data.length; i++) {
          let temp2 = {
            name: data[i].name,
            score: data[i].score,
          };
          temp.push(temp2);
        }
        this.setState({
          ...this.state,
          leaderboard: temp,
        });
      });
  };

  private updateScore = () => {
    fetch("http://10.153.54.223:5000/users/6431cc23e7b681cd654cfa19", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ score: this.state.currentScore }),
    }).then((_) => this.getLeaderboardData());
  };

  private getTasks = () => {
    let contents: any[] = [];
    for (let i = 0; i < this.state.tasks.length; i++) {
      let menu = <React.Fragment />;
      if (this.state.tasks[i].options) {
        let options: any[] = [];
        for (let j = 0; j < this.state.tasks[i].options.length; j++) {
          options.push(
            <MenuItem value={this.state.tasks[i].options[j].points}>
              {this.state.tasks[i].options[j].type}
            </MenuItem>
          );
        }
        menu = (
          <React.Fragment>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <InputLabel id="demo-simple-select-label">
                {"Earn upto " + this.state.tasks[i].mP}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={"Earn upto " + this.state.tasks[i].mP}
                variant="filled"
                onChange={(event) => {
                  let temp2 = this.state.scores;
                  temp2[i] = parseInt(event.target.value as any);
                  let updated_score = 0;
                  for (let k = 0; k < temp2.length; k++)
                    updated_score += temp2[k];
                  this.setState({
                    ...this.state,
                    scores: temp2,
                    currentScore: updated_score,
                  });
                  this.updateScore();
                }}
              >
                {options}
              </Select>
            </FormControl>
          </React.Fragment>
        );
      } else {
        menu = (
          <Button
            variant="outlined"
            onClick={() => {
              if (this.state.tasks[i].options) {
                console.log("FAILED");
              } else {
                console.log("button hard");
                let temp2 = this.state.scores;
                temp2[i] = this.state.tasks[i].mP;
                let updated_score = 0;
                for (let k = 0; k < temp2.length; k++)
                  updated_score += parseInt(temp2[k]);
                this.setState({
                  ...this.state,
                  scores: temp2,
                  currentScore: updated_score,
                });
                this.updateScore();
              }
            }}
          >
            {"Earn upto " + this.state.tasks[i].mP}
          </Button>
        );
      }

      let temp = (
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <Card
            style={{ margin: "10px", border: "2px" }}
            sx={{ boxShadow: 12, borderRadius: "2px" }}
          >
            <CardContent>
              <Typography variant="h4">{this.state.tasks[i].cat}</Typography>
              <Typography variant="h5">{this.state.tasks[i].task}</Typography>
            </CardContent>
            <CardActions>{menu}</CardActions>
          </Card>
          <Divider style={{ marginTop: "5px" }} />
        </div>
      );
      contents.push(temp);
    }
    return <React.Fragment>{contents}</React.Fragment>;
  };

  private getLeaderboard = () => {
    let rows = this.state.leaderboard;
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  private getRedeemPage = () => {
    let menu: any[] = [];
    for (let i = 0; i < this.state.redeemData.length; i++) {
      let temp = (
        <Card sx={{ margin: '20px', boxShadow: 12, borderRadius: "2px" }}>
          <CardContent>
            <Typography variant="h4">
              {" "}
              {this.state.redeemData[i].product}{" "}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>
              {"Redeem using " + this.state.redeemData[i].points + " points"}
            </Button>
          </CardActions>
        </Card>
      );
      menu.push(temp);
    }
    return <React.Fragment>{menu}</React.Fragment>;
  };

  private getData = () => {
    if (this.state.bottomView === 0) {
      return this.getTasks();
    } else if (this.state.bottomView === 1) {
      return this.getLeaderboard();
    } else {
      return this.getRedeemPage();
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
                GreenBoard
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
                  {"Your current score : " +
                    this.state.currentScore +
                    " points."}
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
                    maxValue={this.state.maxPoints}
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
            <Divider style={{ marginBottom: "40px" }} />
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
                  <BottomNavigationAction
                    label="Redeem Points"
                    icon={<RedeemIcon />}
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
