import React, { Component } from "react";
import { Button, Typography, Box, Divider } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { NewProjectCard, Project } from "./Project";
import Footer from "./footer.js";
import Note from "./Note.js";
import Statistics from "./Statistics";

class App extends Component {
  constructor() {
    super();

    this.state = {
      projectExists: false,
      newProjectView: false,
      prevKeyPress: 0,
      showNotes: true,
    };

    if (localStorage.getItem("project") !== undefined) {
      this.setState({ projectExists: true });
    }
    this.spaceFunction = this.spaceFunction.bind(this);
  }

  spaceFunction(event) {
    //double press space to incremement row count
    console.log("before if");
    console.log(this.state);
    if (event.keyCode === 32) {
      //space bar press
      if (this.state.prevKeyPress === 0) {
        this.setState({ prevKeyPress: Date.now() }); //if first press, set cur time
      } else {
        // if second press
        const prevKeyPress = this.state.prevKeyPress;
        const now = Date.now();
        if (now - prevKeyPress < 200) {
          //within 200ms delay, incremement row
          const project = JSON.parse(localStorage.getItem("project"));
          const curRow = parseInt(project.curRow);
          const totRow = parseInt(project.totRow);
          if (curRow !== totRow || curRow === 0) {
            project.lastUpdated = new Date();
            project.curRow = curRow + 1;
            localStorage.setItem("project", JSON.stringify(project));
            this.setState(this.state);
          }
          this.setState({ prevKeyPress: 0 }); //restarting
        } else {
          this.setState({ prevKeyPress: Date.now() }); //not within 200ms delay, count as first press
        }
      }
    }
  }

  isMobile() {
    let check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.spaceFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.spaceFunction, false);
  }

  render() {
    const projectExists = this.state.projectExists;
    const newProjectView = this.state.newProjectView;
    let showNotes = this.state.showNotes;
    const newProjectButton = (
      <div>
        <Button
          color="primary"
          align="center"
          variant="outlined"
          onClick={() => {
            this.setState({ newProjectView: true });
          }}
        >
          New Project
        </Button>
      </div>
    );
    if (this.isMobile()) {
      showNotes = false;
    }
    return (
      <Box align="center">
        {/* title */}
        <Box display="flex" flexDirection="row" justifyContent="center" p={1}>
          <img
            src={require("./logo.png")}
            alt="yarnIcon"
            width="40%"
            height="40%"
          />
        </Box>

        <Divider variant="middle" style={{ marginBottom: 30 }} />

        {/* notes */}
        {showNotes && [
          <Box position="relative" float="left">
            <Note />
            <CancelIcon
              style={{
                position: "absolute",
                left: "0px",
                paddingLeft: "385px",
              }}
              color="primary"
              onClick={() => {
                this.setState({ showNotes: false });
              }}
            />
            {/* </div> */}
          </Box>,
        ]}
        {/* statistics */}
        {/* <Box position="relative" style={{ float: "right" }}>
          <Statistics />
        </Box> */}
        {/* project */}
        <Box
          width="500px"
          // border="1px solid black"
          display="contents"
          alignItems="center"
          justifyContent="center"
        >
          <Project />
        </Box>

        {/* new project button */}
        {/* <Divider variant="middle" style={{ marginTop: 20, marginBottom: 10 }} /> */}

        <Box display="flex" flexDirection="column" align="center" p={2}>
          {projectExists
            ? null
            : [newProjectView ? <NewProjectCard /> : newProjectButton]}
        </Box>
        <Box
          marginTop={10}
          alignItems="center"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          margin="auto"
          left="0"
          right="0"
        >
          <Typography variant="overline" color="secondary">
            double space anywhere or tap current row to increase row count
          </Typography>
        </Box>

        {/* footer */}
        <Footer />
      </Box>
    );
  }
}

export default App;
