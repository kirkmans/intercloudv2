import React, {Component} from 'react';
import { Form, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import main from '../../ethereum/main';
import web3 from '../../ethereum/web3';
import {Router} from  '../../routes';

class CloudNew extends Component {
    state = {
        cloudName: '',   //records what the user types
        cloudAddress: '',
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
            .addCloud(this.state.cloudName, this.state.cloudAddress)
            .send(
                {from: accounts[0]}
            );
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
                <h3> Add a new cloud </h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                     <Form.Field>
                        <label>Cloud Name</label>
                         <input 
                            placeholder='Policy Name'
                            value = {this.state.cloudName}
                            onChange={event => this.setState({cloudName: event.target.value })}
                            />
                      </Form.Field>
                     <Form.Field>
                         <label>Cloud Address</label>
                         <input 
                            placeholder='Ethereum Address' 
                            value = {this.state.cloudAddress}
                            onChange = {event => this.setState({cloudAddress: event.target.value})}
                            />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Add!</Button>

                </Form>

                </Layout>

        );
    }

}

export default CloudNew;