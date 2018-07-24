
import web3 from '../../../ethereum/web3';
import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import main from '../../../ethereum/main';
import { Table, Card, Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
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
   // const {Row, Cell} = Table;


return (
  <Layout>

   
  <h3 align="center">Whitelist</h3>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
      
      <h3 align="left">Available Policies and Ethereum Addresses
      <Link route="/policies/whitelist">
      <Button> WhiteList </Button>
      </Link>
      </h3>
      {this.renderPolicies()}
     
        <Link route="/policies/new">
        <a>
        <Button 
            content="Add Policy to System"
            icon="add circle"
            primary
        />
        </a>
        </Link>

         <h3 align="left">Clouds</h3>
       <Link route="/clouds/new">
        <a>
        <Button 
            content="Add Cloud"
            icon="add circle"
            primary
        />
        </a>
        </Link>
        
        <h3 align="left">Customers</h3>
        <Link route="/customers/new">
        <a>
        <Button 
            content="Add Policy for Customer"
            icon="add circle"
            primary
        />
        </a>
        </Link>

     


        <Link route="/customers/removePolicy">
        <a>
        <Button 
            content="Remove Policy for Customer"
            icon="add circle"
            primary
        />
        </a>
        </Link>


      
       
       </Layout>
);
}
}

export default MainIndex;

//<Link route="/customers/list">
//<a>
//<Button 
//    content="List Policies for Customer"
//    icon="add circle"
//    primary
///>
//</a>
//</Link>
