import React, {Component} from 'react';
import { Form, Card, Button, Input, Message} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import main from '../../ethereum/main';
import web3 from '../../ethereum/web3';
import {Router} from  '../../routes';

class ListNew extends Component {
    state = {
        customerAddress: '',
        policies: [],
        errorMessage: '',
        loading: false,
        show: false
    };

   
   
    onSubmit = async (event) => {
       
        
        event.preventDefault();

       try {
 
        var max = await main.methods.customerPolicies(this.state.customerAddress).call();
  
           for (var i=0; i < max; i++) {

                this.state.policies.push(await main.methods.getCustomerPolicy(i).call());
                
                  
            }
        
        } catch (err) {
                this.setState({errorMessage: err.message});
        }
       console.log('test ',this.state.policies);
       return(this.state.policies);
       
    }


    showPolicies(){
        const items = this.state.policies.map(policy => {
          return {
            header: policy,
            fluid: true
          };
        }
      
      );
      return  <Card.Group items={items} />;
      }
      
     //generate() {
     //    if (this.state.show){
      //       return 
      //           <h3 align="left">Policies for Customer</h3>
             //    this.showPolicies()
            //     this.generate()
                
             
     //    }
     //    return <h2>nothing to show</h2>
     //}   



    render () {
  
       
        return (
            <div>
            <Layout>
                <h3> List Customer Policies </h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                     
                     <Form.Field>
                         <label>Customer Ethereum Address</label>
                         <input 
                            placeholder='Customer Ethereum Address' 
                            value = {this.state.customerAddress}
                            onChange = {event => {this.setState({customerAddress: event.target.value})}
                        }
                            />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                     <Button onClick={this.setState({show: true})}>List</Button>
                    
            
                                 
                    
                    

                </Form>
               
              
                
               
       
                


                </Layout>
                </div>
                

        );
    }

}

export default ListNew;