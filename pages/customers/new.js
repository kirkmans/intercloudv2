import React, {Component} from 'react';
import { Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import main from '../../ethereum/main';
import web3 from '../../ethereum/web3';
import {Router} from  '../../routes';

class CustomerNew extends Component {
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
       
      
        
        await main.methods
            .addPolicyforCustomer(this.state.customerAddress, this.state.policyName)
            .send({from: accounts[0]});
           // console.log(accounts[0]);
           Router.pushRoute('/');
        } catch (err) {
                this.setState({errorMessage: err.message});
        }
        this.setState({loading: false});


    };



    render () {
        
        return (
            <Layout>
                <h3> Add a new policy for customer </h3>

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
                    <Button loading={this.state.loading} primary>Add!</Button>

                </Form>

                </Layout>

        );
    }

}

export default CustomerNew;