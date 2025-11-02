import React, { Component } from "react";
import bank from "../bank.png";

class Navbar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-dark fixed-top shadow p-0"
        style={{ backgroundColor: "black", height: "50px" }}
      >
        <a
          href="/"
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          style={{ color: "white" }}
        >
          <img
            src={bank}
            width="50"
            height="30"
            className="d-inline-block align-top"
            alt="bank"
          />
          &nbsp; DAPP Yield Staking (Decentralized Banking)
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-block">
            <small style={{ color: "white" }}>
              ACCOUNT NUMBER:&nbsp;
              {this.props.account
                ? `${this.props.account.substring(0, 6)}...${this.props.account.substring(
                    this.props.account.length - 4
                  )}`
                : ""}
            </small>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
