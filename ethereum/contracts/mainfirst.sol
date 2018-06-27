pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

contract main {

address public manager;

// Cloud identifier
//mapping (bytes32 => address) public cloudID;

struct cloudStruct {
        
    string cloudName;
    address cloudAddress;
}
cloudStruct[] public cloud;

uint public cloudId;

struct policyStruct {
    string policyName;
    address policyAddress;
}
policyStruct[] public policy;


//Define PolicyName with its address
//mapping (bytes32 => address) public policy;

// Consumer Policies (one or more)
mapping (address => string[]) public customerPolicies;

//Common pattern restrict access.  Used multiple times
modifier onlyBy(address _account) {
        require(
        msg.sender == _account, "Unauthorized Request."
        );
        // the "_;" will be replaced by the actual function body
        // when the modifier is used
        _;
}


//Constructor to Initialize
constructor () public {
        manager = msg.sender;
    }


//Add policy to system.  Policy needs to be deployed to the blockchain in order
//to get the address.  Once you have the address, the policy needs to be added to the
//system.
//inputs:  policy name, policy address
//outputs:  transaction receipt
function addPolicytoSystem(string _policyName, address _policyAddress) public {
       // require(policy[_policyName] != 0, "Policy Already Exists");
        policy.push(policyStruct( _policyName, _policyAddress));

}


//No change to blockchain
function listAllPolicies() public view returns (string[]){
string[] memory temparray = new string[](policy.length);
for (uint p = 0; p < policy.length; p++)  {
        temparray[p] = policy[p].policyName;
}
return temparray;
}


//Change to blockchain
// in:  consumerAddress, policy data
// out: transaction receipt
function addPolicyforCustomer(address _customer, string _policyName) public{
    require(msg.sender == _customer, "Requester not authorized.");
    customerPolicies[_customer].push(_policyName);
 }

   

//List customer policies.
// in:  consumer address
// out: array of strings, list of policies by name
//No change to blockchain
function listCustomerPolicies (address _customer) public view returns (string[]){
        //check to see if it either cloud customer or valid cloud
//        require(msg.sender = _customer || msg.sender = valid_cloud, "Unauthorized Request");
        return customerPolicies[_customer];
    }




//function removeCustomerPolicy
//remove policy from here, but also need to remove the data from the policy smart contracts
function removeCustomerPolicy(address _customer, string _policy) public onlyBy(_customer){
        uint totalLength = customerPolicies[_customer].length;
        for (uint p = 0; p < totalLength; p++) {
                if (keccak256(abi.encodePacked(_policy)) == keccak256(abi.encodePacked(customerPolicies[_customer][p]))) {
                        customerPolicies[_customer][p]= customerPolicies[_customer][totalLength-1];
                        customerPolicies[_customer].length--;
                        break;
                }
        }
}




//Supply Cloud Name and Cloud Address to add cloud to the system
function addCloudtoSystem(string _cloudName, address _cloudAddress) public {
    //    require(cloudID[_cloudName] == 0, "Cloud Name Already Exists");
         cloudID++;
         cloud.push(cloudStruct( _cloudName, _cloudAddress));
}

//Check if cloud in system
//Might use a getter here
//WHY did I make this not a MAPPING????????????
//function getCloudAddress(string _cloudName) public view returns (address){
       // require(cloudID[_cloudName] != 0, "Cloud Not in System");
        
//       for (uint p = 0; p < cloud.length; p++) {
//            if (keccak256(abi.encodePacked(_cloudName)) == keccak256(abi.encodePacked(cloud[p].cloudName))) {
//                return cloud[p].cloudAddress;
//                break;
//            }
//        }
//}





} 
