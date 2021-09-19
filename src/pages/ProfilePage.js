import React, {useContext, useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginContext } from "../contexts/LoginContext";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    marginBottom: {
        marginBottom: 100,
        margin:100
    },

}));

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const loginContext = useContext(LoginContext);
    const classes = useStyles();

    if (isAuthenticated) {
        loginContext.setLogin("loggedIn");
    }


    return (

            <Container maxWidth="lg" className={classes.marginBottom}>
                {      isAuthenticated ? (
                    <>
                        <img src={user.picture} alt={user.name} />
                    <Typography component="h4" variant="h6">
                        Username: {user.name}
                    </Typography>
                    <Typography component="p">
                    Email: {user.email}
                    </Typography>
                    </>

                ): (
                    <Typography component="p">
                        Loading ...
                    </Typography>
                    )}
            </Container>
        );
}

export default Profile;