
import web3 from '../ethereum/web3';
import React, { Component } from 'react';
import main from '../ethereum/main';
import { Card, Button } from 'semantic-ui-react';
//import Layout from '../components/Layout';


class MainIndex extends Component {
  static async getInitialProps() {
   // const cloud = await main.methods.getCloud(1).call();
 
    const index = await main.methods.policyList().call();
    
    
    var str= [];
    var adr=[];
    //var adr='';
    for (var i = 0; i< index; i++){
        str.push ( await main.methods.getPolicyName(i).call());
      str.push (await main.methods.getPolicyAddress(i).call());
      
        //  str.push ( await main.methods.getPolicyName(i).call());
     //  adr.push (await main.methods.getPolicyAddress(i).call());

    }
    return {str, adr, index};
  }


renderPolicies(){
  const items = this.props.str.map(policy => {
    return {
      header: policy,
      fluid: true
    };
  }

);
return  <Card.Group items={items} />;
}




//<h1 align="center">InterCloud</h1>
//<h2 align="center">A Cloud Policy DApp System</h2>

  
  render() {  


return (
<div>
    <h1 align="center">InterCloud</h1>
  <h2 align="center">A Cloud Policy DApp System</h2>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
        <Button 
            content="Add Policy"
            icon="add circle"
            primary
        />
      <h3 align="left">Available Policies and Ethereum Addresses</h3>
          {this.renderPolicies()} 
       </div>
);
}
}

export default MainIndex;
