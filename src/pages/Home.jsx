import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
                backgroundColor: "#f5f5f5",
                margin: 0,
                padding: 0,
                overflow: "hidden", // Ensures no scrollbars

            }}
        >
            <Box
                sx={{
                    // width: "100%",
                    // height: "100%",
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",
                    // flexDirection: "column",
                    // backgroundColor: "#ffffff",
                    // padding: 4,
                    // boxShadow: 3,
                    // textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#ffffff",
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: "bold",
                        color: "#3f51b5",
                        marginBottom: 2,
                    }}
                >
                    Welcome to the Property Rental Platform
                </Typography>
                <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{ marginBottom: 3 }}
                >
                    Your one-stop destination for finding the perfect home or listing your
                    property!
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate("/login")}
                    >
                        Log In
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}



// import React from "react";
// import { Button, Box, Typography } from "@mui/material";
// import { useNavigate } from "react-router-dom";
//
// export default function Home() {
//     const navigate = useNavigate();
//
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100vh",
//                 width: "100vw",
//                 backgroundColor: "#f5f5f5",
//                 margin: 0,
//                 padding: 0,
//                 overflow: "hidden", // Ensures no scrollbars
//             }}
//         >
//             <Box
//                 sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     textAlign: "center",
//                     width: "100%",
//                     height: "100%",
//                     backgroundColor: "#ffffff",
//                 }}
//             >
//                 <Typography
//                     variant="h3"
//                     component="h1"
//                     gutterBottom
//                     sx={{
//                         fontWeight: "bold",
//                         color: "#3f51b5",
//                         marginBottom: 2,
//                     }}
//                 >
//                     Welcome to the Property Rental Platform
//                 </Typography>
//                 <Typography
//                     variant="h6"
//                     color="textSecondary"
//                     sx={{ marginBottom: 3 }}
//                 >
//                     Your one-stop destination for finding the perfect home or listing your
//                     property!
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button
//                         variant="contained"
//                         color="primary"
//                         size="large"
//                         onClick={() => navigate("/login")}
//                     >
//                         Log In
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         color="primary"
//                         size="large"
//                         onClick={() => navigate("/signup")}
//                     >
//                         Sign Up
//                     </Button>
//                 </Box>
//             </Box>
//         </Box>
//     );
// }
