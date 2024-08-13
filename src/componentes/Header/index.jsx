// import React, { useState } from "react";
// import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import Sidebar from "../Sidebar";
// import "./style.css";
// import { Link, useNavigate } from "react-router-dom";
// import { useTheme } from "@mui/material/styles";



// export default function Header() {
//   const [open, setOpen] = useState(false);

//   const toggleSidebar = () => {
//     setOpen(!open);
//   };

//   const theme = useTheme();
//   const navigate = useNavigate();

//   return (
//     <>
//       <Box className="Box"
//         sx={{
//           flexGrow: 1,
//           position: "sticky",
//           top: 0,
//           backgroundColor: "#333",
//           color: theme.offwhite,
//           zIndex: 999,
//         }}
//       >
//         <AppBar position="static" color="transparent" elevation={0} className="appbar">
//           <Toolbar>
//             <Typography className="logo">
//               <Link to="/" className="logo-link">
//                 <img className="logo" src="src/assets/logo.png" alt="Logo_sis_social" />
//               </Link>
//             </Typography>
//             <Typography
//               display="flex"
//               alignItems="center"
//               variant="h6"
//               component="div"
//               sx={{ flexGrow: 1, color: "#fff", fontWeight: 700, cursor: "pointer" }}
//               className="title"
//               data-testid="linkLogoHeader"
//               onClick={() => {
//                 window.scrollTo({
//                   top: 0,
//                   behavior: "smooth",
//                 });
//               }}
//             >

//               {/* <Link to="/agendamentos" className="nav-link">
//                         Agendamentos
//                       </Link>
//                     </Button>
//                     <Button>
//                       <Link to="/financeiro" className="nav-link">
//                         Financeiro
//                       </Link>
//                     </Button>
//                     <Button>
//                       <Link to="/documentos" className="nav-link">
//                         Modelos
//                       </Link>
//                     </Button>
//                     <Button>
//                       <Link to="/documentosBen" className="nav-link">
//                         Documentos
//                       </Link>
//                     </Button>
//                     <Button onClick={logout} className="nav-link">
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button>
//                       <Link to="/cadastro" className="nav-link">
//                         Cadastro
//                       </Link>
//                     </Button>
//                     <Button>
//                       <Link to="/login" className="nav-link">
//                         Login
//                       </Link>
//  */}


//             </Typography>
//             <span className="desktop">
//               <Typography>
//                 <a href="/" >Início</a>
//               </Typography>
//               <Typography>
//                 <a href="#sobre" >Sobre</a>
//               </Typography>
//               <Typography>
//                 <a href="#contato" >Contato</a>
//               </Typography>
//               <Typography>
//                 <a href="#servicos" >Serviços</a>
//               </Typography>
//               <Typography>
//                 <Link to="/login">Login</Link>
//               </Typography>
//               <Typography>
//                 <Link to="/cadastro" className="button-cadastro">Cadastro</Link>
//               </Typography>


//             </span>

//             <IconButton
//               size="large"
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               sx={{ mr: -2, color: "white" }}
//               onClick={toggleSidebar}
//               className="mobile-links"
//             >
//               <MenuIcon />
//             </IconButton>
//           </Toolbar>
//         </AppBar>
//       </Box>
//       <Sidebar open={open} toggleSidebar={toggleSidebar} />
//     </>
//   );
// }


import React, { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import './style.css';

export default function Header() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        className="Box"
        sx={{
          flexGrow: 1,
          position: 'sticky',
          top: 0,
          backgroundColor: '#333',
          color: theme.offwhite,
          zIndex: 999,
        }}
      >
        <AppBar position="static" color="transparent" elevation={0} className="appbar">
          <Toolbar>
            <Typography className="logo">
              <Link to="/" className="logo-link">
                <img className="logo" src="src/assets/logo.png" alt="Logo_sis_social" />
              </Link>
            </Typography>
            <span className="desktop">
              <Typography>
                <a href="/">Início</a>
              </Typography>
              <Typography>
                <a href="#sobre">Sobre</a>
              </Typography>
              <Typography>
                <a href="#servicos">Serviços</a>
              </Typography>
              <Typography>
                <a href="#contato">Contato</a>
              </Typography>
              <Typography>
                <Link to="/login">Login</Link>
              </Typography>
              <Typography>
                <Link to="/cadastro" className="button-cadastro">Cadastro</Link>
              </Typography>
            </span>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: -2, color: 'white' }}
              onClick={toggleSidebar}
              className="mobile-links"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Sidebar open={open} toggleSidebar={toggleSidebar} />
    </>
  );
}
