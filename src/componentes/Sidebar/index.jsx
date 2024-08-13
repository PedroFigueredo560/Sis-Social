// // Sidebar/index.jsx
// import React from "react";
// import PropTypes from "prop-types";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import CloseIcon from "@mui/icons-material/Close";
// import { IconButton, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import "./style.css";


// const Sidebar = ({ open, toggleSidebar }) => {
//   return (
//     <Drawer open={open} onClose={toggleSidebar} anchor="right">
//       <List className="list">
//         <ListItem className="list-menu">


//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="fecha"
//             sx={{ mr: -2, color: "black" }}
//             className="fecha"
//             style={{ color: "#333" }}
//             onClick={toggleSidebar}
//           >
//             <CloseIcon />
//           </IconButton>
//         </ListItem>

//         {/* <ListItem onClick={toggleSidebar} className="list-item">
//           <Typography className="text-item home">
//             <a href="#hero">Home</a>
//           </Typography>
//         </ListItem> */}
//         <ListItem onClick={toggleSidebar} className="list-item">
//           <Typography className="text-item">
//             <a href="/">Início</a>
//           </Typography>
//         </ListItem>
//         <ListItem onClick={toggleSidebar} className="list-item">
//           <Typography className="text-item">
//             <a href="#sobre">Sobre</a>
//           </Typography>
//         </ListItem>
//         <ListItem onClick={toggleSidebar} className="list-item">
//           <Typography className="text-item">
//             <a href="#servicos">Serviços</a>
//           </Typography>
//         </ListItem>
//         <ListItem onClick={toggleSidebar} className="list-item">
//           <Typography className="text-item">
//             <a href="#contato">Contato</a>
//           </Typography>
//         </ListItem>
//         <ListItem onClick={toggleSidebar} className="list-item">
//           <Typography className="text-item">
//             <Link to="/login">Login</Link>
//           </Typography>
//         </ListItem>
//         <ListItem onClick={toggleSidebar} className="list-item">
//           <Typography className="text-item">
//             <Link to="/cadastro">Cadastro</Link>
//           </Typography>
//         </ListItem>
//       </List>
//     </Drawer>
//   );
// };

// Sidebar.propTypes = {
//   open: PropTypes.bool.isRequired,
//   toggleSidebar: PropTypes.func.isRequired,
// };

// export default Sidebar; 
import React from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer open={open} onClose={toggleSidebar} anchor="right">
      <List className="list">
        <ListItem className="list-menu">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="close"
            sx={{ mr: -2, color: "black" }}
            className="fecha"
            onClick={toggleSidebar}
          >
            <CloseIcon />
          </IconButton>
        </ListItem>
        <ListItem onClick={toggleSidebar} className="list-item">
          <Typography className="text-item">
            <a href="/">Início</a>
          </Typography>
        </ListItem>
        <ListItem onClick={toggleSidebar} className="list-item">
          <Typography className="text-item">
            <a href="#sobre">Sobre</a>
          </Typography>
        </ListItem>
        <ListItem onClick={toggleSidebar} className="list-item">
          <Typography className="text-item">
            <a href="#servicos">Serviços</a>
          </Typography>
        </ListItem>
        <ListItem onClick={toggleSidebar} className="list-item">
          <Typography className="text-item">
            <a href="#contato">Contato</a>
          </Typography>
        </ListItem>
        <ListItem onClick={toggleSidebar} className="list-item">
          <Typography className="text-item">
            <Link to="/login">Login</Link>
          </Typography>
        </ListItem>
        <ListItem onClick={toggleSidebar} className="list-item">
          <Typography className="text-item">
            <Link to="/cadastro">Cadastro</Link>
          </Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
