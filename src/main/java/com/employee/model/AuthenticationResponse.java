package com.employee.model;

public class AuthenticationResponse {

  private String jwt;
  private String role;

  public AuthenticationResponse(String jwt, String role) {
    this.jwt = jwt;
    this.role = role;
  }

  public String getJwt() {
    return jwt;
  }

  public String getRole() {
    return role;
  }
}
