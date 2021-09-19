import React, {useContext, useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useLocation, BrowserRouter, useHistory} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import {LoginContext} from "../../contexts/LoginContext";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import {Grid, Button} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";
import Container from "@material-ui/core/Container";

const navStyles = makeStyles(theme => ({
    // "@global": {
    //   ".MuiButton-root": {
    //     borderRadius: "unset"
    //   },
    //   "MuiInputBase-root": {
    //     borderRadius: "unset"
    //   }
    // },
    appBar: {
        borderBottom: `10px solid ${theme.bgcolor}`,
        borderTop: `10px solid ${theme.bgcolor}`,
    },
    toolbar: {
        flexWrap: "wrap"
    },
    toolbarTitle: {
        flexGrow: 1
    },
    logolink: {
        color: "black",
        fontWeight: "100",
        paddingTop: "10px,",
        letterSpacing: "5px",
        fontSize: "24px",
        "&:hover": {
            textDecoration: "none",
            color: "darkgray"
        }
    },
    // logoImage: {
    //     position: "absolute",
    //     top: "5px",
    //     left: "90px"
    // },
    // link: {
    //   margin: theme.spacing(1),
    //   fontWeight: "600",
    //   textDecoration: "none",
    //   textTransform: "uppercase"
    // },
    // [theme.breakpoints.down("md")]: {
    links: {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(3)
    },
    link: {
        color: "black",
        margin: theme.spacing(2),
        "&:hover": {
            textDecoration: "none",
            color: "darkgray"
        }
    },
    // },
    // [theme.breakpoints.up("md")]: {
    cart: {
        color: "black",
        "&:hover": {
            textDecoration: "none",
            color: "darkgray"
        },
        marginRight: "10px",
        padding: "10px 20px",
        backgroundColor: "white",
        borderRadius: "10px"
    }
    //   links: {
    //     display: "flex",
    //     flexDirection: "row",
    //     margin: theme.spacing(0)
    //   }
    // }
}));

function SigninPaths(props) {
    const classes = navStyles();
    const location = useLocation();
    const currentPage = location.pathname;
    const {loginWithRedirect , loginWithPopup} = useAuth0();

    const mainUrls = {
        loggedIn: [
            // { label: "Shop", path: "/shop" },
            // { label: "Messages", path: "/messages" },
            // { label: "My Favourites", path: "/my_shop" },

            {
                label: "My Account",
                path: "/my_shop",
                sublinks: [
                    {label: "Profile", path: "/profile"},
                    { label: "Logout", path: "/logout"}

                ]
            },
            { label: "Checkout", path: "/checkout" },

        ],
        loggedOut: [
            {label: "Sign In", path: "/signin"},
            {label: "Register", path: "/signin"},
            { label: "Checkout", path: "/checkout" },
        ]
    };
    const [ModifyLinks, setModifyLinks] = useState(mainUrls[props.login]);

    useEffect(() => {
        if (currentPage === "/signin" && props.login === "loggedOut") {
            setModifyLinks([{label: "Sign Up", path: "/signup"}]);
        } else if (currentPage === "/signup" && props.login === "loggedOut") {
            setModifyLinks([{label: "Sign In", path: "/signin"}]);
        } else {
            console.log('state is', props.login)
            setModifyLinks(mainUrls[props.login]);
        }

        return () => {
        };
    }, [props.login, currentPage, props.cart]);

    return (
        <div className={classes.links}>
            {ModifyLinks.map(linked => {
                if (linked.sublinks) {
                    return (
                        <MyAccount
                            items={linked.sublinks}
                            label={linked.label}
                            Logout={props.Logout}
                            key={linked.label}
                        />
                    );
                }
                return (
                    <>
                        {(linked.path === '/signin') ? (
                                <Link onClick={() => loginWithRedirect()} className={classes.link} key={linked.label}>
                                    {linked.label}
                                </Link>
                            ) :
                            <Link href={linked.path} className={classes.link} key={linked.label}>
                                {linked.label}
                            </Link>

                        }
                    </>
                );
            })}
        </div>
        // {props.cart !== null && (
        //     <Link href={"/checkout"} className={classes.link}>
        //       <Badge
        //           color="secondary"
        //           badgeContent={props.cart.total}
        //           className={classes.margin}
        //       >
        //         <Icon fontSize={"default"}>shopping_cart_basket</Icon>
        //       </Badge>
        //     </Link>
        // )}
    );
}

function MyAccount(
{
    items, label, Logout
}
)
{
    const classes = navStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory()
    const handleClose = () => {
        setAnchorEl(null);
    };

    const MenuItemChildren = (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {items.map(item => {
                if (item.label === "Logout") {
                    return (
                        <MenuItem onClick={() => Logout(history)} key={item.label}>
                            <Icon>power_settings_new</Icon>
                            {item.label}
                        </MenuItem>
                    );
                }
                return (
                    <Link href={item.path} className={classes.link} key={item.label}>
                        {item.label}
                    </Link>
                    // <MenuItem
                    //     key={item.label}
                    //     onClick={() => {
                    //         console.log('I am being called')
                    //       handleClose();
                    //         return history.push(item.path);
                    //     }}
                    // >
                    //     {item.label}
                    // </MenuItem>
                );
            })}
        </Menu>
    );

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <React.Fragment>
            <Link className={classes.link} onMouseOverCapture={handleClick}>
                {label}
            </Link>
            {MenuItemChildren}
        </React.Fragment>
    );
}

export default function Navbar()
{
    const classes = navStyles();
    const props = useContext(LoginContext);
    const [toggle, setToggle] = React.useState(false);
    const toggleDrawer = open => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setToggle(open);
    };

    return (
        <BrowserRouter>
            <Container maxWidth="lg" >
            <AppBar
                position="static"
                color="secondary"
                elevation={0}
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Drawer open={toggle} onClose={toggleDrawer(false)} anchor="left">
                        <Grid container>
                            <Grid item style={{ paddingLeft: "20px" ,marginTop: 15, width:200}}>
                                <Link href="/" className={classes.logolink} style={{}}>
                                    Menu
                                </Link>

                            </Grid>
                            <Grid item style={{margin: "12px 0"}}>
                                <Button
                                    onClick={toggleDrawer(false)}
                                    style={{backgroundColor: "transparent"}}
                                >
                                    <CloseIcon/>
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider/>
                        <SigninPaths {...props} />
                    </Drawer>

                    <Typography variant="h6" noWrap className={classes.toolbarTitle}>
                        <Link href="/" className={classes.logolink} style={{}}>
                            PROJECT LOCAL
                        </Link>
                    </Typography>
                    <Link href={"/checkout"} className={classes.cart}>
                        <Badge
                            color="error"
                            badgeContent={props.cart && props.cart.total}
                            className={classes.margin}

                        >
                            <Icon fontSize={"default"} >shopping_cart_basket</Icon>
                        </Badge>
                    </Link>
                </Toolbar>
            </AppBar>
            </Container>
        </BrowserRouter>
    );
}
