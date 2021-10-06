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
      creatorWallet : ''
    }
  }
  handleUrl = (e) => {
    if (!e || !e.target) return;
    this.setState({groupCdnUrl : e.target.value});
  }
  handleCreatorWallet = (e) => {
    if (!e || !e.target) return;
    this.setState({creatorWallet : e.target.value});
  }
  handleUpload = (fileInfo) => {
    this.setState({groupCdnUrl : fileInfo.uuid});
  }
  handleClickBoth = () => {
    axios.get(`http://localhost:8901/prepare/both?cdnurl=` + this.state.groupCdnUrl + '&wallet=' + this.state.creatorWallet)
      .then(res => {
        alert('success');
      }).catch(err => {alert("faild");})
  }
  handleClickWallet = () => {
    axios.get('http://localhost:8901/prepare/wallet?wallet=' + this.state.creatorWallet)
      .then(res => {
        alert('success');
      }).catch(err => {alert("faild");})
  }
  render() {
    return (
      <div className="app">
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
            <button type="button" onClick={this.handleClickBoth}>Prepare By Both</button>
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
