import React, {Component} from 'react';
import { Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import main from '../../ethereum/main';
import web3 from '../../ethereum/web3';
import {Router} from  '../../routes';

class PolicyNew extends Component {
    state = {
        policyName: '',   //records what the user types
        policyAddress: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({loading: true, errorMessage: ''});
       try {
        const accounts =  await web3.eth.getAccounts();
       
        //add a new policy
        
        await main.methods
            .addPolicy(this.state.policyName, this.state.policyAddress)
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
                <h3> Add a new policy </h3>

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
                         <label>Policy Address</label>
                         <input 
                            placeholder='Ethereum Address' 
                            value = {this.state.policyAddress}
                            onChange = {event => this.setState({policyAddress: event.target.value})}
                            />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Add!</Button>

                </Form>

                </Layout>

        );
    }

}

export default PolicyNew;