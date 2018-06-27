pragma solidity ^0.4.22;


contract main {

address public manager;
//Constructor to Initialize
constructor () public {
        manager = msg.sender;
    }

// POLICIES

 //list systems policy pattern
 struct policy {
        uint maxindex;
        mapping (uint => string) policyName;
        mapping (uint => address) policyAddress;
    }
policy public policyList;
  

//Add policy to system.  Policy needs to be deployed to the blockchain in order
//to get the address.  Once you have the address, the policy needs to be added to the
//system.
    function addPolicy (string _policy, address _address) public {
        policyList.policyName[policyList.maxindex] = _policy;
        policyList.policyAddress[policyList.maxindex] = _address;
         policyList.maxindex++;
    }
    
    function getPolicyName (uint index) public view returns (string){
        return policyList.policyName[index];
    }

   function getPolicyAddress (uint index) public view returns (address){
        return policyList.policyAddress[index];
    }


//CLOUDS

//list clouds pattern
 struct cloud {
        uint maxindex;
        mapping (uint => string) cloudName;
        mapping (uint => address) cloudAddress;
    }
cloud public cloudList;
  

//Add policy to system.  Policy needs to be deployed to the blockchain in order
//to get the address.  Once you have the address, the policy needs to be added to the
//system.
    function addCloud (string _cloud, address _address) public {
        cloudList.cloudName[cloudList.maxindex] = _cloud;
        cloudList.cloudAddress[cloudList.maxindex] = _address;
         cloudList.maxindex++;
    }
    
    function getCloudName (uint index) public view returns (string){
        return cloudList.cloudName[index];
    }
    


//CUSTOMERS

//list customer policies pattern
struct customer {
    uint maxindex;
    mapping (uint => string) policyList;
}
mapping (address => customer) public customerPolicies;


//Common pattern restrict access.  Used multiple times
modifier onlyBy(address _account) {
        require(
        msg.sender == _account, "Unauthorized Request."
        );
        // the "_;" will be replaced by the actual function body
        // when the modifier is used
        _;
}


function addPolicyforCustomer(address _customer, string _policyName) public{
    require(msg.sender == _customer, "Requester not authorized.");
        customerPolicies[_customer].policyList[customerPolicies[_customer].maxindex] = _policyName;
        customerPolicies[_customer].maxindex++;
     }

function getCustomerPolicy (uint index) public view returns (string){
        return customerPolicies[msg.sender].policyList[index];
    }
    
   

//remove policy from here, but also need to remove the data from the policy smart contracts
function removeCustomerPolicy(address _customer, string _policy) public onlyBy(_customer){
        uint index = customerPolicies[_customer].maxindex;
        for (uint i = 0; i < index; i++) 
            if (keccak256(abi.encodePacked(customerPolicies[_customer].policyList[i])) ==  keccak256(abi.encodePacked(_policy))) {
                customerPolicies[_customer].policyList[i] = customerPolicies[_customer].policyList[index-1]; //save space
                delete customerPolicies[_customer].policyList[index-1];
                customerPolicies[_customer].maxindex--;
                break;
            }



        }
}





//Check if cloud in system
//Might use a getter here
