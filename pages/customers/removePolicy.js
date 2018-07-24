import React, {Component} from 'react';
import { Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import main from '../../ethereum/main';
import web3 from '../../ethereum/web3';
import {Router} from  '../../routes';

class PolicyRemove extends Component {
    state = {
        policyName: '',   //records what the user types
        customerAddress: '',
        errorMessage: '',
        loading: false
    };


    onSubmit = async (event) => {
       
        
        event.preventDefault();
        this.setState({loading: true, errorMessage: ''});
        try {
         const accounts =  await web3.eth.getAccounts();
    
            // get size of number of policies
        var max = await main.methods.customerPolicies(this.state.customerAddress).call();
        var tempPolicy;
  
           for (var i=0; i < max; i++) {
                tempPolicy = await main.methods.getCustomerPolicy(i).call();
                if (tempPolicy == this.state.policyName) {
                    await main.methods

                    .removeCustomerPolicy(this.state.customerAddress, i) 
                    .send({from: accounts[0]});
                    break;
                }
                // if found then send transaction to remove based on index i
                //this.state.policies.push(await main.methods.getCustomerPolicy(i).call());
                // if match then
                
          
                  
            }
         console.log('Policy Input:', this.state.policyName, 'PolicyFound:', tempPolicy);
           Router.pushRoute('/');
        } catch (err) {
                this.setState({errorMessage: err.message});
        }
       //console.log('test ',this.state.policies);
    //   return(this.state.policies);
       
    }




    render () {
        
        return (
            <Layout>
                <h3> Remove a customer policy </h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                     <Form.Field>
                        <label>Policy Name</label>
                         <input 
                            placeholder='Policy Name'
                            value = {this.state.policyName}
                            onChange={event => this.setState({policyName: event.target.value })}
                            />
                      </Form.Field>
                     <Form.Field>
                         <label>Customer Ethereum Address</label>
                         <input 
                            placeholder='Customer Ethereum Address' 
                            value = {this.state.customerAddress}
                            onChange = {event => this.setState({customerAddress: event.target.value})}
                            />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Remove!</Button>

                </Form>

                </Layout>

        );
    }

}

export default PolicyRemove;