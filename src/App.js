import React from "react";
import { Widget } from "@uploadcare/react-widget";

import axios from 'axios';

import "./App.css";

import config from './conf/config.json';

const UPLOADCARE_PUBKEY = config.pubapikey;   // YOUR_UPLOADCARE_PUBKEY

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupCdnUrl : '',
      localUrl : '',
      creatorWallet : ''
    }
  }
  handleUrl = (e) => {
    if (!e || !e.target) return;
    this.setState({groupCdnUrl : e.target.value});
  }
  handleLocalUrl = (e) => {
    if (!e || !e.target) return;
    this.setState({localUrl : e.target.value});
  }
  handleCreatorWallet = (e) => {
    if (!e || !e.target) return;
    this.setState({creatorWallet : e.target.value});
  }
  handleUpload = (fileInfo) => {
    this.setState({groupCdnUrl : fileInfo.uuid});
  }
  handleClickBoth = () => {
    axios.get(`${this.state.localUrl}/prepare/both?cdnurl=` + this.state.groupCdnUrl + '&wallet=' + this.state.creatorWallet)
      .then(res => {
        alert('success');
      }).catch(err => {alert("faild");})
  }
  handleClickBoth2 = () => {
    axios.get(`${this.state.localUrl}/prepare/both_nd?localurl=` + this.state.localUrl + '&wallet=' + this.state.creatorWallet)
      .then(res => {
        alert('success');
      }).catch(err => {alert("faild");})
  }
  handleClickWallet = () => {
    axios.get(`${this.state.localUrl}/prepare/wallet?wallet=` + this.state.creatorWallet)
      .then(res => {
        alert('success');
      }).catch(err => {alert("faild");})
  }
  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="label-input">
            Server Url
          </div>
          <div className="action-input">
            <input type="text" value={this.state.localUrl} onChange={this.handleLocalUrl} />
          </div>
        </div>
        <div className="clearboth"></div><br/>
        <div className="row">
          <div className="label-action">
            <h3>Choose image files to upload in uploadcare.com</h3>
          </div>
          <div className="action">
            <Widget
              multiple="true"
              publicKey={UPLOADCARE_PUBKEY}
              onChange={this.handleUpload}
              tabs="file"
              clearable
            />
          </div>
        </div>
        <div className="clearboth"></div><br/>
        <div className="row">
          <div className="label-input">
            Uploadcare CDN URL
          </div>
          <div className="action-input">
            <input type="text" value={this.state.groupCdnUrl} onChange={this.handleUrl} /><br/>
          </div>
        </div>
        <div className="clearboth"></div><br/>
        <div className="row">
          <div className="label-input">
            Wallet Address of Creator
          </div>
          <div className="action-input">
            <input type="text" value={this.state.creatorWallet} onChange={this.handleCreatorWallet} />
          </div>
        </div>
        <br/>
        <br/>
        <h3>Prepare JSON Files</h3>
        <div className="row">
          <div className="label-button">
            Change url of images and wallet addresses of "json-input" folder
          </div>
          <div className="action-button">
            <button type="button" onClick={this.handleClickBoth}>Prepare By CDN and Wallet</button>
          </div>
        </div>
        <div className="clearboth"></div><br/>
        <div className="row">
          <div className="label-button">
            Change with wallet addresses and server image url
          </div>
          <div className="action-button">
            <button type="button" onClick={this.handleClickBoth2}>Prepare By Server Url And Wallet</button>
          </div>
        </div>
        <div className="clearboth"></div><br/>
        <div className="row">
          <div className="label-button">
            Change wallet addresses of "json-output" folder
          </div>
          <div className="action-button">
            <button type="button" onClick={this.handleClickWallet}>Prepare By Wallet</button>
          </div>
        </div>
        
      </div>
    )
  }
};

export default App;
