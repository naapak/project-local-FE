import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import InputMask from 'react-input-mask'

export default function ContactInfoForm(props) {
  function handleData(event, type) {
    props.formData(type, event.target.value);
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            variant="outlined"
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="billing first-name"
            onChange={event => handleData(event, "firstName")}
            error={props.details.firstName.error}
            helperText={
              props.details.firstName.error
                ? props.details.firstName.errorText
                : ""
            }
            value={props.details.firstName.value}
            style={{backgroundColor: 'white'}}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            variant="outlined"
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="billing family-name"
            onChange={event => handleData(event, "lastName")}
            error={props.details.lastName.error}
            helperText={
              props.details.lastName.error
                ? props.details.lastName.errorText
                : ""
            }
            value={props.details.lastName.value}
            style={{backgroundColor: 'white'}}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <InputMask mask="999 999 9999"  maskChar=' ' value={props.details.phone.value}   onChange={event => handleData(event, "phone")}>
            {(inputProps) =>
                <TextField
                 {...inputProps}
                 type="tel"
                 variant="outlined"
                 required
                 fullWidth
                 id="phone"
                 name="phone"
                 label="Phone Number"
                 disableUnderline
                 autoComplete="billing phone"
                 helperText={
                   props.details.phone.error ? props.details.phone.errorText : ""
                 }
                 error={props.details.phone.error}
                 style={{backgroundColor: 'white'}}
                />}
          </InputMask>

        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="email"
            name="email"
            type="email"
            label="Email"
            fullWidth
            autoComplete="billing email"
            onChange={event => handleData(event, "email")}
            error={props.details.email.error}
            helperText={
              props.details.email.error ? props.details.email.errorText : ""
            }
            value={props.details.email.value}
            color="primary"
            variant="outlined"
            style={{backgroundColor: 'white'}}
          />
        </Grid>
      </Grid>
    </>
  );
}


/*

<Grid item xs={12} sm={6}>
  <InputLabel id="country-label">Country / Region</InputLabel>
  <Select
      native
      fullWidth
      onChange={event => handleData(event, "country")}
      variant="outlined"
      value={props.details.country.value}
  >
    <option value="Canada">Canada</option>
    <option value="USA">USA</option>
  </Select>
</Grid>
<Grid item xs={12} sm={6}>
  <InputLabel id="city-label">City</InputLabel>
  <TextField
      id="city"
      name="city"
      label="City"
      fullWidth
      variant="outlined"
      onChange={event => handleData(event, "city")}
      error={props.details.city.error}
      helperText={
        props.details.city.error ? props.details.city.errorText : ""
      }
      value={props.details.city.value}
  />
</Grid>
<Grid item xs={12}>
  <TextField
      variant="outlined"
      required
      id="address"
      name="address"
      label="Address"
      fullWidth
      autoComplete="billing address-line1"
      onChange={event => handleData(event, "address")}
      error={props.details.address.error}
      helperText={
        props.details.address.error ? props.details.address.errorText : ""
      }
      value={props.details.address.value}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <TextField
      variant="outlined"
      required
      id="zip"
      name="zip"
      label="Postal or Zip code"
      fullWidth
      autoComplete="billing postal-code"
      onChange={event => handleData(event, "zip")}
      error={props.details.zip.error}
      helperText={
        props.details.zip.error ? props.details.zip.errorText : ""
      }
      value={props.details.zip.value}
  />
</Grid>


 */