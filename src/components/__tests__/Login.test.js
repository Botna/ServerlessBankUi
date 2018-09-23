const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ExpansionPanelActions } from '@material-ui/core';
import Login from '../Login'


configure({adapter: new Adapter()});
let mockSetting = {
    userName: "testUser",
    password: "testPword",
    success: "",
    error:"",
};

let mockFields = {};

let testProps;
let tree;
let wrapper;

//Here we have some basic tests outlinin some of the basic concepts of unit testing for react, that i presently understand (which admittedly is minimal).

//Ideally we would pass more robust mocking into these, mocking the actions for example, and identifying that button clicks and the like are triggering these methods appropriately.

it("testBasicPageLoadSnapShot", async () => {
 
    var wrapper = shallow(<Login
        userName={mockSetting.userName}
        password={mockSetting.password}
        success={mockSetting.success}
        error={mockSetting.error}
        ></Login>);
        
        expect(wrapper).toMatchSnapshot();
  });

  it("testBasicPageLoadWithStateChange", async () => {
 
    var wrapper = shallow(<Login
        userName={mockSetting.userName}
        password={mockSetting.password}
        success={mockSetting.success}
        error={mockSetting.error}
        ></Login>);
        
    wrapper.setState({userName: "newUserName"})
    wrapper.update();
        expect(wrapper).toMatchSnapshot();
  });

  it("testBasicPageLoadWithSuccessMessage", async () => {
 //I dont think this will actually work, since shallow doesnt trigger willRecieveProps lifecycle method.  
 //Props changes will therefore not actually take place, and this doenst test
 //my Dialog stuff.

 //
    var wrapper = shallow(<Login
        userName={mockSetting.userName}
        password={mockSetting.password}
        success={mockSetting.success}
        error={mockSetting.error}
        ></Login>);
        
    wrapper.setProps({success: "some success message"})
    wrapper.update();
        expect(wrapper).toMatchSnapshot();
  });

  it("testBasicPageLoadWithErrorMessage", async () => {
    //I dont think this will actually work, since shallow doesnt trigger willRecieveProps lifecycle method.  
    //Props changes will therefore not actually take place, and this doenst test
    //my Dialog stuff.
   
    //
       var wrapper = shallow(<Login
           userName={mockSetting.userName}
           password={mockSetting.password}
           success={mockSetting.success}
           error={mockSetting.error} 
           ></Login>);
           
       wrapper.setProps({success: "some error message"})
       wrapper.update();
           expect(wrapper).toMatchSnapshot();
     });