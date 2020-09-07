import React from "react";
import { useHistory } from 'react-router-dom';

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import LoginService from "../services/LoginService";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(7),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%"
    }
}));

const LoginComponent = () => {

    const classes = useStyles();
    const history = useHistory();

    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleUserNameChange = event => setUserName(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const [message, setMessage] = React.useState("");

    const handleSubmit = async () => {
        const loginCredentials = { username, password };
        const response = await LoginService.authenticate(loginCredentials);
        const body = response.data;
        if (body.jwt) {
            localStorage.setItem("jwt", body.jwt);
            history.push("/employees");
        } else {
            setMessage("Login failed");
        }
        setUserName("");
        setPassword("");
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <GroupIcon />
                </Avatar>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                value={username}
                                label="Username"
                                name="username"
                                autoComplete="Username"
                                onChange={handleUserNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="Password"
                                name="password"
                                variant="outlined"
                                required
                                fullWidth
                                value={password}
                                id="password"
                                label="Password"
                                type="password"
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        preventdefault
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </form>
                <Typography style={{ margin: 7 }} variant="body1">
                    {message}
                </Typography>
            </div>
        </Container>
    );
}

export default LoginComponent;